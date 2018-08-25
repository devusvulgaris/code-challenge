// @TODO:
// - Server runs on port 4848 (because reasons...)
// - `/api/users` endpoint serves all the data under `data/data.json` with status code 200
// - `/api/users/${id}` endpoint serves a single user data by ID
// - `/api/users/xxx` serves 404 Not Found, as do all the other paths
// - BONUS: Add GraphQL and GraphiQL endpoints for bonus

const Koa = require('koa');
const Router = require('koa-router');
const graphql = require('koa-graphql');
const fs = require('fs');
const config = require('config');

// Mocking backend data.
const schema = require('./schema');
const jsonData = fs.readFileSync('data/data.json');
const users = JSON.parse(jsonData);

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = 'Welcome to roast my backend test!';
});

router.get('/api/users', async (ctx, next) => {
  ctx.status = 200;
  ctx.body = JSON.parse(jsonData);
});

router.get('/api/users/:id', async (ctx, next) => {
  const id = ctx.params.id;
  const user = users.filter(user => user.id === +id);
  if (user.length === 0) {
    ctx.status = 404;
    ctx.body = {
      status: 'error',
      message: 'There is no such user',
    };
  } else {
    ctx.body = user[0];
  }
});

router.all(
  '/graphql',
  graphql({
    schema: schema,
    graphiql: true,
  }),
);

app.use(router.routes());

app.listen(config.port, () => {
  console.log(`Server is listening on port ${config.port}`);
});

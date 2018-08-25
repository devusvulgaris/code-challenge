import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { FETCH_START, fetchUserRepos } from './';
import mockData from './__mocks__/data';
import parseLinkHeaders from 'parse-link-header';

const mockStore = configureMockStore([thunk]);

const username = 'petetnt';

// Mocking next page by parsing ready Link header string.
const headerLink = '<https://api.github.com/user/7641760/repos?page=2>; rel="next", <https://api.github.com/user/7641760/repos?page=5>; rel="last"';
const pagination = parseLinkHeaders(headerLink);
// @TODO - Configure fetchMock to reply with mockData for queries to
// https://api.github.com/users/${username}/repos endpoint
afterEach(() => {
  fetchMock.reset()
})

fetchMock
  .get(`https://api.github.com/users/${username}/repos?per_page=4`, { headers: { link: headerLink }, body: JSON.stringify(mockData) })

const store = mockStore({
  RepoList: {
    nextPage: null
  },
});

it('fetches repos for the user and sets them as action data', async () => {
  await store.dispatch(fetchUserRepos(username));
  expect(store.getActions().pop().data).toEqual(mockData);
});

test('fetching repos first sets state to loading', async () => {
  await store.dispatch(fetchUserRepos(username));
  expect(store.getActions()[0].type).toEqual(FETCH_START);
});

test('successful fetch sets nextPage to Link header value', async () => {
  // @TODO: implement this test
  // throw new Error('Not implemented (actions/RepoList/RepoList.test.js)');
  await store.dispatch(fetchUserRepos(username));
  expect(store.getActions().pop().nextPage).toEqual(pagination.next.page);
});

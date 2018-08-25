import React from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import RepoList from './containers/RepoList';
/**
 * Component using GraphQL. Please uncomment this component and comment
 * importing RepoList from ./containers/RepoList.
 */
//import RepoList from './containers/RepoList/indexGraphQL'
import ErrorBoundary from './components/ErrorBoundary';
import reducers from './reducers';

// Apollo implementation, please uncomment following 2 lines..
// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from 'react-apollo';

// Could be in separate file, like store.js.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const enhancer = composeEnhancers(applyMiddleware(thunk))
const store = createStore(reducers, {}, enhancer)

// @TODO - Setup redux with redux-thunk

const App = () => (
  <Provider store={store}>
    <ErrorBoundary>
      <RepoList username="petetnt" />
    </ErrorBoundary>
  </Provider>
);

/**
 * GraphQL implementation.
 * 
 * Uses github v4 api, Apollo client.
 * 
 * Code is available in indexGraphQL components,
 * they are located in containers and containers folders.
 * Please uncomment this block and comment block above.
 */

/*
const { REACT_APP_GITHUB_API_KEY: token } = process.env;
const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: { 'Authorization': 'token ' + token }
});

const App = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ErrorBoundary>
        <RepoList username="petetnt" />
      </ErrorBoundary>
    </Provider>
  </ApolloProvider>
);
*/

export default App;

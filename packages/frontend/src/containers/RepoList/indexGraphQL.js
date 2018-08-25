import React, { Component } from 'react';
import styled from 'styled-components';
import LoadingSpinner from '../../components/LoadingSpinner';
import StyledRepoList from '../../components/RepoList/indexGraphQL'

import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const username = 'petetnt'

const GITHUB_QUERY = gql`
  {
    user(login: "${username}") {
       login
       repositories(first: 3) {
         nodes {
           id
           name
           url
           primaryLanguage {name color}
          description
         }
         pageInfo {
          hasNextPage
          endCursor
        }
       }
     }
  }
`;

const UPDATE_GITHUB_QUERY = gql`
  query MoreRepos($cursor: String) { 
    user(login: "${username}") {
      login
      repositories(first: 3, after: $cursor) {
        nodes {
          id
          name
          url
          primaryLanguage {name color}
          description
        }
        pageInfo {
         hasNextPage
         endCursor
       }
      }
    }
  }
`;

class RepoListContainer extends Component {

  render() {
    return (
      <Query query={GITHUB_QUERY} username={username} notifyOnNetworkStatusChange>
        {({ loading, error, data, fetchMore }) => {

          if (loading) return <LoadingSpinner />
          if (error) return <div>{error.message}</div>

          return (
            <StyledRepoListWrapper>
              <StyledRepoList
                data={data.user.repositories.nodes}
                username={data.user.login}
                isLastPage={!data.user.repositories.pageInfo.hasNextPage}
                fetchMore={() => fetchMore({
                  query: UPDATE_GITHUB_QUERY,
                  variables: { cursor: data.user.repositories.pageInfo.endCursor },
                  updateQuery: (previousResult, { fetchMoreResult }) => {
                    const previousUser = previousResult.user;
                    const previousRepos = previousResult.user.repositories;
                    const previousNodes = previousResult.user.repositories.nodes;
                    const newNodes = fetchMoreResult.user.repositories.nodes;
                    const newCursor = fetchMoreResult.user.repositories.pageInfo.endCursor;
                    const newNextPage = fetchMoreResult.user.repositories.pageInfo.hasNextPage

                    return {
                      ...previousResult,
                      user: {
                        ...previousUser,
                        repositories: {
                          ...previousRepos,
                          nodes: [...previousNodes, ...newNodes],
                          pageInfo: {
                            ...previousResult.user.repositories.pageInfo,
                            endCursor: newCursor,
                            hasNextPage: newNextPage
                          }
                        }
                      }
                    }
                  }
                })}
              />
            </StyledRepoListWrapper>
          )
        }}
      </Query>
    )
  }
}

const StyledRepoListWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export default RepoListContainer;

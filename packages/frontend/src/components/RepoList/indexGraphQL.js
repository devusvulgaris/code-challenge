import React from 'react';
import styled from 'styled-components';
import { string, shape, arrayOf, func, bool } from 'prop-types';

const RepoList = props => {
  const { className, data, isLastPage, fetchMore } = props
  return (
    <div className={className}>
      <h3>{props.username} – repos</h3>

      {data.map(item => <div key={item.id}>
        <a className='names' href={item.url}>{item.name}</a>
        <p>{item.description}</p>
        <p><LanguageColor color={item.primaryLanguage ? item.primaryLanguage.color : '#000000'} />
          {item.primaryLanguage ? item.primaryLanguage.name : 'Language not defined'}</p>
      </div>)}

      {!isLastPage && <StyledButton onClick={fetchMore}>Load more</StyledButton>}
    </div>
  )
};

// Language color icon.
const LanguageColor = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${props => props.color}
  `;

const StyledRepoList = styled(RepoList)`
  font-family: Helvetica, sans-serif;
  padding: 50px 10px;
  width: 100%;
  max-width: 700px;

  div {
    margin-bottom: 20px;
  }

  .names {
    font-size: 18px;
    color: #2967CF;
  }

  h3 {
    font-size: 26px;
  }

  p:last-child {
    color: #59605C;
    font-size: 14px;
  }
`;

const StyledButton = styled.button`
  padding: 8px 12px;
  cursor: pointer;
  font-size: 18px;

  &:hover {
    background-color: #ccc;
  }
`;

RepoList.propTypes = {
  username: string.isRequired,
  data: arrayOf(
    shape({
      id: string,
      name: string,
      html_url: string,
      language: string,
    }),
  ).isRequired,
  fetchMore: func.isRequired,
  isLastPage: bool.isRequired,
};

export default StyledRepoList;

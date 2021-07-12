import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import SongList from './components/Song_list'
import SongCreate from './components/Song_Create';
import App from './components/App'

const client = new ApolloClient();

const Root = () => {
  return (
  <ApolloProvider client={client}>
    <Router history={hashHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={SongList}/>
        <Route path="/songs/new" component={SongCreate}/>
      </Route>
    </Router>
  </ApolloProvider>)

};

ReactDOM.render(
  <Root />,
  document.querySelector('#root')
);
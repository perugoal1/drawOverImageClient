import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import logo from './logo.svg';
import './App.css';
import ImageList from './components/ImageList';


const networkInterface = createNetworkInterface({
  uri: 'https://p5r6lsm6e5.execute-api.us-east-1.amazonaws.com/Prod/graphql'
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
      <div className="App">
        <h1>Draw-Over-Image App</h1>
        <ImageList />
      </div>
      </ApolloProvider>
    );
  }
}

export default App;

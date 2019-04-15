import React, { Component } from 'react';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { Router , Route, Switch , Link} from "react-router-dom";
import { createBrowserHistory } from "history";
import logo from './logo.svg';
import './App.css';
import ImageList from './components/ImageList';
import AddImage from './components/AddImage';


const networkInterface = createNetworkInterface({
  uri: 'https://p5r6lsm6e5.execute-api.us-east-1.amazonaws.com/Prod/graphql?'
});

const client = new ApolloClient({
  networkInterface,
  dataIdFromObject: o => o.id
});

const hist = createBrowserHistory();


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
         <Router  history={hist}>
          <div className="App">
          <Link to="/">  <h1>Draw Over Image App</h1></Link>
            <Switch>
              <Route path='/' component={ImageList} exact />
              <Route path='/addImage/' component={AddImage} />;
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}


export default App;

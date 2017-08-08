import React, { Component } from 'react';
import configureStore from '../store/store';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import  SignUp from './screens/auth/signup';
import  Login from './screens/auth/login';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.store = configureStore();

  }

  render () {
    window.store = this.store;
    return (
      <Provider store={this.store}>

      <Login />

      </Provider>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

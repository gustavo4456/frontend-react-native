/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {Component} from 'react';
import AppStack from './app/navigator/stack';

class App extends Component {
  render() {
    return <AppStack />;
  }
}

export default App;

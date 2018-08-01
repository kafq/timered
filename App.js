import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableHighlight, Alert, Platform, FlatList, Picker } from 'react-native';

import { Provider } from 'react-redux';
import store from './store'; //Import the store
import TimersScreen from './components/TimersScreen';



export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <TimersScreen />
      </Provider>
    );
  }
}
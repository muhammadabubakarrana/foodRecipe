import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigation from './src/navigation';
import 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import store from './src/services/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}

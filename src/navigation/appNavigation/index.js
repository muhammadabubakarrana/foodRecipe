import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {routes, headers} from '../../services';
import * as App from '../../screens/appFlow';

const AppStack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <AppStack.Navigator
      // screenOptions={headers.screenOptions}
      screenOptions={headers.screenOptions}
      initialRouteName={routes.home}>
      <AppStack.Screen
        name={routes.home}
        component={App.Home}
        options={{
          headerShown: false,
          //title: 'Home'
        }}
      />
      <AppStack.Screen
        name={routes.RecipeDetails}
        component={App.RecipeDetail}
        options={{
          headerShown: false,
          //title: 'Home'
        }}
      />
    </AppStack.Navigator>
  );
};

export default AppNavigation;

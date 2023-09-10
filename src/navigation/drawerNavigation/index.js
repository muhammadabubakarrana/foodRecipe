import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home, RecipeDetail} from '../../screens/appFlow';
import {colors, routes} from '../../services';
import CustomDrawer from './CustomDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator
      //useLegacyImplementation
      screenOptions={{headerShown: false}}
      drawerContent={props => <CustomDrawer {...props} />}
      initialRouteName={routes.home}>
      <Drawer.Screen name={routes.home} component={Home} />
      <Drawer.Screen
        options={{headerShown: false}}
        name={routes.RecipeDetails}
        component={RecipeDetail}
      />
    </Drawer.Navigator>
  );
}

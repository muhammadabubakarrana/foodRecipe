import React, {Component, useEffect, useState} from 'react';
import {totalSize} from 'react-native-dimension';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNetInfo} from '@react-native-community/netinfo';
import {Splash} from '../screens/authFlow';
import {navigationRef} from './rootNavigation';
import DrawerNavigation from './drawerNavigation';
import {Text, Wrapper} from '../components';
import {Icon} from '@rneui/themed';
import {colors} from '../services';

const MainStack = createNativeStackNavigator();

export default function Navigation() {
  const net = useNetInfo();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  });

  if (loading) return <Splash />;
  else
    return net.isConnected ? (
      <NavigationContainer ref={navigationRef}>
        <MainStack.Navigator screenOptions={{headerShown: false}}>
          <MainStack.Screen name="Drawer" component={DrawerNavigation} />
        </MainStack.Navigator>
      </NavigationContainer>
    ) : (
      <Wrapper
        style={{backgroundColor: colors.bloodOrange}}
        justifyContentCenter
        flex={1}>
        <Wrapper alignItemsCenter isCardView>
          <Icon
            type="material-community"
            name="wifi-off"
            size={totalSize(22)}
          />
          <Text isXXLTitle>Not Connected</Text>
        </Wrapper>
      </Wrapper>
    );
}

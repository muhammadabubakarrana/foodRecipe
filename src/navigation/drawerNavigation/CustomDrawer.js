import React, {useState} from 'react';
import {
  Spacer,
  Wrapper,
  Text,
  Images,
  Lines,
  StatusBars,
} from '../../components';
import {appImages, appStyles, baseStyle, colors} from '../../services';
import {height, totalSize} from 'react-native-dimension';
import {TouchableOpacity, Switch} from 'react-native';
import {Icon, withBadge} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {changeTheme} from '../../services/redux/ThemeSlice';

export default function CustomDrawer(props) {
  const Dispatch = useDispatch();
  const THEME = useSelector(state => state.theme);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleSwitch = () => {
    setIsDarkMode(!isDarkMode);
    isDarkMode ? Dispatch(changeTheme('LIGHT')) : Dispatch(changeTheme('DARK'));
    // props.navigation.toggleDrawer();
  };

  const Drawer_item1 = ({onPress, title, iconName, iconColor, titleStyle}) => (
    <Wrapper alignItemsCenter flexDirectionRow>
      <Icon
        color={iconColor ? iconColor : 'black'}
        type="material-community"
        name={iconName ? iconName : 'menu'}
        size={totalSize(4)}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{paddingVertical: height(1.5)}}>
        <Text isMedium style={[titleStyle, {color: colors.snow}]}>
          {title}
        </Text>
      </TouchableOpacity>
    </Wrapper>
  );
  return (
    <Wrapper
      isMain
      style={{
        backgroundColor:
          THEME.data == 'LIGHT' ? colors.bloodOrange : colors.black,
      }}>
      <StatusBars.Light />
      <Spacer isStatusBarHeigt />
      <Spacer height={height(5)} />
      <Wrapper marginHorizontalMedium>
        {/* close icon */}
        <Wrapper flexDirectionRow justifyContentFlexend>
          <TouchableOpacity
            onPress={() => {
              props.navigation.toggleDrawer();
            }}>
            <Icon
              color={'white'}
              type="material-community"
              name={'close'}
              size={totalSize(4)}
            />
          </TouchableOpacity>
        </Wrapper>
        <Wrapper alignItemsCenter>
          <Images.Profile
            source={appImages.avatar}
            size={totalSize(10)}
            shadow
          />
          <Spacer isBasic />
          <Text isSmallTitle style={{color: colors.snow}}>
            John Doe
          </Text>
          <Spacer isSmall />
          <Text isSmall style={{color: colors.snow}}>
            johndoe@gmail.com
          </Text>
        </Wrapper>
        <Spacer isBasic />
        <Lines.Horizontal color={colors.snow} />
        <Spacer isBasic />
        {/* Making A Swicth for Mode */}
        <Wrapper flexDirectionRow justifyContentCenter alignItemsCenter>
          <Text
            style={{marginRight: baseStyle.marginRight(5), color: colors.snow}}
            isBoldFont
            isWhite
            isMedium>
            Light Mode
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleSwitch} />
          <Text
            style={{marginLeft: baseStyle.marginLeft(5), color: colors.snow}}
            isBoldFont
            isWhite
            isMedium>
            Dark Mode
          </Text>
        </Wrapper>
        <Spacer isBasic />
        <Drawer_item1
          titleStyle={[appStyles.marginHorizontalTiny]}
          iconColor={'white'}
          iconName={'home'}
          title={'Home'}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />
        <Drawer_item1
          titleStyle={[appStyles.marginHorizontalTiny]}
          iconColor={'white'}
          iconName={'logout'}
          title={'Logout'}
          onPress={() => {
            props.navigation.toggleDrawer();
          }}
        />

        <Spacer isBasic />
      </Wrapper>
      {/* <DrawerItemList {...props} />
            <Spacer height={height(20)} />
            <DrawerItem
                label={'Log out'}
                labelStyle={{ ...appStyles.textLarge, ...appStyles.fontMedium, ...appStyles.textWhite }}
            /> */}
    </Wrapper>
  );
}

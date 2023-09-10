import React, {useEffect} from 'react';
import {Wrapper, Text, Images, StatusBars, Spacer} from '../../../components';
import {appImages, baseStyle, fontFamily} from '../../../services';
import {totalSize} from 'react-native-dimension';
import {styles} from './styles';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';

function Splash() {
  const roundInnerPadding = useSharedValue(0);
  const roundOuterPadding = useSharedValue(0);

  {
    /* animation will work when component will mounts*/
  }
  useEffect(() => {
    roundInnerPadding.value = 0;
    roundOuterPadding.value = 0;
    setTimeout(
      () =>
        (roundInnerPadding.value = withSpring(
          roundInnerPadding.value + baseStyle.padding(25),
        )),
      100,
    );
    setTimeout(
      () =>
        (roundOuterPadding.value = withSpring(
          roundOuterPadding.value + baseStyle.padding(35),
        )),
      300,
    );
  }, []);

  return (
    <Wrapper isMain isCenter paddingHorizontalBase style={styles.bg}>
      {/* <Spacer isStatusBarHeigt /> */}
      <StatusBars.Dark />
      {/* Main Image */}
      <Animated.View style={[styles.roundOuter, {padding: roundOuterPadding}]}>
        <Animated.View
          style={[styles.roundInner, {padding: roundInnerPadding}]}>
          <Images.Round size={totalSize(25)} source={appImages.welcome} />
        </Animated.View>
      </Animated.View>
      {/* Title */}
      <Wrapper alignItemsCenter marginVerticalBase>
        <Text isXXLTitle isWhite>
          Mr Abubakar's
        </Text>
        <Text style={{fontFamily: fontFamily.appTextMedium}} isLarge isWhite>
          Portfolio App
        </Text>
      </Wrapper>
    </Wrapper>
  );
}

export default Splash;

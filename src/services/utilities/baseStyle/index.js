import {verticalScale, scale, moderateScale} from 'react-native-size-matters';

export const baseStyle = {
  height: value => verticalScale(value),

  width: value => moderateScale(value),

  fontSize: value => scale(value),

  lineHight: value => verticalScale(value),

  paddingTop: value => verticalScale(value),

  padding: value => scale(value),

  paddingVertical: value => verticalScale(value),

  paddingBottom: value => verticalScale(value),

  paddingRight: value => moderateScale(value),

  paddingLeft: value => moderateScale(value),

  paddingHorizontal: value => moderateScale(value),

  marginTop: value => verticalScale(value),

  marginVertical: value => verticalScale(value),

  marginBottom: value => verticalScale(value),

  marginRight: value => moderateScale(value),

  marginLeft: value => moderateScale(value),

  marginHorizontal: value => moderateScale(value),

  borderRadius: value => verticalScale(value),

  borderWidth: value => moderateScale(value),

  borderTopRightRadius: value => verticalScale(value),

  borderTopLeftRadius: value => verticalScale(value),
};

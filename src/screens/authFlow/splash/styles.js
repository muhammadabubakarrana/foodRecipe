import {StyleSheet} from 'react-native';
import {baseStyle, theme} from '../../../services';

export const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'orange',
  },
  roundOuter: {
   // padding: baseStyle.padding(35),
    backgroundColor: theme.bgWhite(0.2),
    borderRadius: baseStyle.borderRadius(200),
  },
  roundInner: {
   // padding: baseStyle.padding(25),
    backgroundColor: theme.bgWhite(0.3),
    borderRadius: baseStyle.borderRadius(200),
  },
});

import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  inputLabel: {
    marginHorizontal: wp(6),
    fontWeight: 'bold',
    fontSize: hp(2),
    marginTop: hp(3),
  },
});

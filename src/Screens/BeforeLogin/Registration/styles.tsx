import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    marginTop: hp(4),
    fontSize: hp(4),
    fontWeight: 'bold',
  },
  inputLabel: {
    marginHorizontal: wp(6),
    fontWeight: 'bold',
    fontSize: hp(2),
    marginTop: hp(3),
  },
  img: {
    height: hp(4),
    width: wp(6),
    resizeMode: 'contain',
    marginRight: wp(2),
  },
  checkBoxOpacity: {
    height: hp(4),
    width: wp(6),
    marginHorizontal: wp(6),
    marginTop: hp(0.5),
  },
});

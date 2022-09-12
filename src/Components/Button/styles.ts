import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  btnOpacity: {
    marginHorizontal: wp(6),
    height: hp(6),
    marginVertical: hp(2),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: wp(4),
    borderWidth: wp(0.5),
    borderColor: 'grey',
    backgroundColor: 'blue',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
});

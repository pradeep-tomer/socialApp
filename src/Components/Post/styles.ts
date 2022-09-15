import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(2),
    marginVertical: hp(1),
    borderWidth: wp(0.5),
    borderColor: 'grey',
    borderRadius: wp(2),
    padding: wp(1),
    backgroundColor: '#fff',
  },
  img: {
    height: hp(30),
    width: '100%',
    resizeMode: 'stretch',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
  likeImage: {
    height: hp(4),
    resizeMode: 'contain',
    width: wp(8),
  },
});

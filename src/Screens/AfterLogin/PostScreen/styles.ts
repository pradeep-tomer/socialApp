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
  inputField: {
    textAlignVertical: 'top',
    height: hp(20),
    backgroundColor: 'white',
    marginHorizontal: wp(6),
    borderRadius: wp(4),
  },
  opacityImage: {
    alignItems: 'center',
    marginHorizontal: hp(3),
    marginVertical: hp(2),
    borderWidth: hp(0.2),
    borderColor: 'grey',
    backgroundColor: '#D3D3D3',
    borderRadius: wp(4),
  },
  img: {
    height: hp(21),
    width: '100%',
    resizeMode: 'stretch',
    marginVertical: hp(1),
  },
});

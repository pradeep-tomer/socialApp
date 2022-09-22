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
  btn: {
    marginVertical: hp(0),
    height: hp(4),
    width: wp(16),
    alignSelf: 'flex-end',
  },
  noDataView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: hp(2.5),
  },
});

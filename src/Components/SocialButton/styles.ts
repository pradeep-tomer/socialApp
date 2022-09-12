import { StyleSheet } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';

export const styles=StyleSheet.create({    
    SocialBtnOpacity: {
        borderWidth: hp(0.2),
        borderColor: 'grey',
        marginHorizontal:wp(6),
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:'blue',
        borderRadius: hp(2),
        height: hp(6),
      },  
      signInImage: {
        height: hp(4),
        width: wp(10),
      },  
      socialText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: hp(2.3),
        marginLeft: hp(0.2),
      },
})
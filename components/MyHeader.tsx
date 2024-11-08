import { StyleSheet, View, TextInput, Image, Dimensions } from 'react-native';
import React from 'react';

const Colors = {
  GRAY: '#ccc',
  PRIMARY: '#3498db'
};

export default function MyHeader() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/LocatoLogo.png')}
          style={styles.logo}/>

      {/* <View style={styles.searchContainer}>
        <TextInput placeholder='  Search' 
            style={styles.searchBar}
        />
      </View>   */}

      <Image source={require('../assets/images/user.png')} 
          style={styles.userImage}
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    padding:5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 25  
  },
  searchContainer: {
    flex: 1,  
    marginHorizontal: 10  
  },
  searchBar: {
    borderWidth: 1,
    padding: 4,
    borderRadius: 25,
    paddingLeft: 10,
    width: Dimensions.get('screen').width * 0.65,
    height: 50,
    borderColor: Colors.PRIMARY,
  },
  userImage: {
    width: 35,
    height: 35,
    borderRadius: 25
  }
});

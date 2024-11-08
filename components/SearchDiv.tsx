import { colors } from '@/constants/Colors'
import { View, Text, StyleSheet, Dimensions, TextInput } from 'react-native'
const SearchDiv = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Tell us what you need
      </Text>
      <TextInput 
        style={styles.textInput}
        placeholder="Enter the problem you are facing"
        />
    </View>
  )
}
export default SearchDiv


const styles = StyleSheet.create({
    container: {
      margin: 20,
      // justifyContent: 'center',
      alignItems: 'center'
    },
    text: {
      fontSize: 28,
      fontWeight: 'bold',
      color: colors.text,
      marginVertical: 20
    },
    textInput: {
      marginTop:20,
      borderWidth: 1,
      padding: 4,
      borderRadius: 10,
      paddingLeft: 10,
      width: Dimensions.get('screen').width * 0.85,
      height: 50,
      borderColor: colors.icon,
    }
  })
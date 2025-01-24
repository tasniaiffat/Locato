import MyLink from '@/components/MyLink';
import MyText from '@/components/MyText';
import RegisterSpecialist from '@/components/RegisterSpecialist';
import { router } from 'expo-router';
import { View, Text, ImageSourcePropType, KeyboardAvoidingView, TouchableWithoutFeedback, ImageBackground, Platform, Keyboard, StyleSheet, ScrollView } from 'react-native'


const backgroundImage: ImageSourcePropType = require("@/assets/images/locato_bg.jpg");

const SpecialistSignUp = () => {

  return (
    
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ImageBackground source={backgroundImage} resizeMode="cover" style={style.background}>
          <ScrollView style={{marginTop:50}}>
            <RegisterSpecialist />
            <View style={style.signupcta}>
              <MyText textLabel="Already have an account? " textColor="white" fontWeight="normal" />
              <MyLink
                textLabel="Login"
                textColor="white"
                onPress={() => router.push("/login")}
              />
            </View>
          </ScrollView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
export default SpecialistSignUp;


const style = StyleSheet.create({
  background: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 20,

  },
  signupcta: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingBottom: 20,
  },
});
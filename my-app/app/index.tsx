import MyButton from "@/components/MyButton";
import { Link } from "expo-router";
import { Text, View } from "react-native";

const Index = () => {
  return (
    <View
      style={{
        backgroundColor: "cream",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Hello I am tasnia</Text>
      <Link href={"/about"}>Go to About</Link>
      <MyButton/>
    </View>
  );
};

export default Index;

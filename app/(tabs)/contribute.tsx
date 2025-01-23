import { ScrollView, StyleSheet, Text } from "react-native";


export default function Contribute() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text>Contribute</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#dfe4e0",
  },
});

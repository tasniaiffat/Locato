import { colors } from "@/constants/Colors";
import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import ServiceCard from "./ServiceCard";
import { AntDesign } from "@expo/vector-icons";

const handleSeeAllPress = () => {
    console.log('See All services pressed')
}

const ServicesNearby = () => {
  const [services, setServices] = useState(
    Array.from({ length: 5 }, (_, i) => <ServiceCard text="Service" key={i} />)
  );
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Services Near You</Text>
      <FlatList
        data={services}
        renderItem={({ item }) => item}
        horizontal={true}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => (
            <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllPress}>
              <Text style={styles.seeAllText}>See All</Text>
              <AntDesign name="right" size={24} color={colors.tint} />
            </TouchableOpacity>
          )}
      />
    </View>
  );
};
export default ServicesNearby;

const styles = StyleSheet.create({
  container: {},
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text,
    marginVertical: 20,
    marginLeft: 20,
  },
  seeAllButton: {
    // backgroundColor: colors.background,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 16, // Add some left margin to separate the "See All" button from the last service card
    marginVertical:'auto'
    
  },
  seeAllText: {
    color: colors.tint,
    fontSize: 16,
    fontWeight: 'bold',      
  },
});


import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';  // Import the hook to access route params

const Index = () => {
  const { query, responseData } = useLocalSearchParams();  
  return (
    <View>
      <Text>Search Query: {query ? query : "No query provided"}</Text>
    </View>
  );
}

export default Index;

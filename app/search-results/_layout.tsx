import { Stack, useLocalSearchParams } from 'expo-router'
import { View, Text } from 'react-native'
const SearchResultsLayout = () => {
  const { query } = useLocalSearchParams();
  return (
    <Stack screenOptions={{headerShown:true, title:`Results for ${query ? query : "?"}`}}>
      <Stack.Screen name="index" />
    </Stack>
  )
}
export default SearchResultsLayout
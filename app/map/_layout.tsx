import { Stack } from 'expo-router'

const MapLayout = () => {
  return (
    <Stack 
      screenOptions={{
        headerShown: true, 
        headerTitle: 'Showing Results',
        gestureEnabled: true,
        headerStyle: {
          backgroundColor: '#f4f4f4', // Optional: customize header background
        },
        headerTintColor: '#000', // Optional: customize header text color
        headerTitleStyle: {
          fontWeight: 'bold',
        }
      }}
    >
      <Stack.Screen 
        name="index" 
        options={{
          title: 'Map View', // This will set the header title
        }}
      />
    </Stack>
  )
}

export default MapLayout;

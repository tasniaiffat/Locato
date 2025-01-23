import { usePushNotifications } from '@/hooks/usePushNotifications';
import { useEffect } from 'react';
import { View, Text } from 'react-native'
const IncomingRequest = () => {

  const { expoPushToken, notification } = usePushNotifications();

  useEffect(() => {
    const data = JSON.stringify(notification,undefined,2);
    console.log(data);
    
  },[])

  return (
    <View>
      <Text>IncomingRequest</Text>
    </View>
  )
}
export default IncomingRequest;
import { colors } from '@/constants/Colors';
import { usePushNotifications } from '@/hooks/usePushNotifications';
import api from '@/services/api';
import { ServiceRequestType } from '@/types/ServiceRequest';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Touchable, TouchableOpacity, StyleSheet, Alert } from 'react-native'
const IncomingRequest = () => {

  const [serviceRequest, setServiceRequest] = useState<ServiceRequestType|null>(null);
  const {data} = useLocalSearchParams();

  


  const acceptRequest = async () => {
    console.log(serviceRequest?.serviceRequestId);
    
    const response = await api.patch(`/service_request/go-to-chat?id=${serviceRequest?.serviceRequestId}`);
    console.log(response.data);
    Alert.alert("Request Accepted");
    router.replace("/(tabs)/");
    
  };
  const declineRequest = async () => {
    const response = await api.patch(`/service_request/status?id=${serviceRequest?.serviceRequestId}`,{
      status: "REJECTED",
    });
    console.log(response.data);
    Alert.alert("Request Declined");
    router.replace("/(tabs)/");
  };

  useEffect(() => {
    try {
      console.log('params', JSON.parse(data as string));
      setServiceRequest(JSON.parse(data as string));

    } catch (error) {
      console.log('error', error);
    }
    
    
  },[]);

  return (
    <View>
      <Text>IncomingRequest</Text>
      <Text>{serviceRequest?.jobDescription}</Text>
      <Text>{serviceRequest?.jobType}</Text>
      <Text>{serviceRequest?.userEmail}</Text>
      <Text>{serviceRequest?.appointmentDateTime}</Text>
      <Text>{serviceRequest?.serviceRequestId}</Text>
      <View style={style.buttonContainer}>
        
        <TouchableOpacity
          onPress={declineRequest}
          style={style.declineButton}>
          <Text style={style.buttonText}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={acceptRequest}
          style={style.acceptButton}>
          <Text style={style.buttonText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
export default IncomingRequest;


const style = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  acceptButton: {
    backgroundColor: colors.tabIconSelected,
    padding: 10,
    borderRadius: 10,
  },
  declineButton: {
    backgroundColor: colors.errorText,
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 20,
  }
})
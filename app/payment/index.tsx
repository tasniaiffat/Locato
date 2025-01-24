import { Button } from '@/components/ui/button';
import api from '@/services/api';
import { useStripe } from '@stripe/stripe-react-native';
import { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import { Screen } from 'react-native-screens';




const Payment = () => {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [payableAmount, setPayableAmount] = useState(600);

  const fetchPaymentSheetParams = async () => {
    const response = await api.post('/create-payment-intent', {
      amount: payableAmount,
    });
  
    const { paymentIntent, ephemeralKey, customer } = response.data;
  
    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };


  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: 'Locato',
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Jamal Uddin',
        email: 'jmuddin5823@gmail.com',
      }
    });

    if (!error) {
      console.log('Success: initialized Payment Sheet');
      setLoading(true);
    } else {
      console.log('Error: initializing Payment Sheet', error);
    }
  };



  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
    } else {
      Alert.alert('Success', 'Your order is confirmed!');
    }
  }
  
  

  return (
    <View>
      <TouchableOpacity
        onPress={async () => {
          // console.log("Payment Sheet");
          await initializePaymentSheet().then(async () => {
            await openPaymentSheet();
          })
        }}
        disabled={loading}
        style={style.button}
      >
        <Text style={style.text}>Checkout</Text>
      </TouchableOpacity>
    </View>
  )
}
export default Payment;


const style = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    marginTop: 200,
  },
  text: {
    color: 'white',
    fontSize: 18
  }
})
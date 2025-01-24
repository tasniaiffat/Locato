import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import api from '@/services/api';

const ContractForm: React.FC = () => {
  const [serviceRequestId, setServiceRequestId] = useState<string>('');
  const [agreedPayment, setAgreedPayment] = useState<string>('');
  const [workCompletionTime, setWorkCompletionTime] = useState<string>('');
  const [jobSummary, setJobSummary] = useState<string>('');

  // Handle form submission
  const handleSubmit =  async() => {
    if (!serviceRequestId || !agreedPayment || !workCompletionTime || !jobSummary) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    const data = {
      serviceRequestId: serviceRequestId,
      agreedPayment: agreedPayment,
      workCompletionTime: workCompletionTime,
      jobSummary: jobSummary,
    };
  
    try {
      const response = await api.post('/jobcontract', data); // POST request using the `api` instance
      console.log('Contract submitted successfully:', response.data); // Handle success
    } catch (error) {
      console.error('Error during contract submission:', error); // Handle error
    }
  
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contract Form</Text>

      <TextInput
        style={styles.input}
        placeholder="Service Request ID"
        value={serviceRequestId}
        onChangeText={setServiceRequestId}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Agreed Payment ($)"
        value={agreedPayment}
        onChangeText={setAgreedPayment}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Work Completion Time (Days)"
        value={workCompletionTime}
        onChangeText={setWorkCompletionTime}
        keyboardType="numeric"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Job Summary"
        value={jobSummary}
        onChangeText={setJobSummary}
        multiline
      />

      <Button title="Submit Contract" onPress={handleSubmit} />
    </View>
  );
};

export default ContractForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

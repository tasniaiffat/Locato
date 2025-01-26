import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '@/services/api';
import { grey } from '@/constants/Colors';
import { router } from 'expo-router';

const ContractForm: React.FC = () => {
  const [serviceRequestId, setServiceRequestId] = useState<string>('');
  const [agreedPayment, setAgreedPayment] = useState<string>('');
  const [workCompletionTime, setWorkCompletionTime] = useState<Date | null>(new Date());
  const [jobSummary, setJobSummary] = useState<string>('');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!serviceRequestId || !agreedPayment || !workCompletionTime || !jobSummary) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const data = {
      serviceRequestId: serviceRequestId,
      agreedPayment: agreedPayment,
      workCompletionTime: workCompletionTime.toISOString(), // Convert to ISO string for consistency
      jobSummary: jobSummary,
    };

    try {
      const response = await api.post('/contracts/job-contract', data); // POST request using the `api` instance
      console.log('Contract submitted successfully:', response.data); // Handle success
      Alert.alert('Success', 'Contract submitted successfully.');
      router.push('/(servicetabs)/');
    } catch (error) {
      console.error('Error during contract submission:', error); // Handle error
      Alert.alert('Error', 'Failed to submit contract. Please try again.');
    }
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setWorkCompletionTime(selectedDate);
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

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerInput}>
        <Text style={styles.datePickerText}>
          {workCompletionTime ? workCompletionTime.toLocaleString() : 'Select Work Completion Time'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={workCompletionTime || new Date()}
          mode="datetime"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Job Summary"
        value={jobSummary}
        onChangeText={setJobSummary}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Send Contract</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContractForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  datePickerInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  datePickerText: {
    color: '#333',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: grey,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

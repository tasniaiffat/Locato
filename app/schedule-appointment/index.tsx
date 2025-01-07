import Heading from '@/components/Heading';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  useForm,
  Controller,
  SubmitHandler,
  FieldValues,
} from "react-hook-form";
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { to12HourFormat } from '@/utils/date';
import useSelectedSpecialist from '@/hooks/useSelectedSpecialist';
import AppointmentSummary from '@/components/AppointmentSummary';
import { router } from 'expo-router';

const backgroundimage = require("@/assets/images/locato_bg.jpg");



const ScheduleAppointment = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [dateTime, setDateTime] = useState<Date | null>(new Date());
  const [show, setShow] = useState(false);
  const { selectedSpecialist } = useSelectedSpecialist();
  console.log(selectedSpecialist);
  

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShow(false);
    if (selectedDate) {
      setDateTime(selectedDate);
    } else {
      Alert.alert("Error", "Please select a valid date and time");
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    Alert.alert(
      "Booking Confirmed",
      `Selected Time: ${to12HourFormat(data.datetime)}\nAdditional Details: ${data.details || "None"}`
    );
    router.push('/chat')
  };

  return (
    <ImageBackground
      source={backgroundimage}
      resizeMode="cover"
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <Heading
          size={40}
          style={styles.heading}
          textColor="white"
          textLabel="Appointment"
        />
        <AppointmentSummary selectedSpecialist={selectedSpecialist} />

        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statFeatureText}>10</Text>
            <Text style={styles.statText}>Projects Completed</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statFeatureText}>৳ 31,000</Text>
            <Text style={styles.statText}>Earned Last Month</Text>
          </View>
        </View>

        <Text style={styles.text}>Time of Service</Text>
        <Controller
          control={control}
          name="datetime"
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <>
              <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShow(true)}
              >
                <Text style={styles.dateText}>
                  {value ? to12HourFormat(value) : "Select Time"}
                </Text>
              </TouchableOpacity>
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={dateTime || new Date()}
                  mode="time"
                  display="default"
                  onChange={(event, selectedDate) => {
                    handleDateChange(event, selectedDate);
                    onChange(selectedDate); // Update form value
                  }}
                />
              )}
            </>
          )}
        />
        {errors.datetime && (
          <Text style={styles.errorText}>Please select a time.</Text>
        )}

        <Text style={[styles.text, { marginTop: 20 }]}>Additional Details</Text>
        <Controller
          control={control}
          name="details"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInput}
              placeholder="Add any additional details (optional)"
              placeholderTextColor="grey"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
        />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit(onSubmit)}
        >
      
          <Text style={styles.submitText}>Chat Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ScheduleAppointment;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    textAlign: "left",
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",

    paddingHorizontal: 20,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  heading: {
    marginBottom: 20,
    color: "white",
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: "left",
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  statText: {
    color: "navy",
    fontSize: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  statFeatureText: {
    color: "navy",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  dateInput: {
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
  },
  dateText: {
    color: "grey",
    textAlign: "center",
    fontSize: 16,
  },
  textInput: {
    width: "100%",
    height: 100,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    color: "white",
    textAlignVertical: "top",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#007BFF",
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  submitText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
});


const specialistCardStyles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    borderColor: 'grey',
    padding: 10,
    borderWidth: 1,
  },
  user_info: {
    width: '100%',
    marginBottom: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    marginRight: 5,
    borderRadius: 50,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
  },
  username_avatar : {
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  rating: {
    display: 'flex',
    flexDirection: 'row',
  },
});

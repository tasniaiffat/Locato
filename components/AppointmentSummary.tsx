import { SpecialistType } from "@/types/SpecialistType";
import { StyleSheet, View, Text } from "react-native";
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from "./ui/avatar";
import Heading from "./Heading";

const SpecialistCard = ({specialist}:{
    specialist: SpecialistType | null
}) => (
<View style={specialistCardStyles.container}>
<View style={specialistCardStyles.user_info}>
    <View style={specialistCardStyles.username_avatar}>
    <Avatar size='md' style={specialistCardStyles.avatar}>
        <AvatarFallbackText style={{
        fontSize: 15,
        color: 'white',
        fontWeight: 'bold',
        }}>
        {specialist?.name}
        </AvatarFallbackText>
        <AvatarImage
        source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        }}
        />
        <AvatarBadge />
    </Avatar>
    <Heading size={30} textColor="white" textLabel={specialist?.name || 'Undefined'}/>
    </View>
    <Heading size={20} style={specialistCardStyles.heading} textColor="white" textLabel="Expected Service Charge"/>
    <Text style={specialistCardStyles.text}>৳ {specialist?.serviceRate}</Text>

</View>
    
</View>
);
  
  
const AppointmentSummary = ({selectedSpecialist}:{
selectedSpecialist: SpecialistType | null
}) => {
return (
    <View style={{ marginBottom: 20 }}>
    <SpecialistCard specialist={selectedSpecialist} />
    </View>
);
};

export default AppointmentSummary;



const specialistCardStyles = StyleSheet.create({
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
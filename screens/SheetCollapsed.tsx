import { StarIcon } from '@/components/ui/icon';
import useSelectedSpecialist from '@/hooks/useSelectedSpecialist'
import { SpecialistType } from '@/types/SpecialistType';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Star } from 'lucide-react-native';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { HStack } from '@/components/ui/hstack';
import { router } from 'expo-router';



const SpecialistCard = ({specialist}:{
  specialist: SpecialistType
}) => (
  <View style={styles.container}>
  <View style={specialistCardStyles.user_info}>
    <View style={specialistCardStyles.username_avatar}>
      <Avatar size='md' style={specialistCardStyles.avatar}>
        <AvatarFallbackText style={{
          fontSize: 15,
          color: 'white',
          fontWeight: 'bold',
        }}>
          {specialist.name}
        </AvatarFallbackText>
        <AvatarImage
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        />
        <AvatarBadge />
      </Avatar>
      <Text style={styles.title}>{specialist.name}</Text>
    </View>
    <View style={specialistCardStyles.rating}>
      { Array.from({length: specialist.rating}).map((_, index) =>   <Star key={index} fill='orange'/>) }
      { Array.from({length: 5 - specialist.rating}).map((_, index) =>   <Star key={index} fill='gray'/>) }
    </View>
    {/* <Text style={styles.subtitle}>{specialist.rating}</Text> */}
    

  </View>
    
  </View>
);


const SpecalistDetailsCard = ({specialist}:{
  specialist: SpecialistType
}) => (
  <View style={styles.container}>
    <Text style={specialistDetailsStyles.title}>Details</Text>
    <View style={specialistDetailsStyles.infoView}>
      <Text style={specialistDetailsStyles.heading}>Experience:</Text>
      <Text style={specialistDetailsStyles.subtitle}>{specialist.experienceYears} years </Text>
    </View>
    

    <View style={specialistDetailsStyles.infoView}>
      <Text style={specialistDetailsStyles.heading}>Specialties:</Text>
      <Text style={specialistDetailsStyles.subtitle}>{specialist.specialties.join(', ')}</Text>
    </View>

    <View style={specialistDetailsStyles.infoView}>
      <Text style={specialistDetailsStyles.heading}>Certifications:</Text>
      <Text style={specialistDetailsStyles.subtitle}>{specialist.certifications}</Text>
    </View>
  </View>
);

const SpecialistServiceRateCard = ({specialist}:{
  specialist: SpecialistType
} ) => (
  <View style={styles.container}>
    <Text style={specialistDetailsStyles.title}>Service Rate</Text>
    <View style={specialistDetailsStyles.infoView}>
      <Text style={specialistDetailsStyles.subtitle}>{specialist.serviceRate} per hour</Text>
    </View>
  </View>
);




const SheetCollapsed = () => {
  const { selectedSpecialist, setSelectedSpecialist } = useSelectedSpecialist();


  const handleProceed = () => {
    console.log('Proceed');
    selectedSpecialist && setSelectedSpecialist(selectedSpecialist);
    router.push(`/schedule-appointment`);
  }
  return (
    <View style={styles.sheetContainer}>
      {selectedSpecialist && 
        <View style={styles.view}>
          <SpecialistCard specialist={selectedSpecialist} />
          <TouchableOpacity 
            onPress={handleProceed}
            style={styles.button}>
            <Text style={{color:'white',textAlign:'center',fontSize:20}}>Proceed</Text>
          </TouchableOpacity>
          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: StyleSheet.hairlineWidth,
            }}
          />
          <SpecialistServiceRateCard specialist={selectedSpecialist} />
          <SpecalistDetailsCard specialist={selectedSpecialist} />
        </View>
      }
      {!selectedSpecialist && <Text style={styles.title}>Showing specialists nearby</Text>}
    </View>
  )
}
export default SheetCollapsed;






const specialistCardStyles = StyleSheet.create({
  user_info: {
    width: '100%',
    marginBottom: 10,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
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


const specialistDetailsStyles = StyleSheet.create({
  title: {
    fontSize: 25,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 'auto',
  },
  heading: {
    fontSize: 15,
    textAlign: 'left',
    color: 'black',
    width: '50%',
    // backgroundColor: 'red',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'left',
    color: 'grey',
    width: 'auto',
    flexWrap: 'wrap', // Added to wrap text on overflow
  },

  infoView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

});



const styles = StyleSheet.create({
  sheetContainer: {
    width: '100%',
    height: '100%',
    overflowY: 'hidden',
    position: 'relative',
    // backgroundColor: 'red',
  },
  view: {
    flexDirection: 'column',
    gap: 20,
  },
  container: {
    width: '100%',
    borderRadius: 10,
    borderColor: 'grey',
    padding: 10,
    borderWidth: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'left',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 30,
    // top: 5,
  }
})
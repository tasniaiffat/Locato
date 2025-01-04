import { StarIcon } from '@/components/ui/icon';
import useSelectedSpecialist from '@/hooks/useSelectedSpecialist'
import { SpecialistType } from '@/types/SpecialistType';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Star } from 'lucide-react-native';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/avatar';
import { HStack } from '@/components/ui/hstack';


const SpecialistCard = ({specialist}:{
  specialist: SpecialistType
}) => (
  <View style={styles.container}>
  <View style={specialistCardStyles.user_info}>
    <View style={specialistCardStyles.username_avatar}>
      <Avatar size='xs' style={specialistCardStyles.avatar}>
        <AvatarFallbackText style={{

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
    <TouchableOpacity 
      onPress={() => {}}
      style={styles.button}>
      <Text style={{color:'white'}}>Contact</Text>
    </TouchableOpacity>
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
      <Text style={specialistDetailsStyles.heading}>Service rate:</Text>
      <Text style={specialistDetailsStyles.subtitle}>{specialist.serviceRate} per hour</Text>
    </View>
  </View>
);





const SheetCollapsed = () => {
  const { selectedSpecialist, setSelectedSpecialist } = useSelectedSpecialist();
  return (
    <View style={styles.sheetContainer}>
      {selectedSpecialist && 
        <View style={styles.view}>
          <SpecialistCard specialist={selectedSpecialist} />
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
    marginBottom: 20,
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  avatar: {
    width: 25,
    height: 25,
    marginRight: 5,

    borderRadius: 50,
    backgroundColor: 'red',
  },
  username_avatar : {
    // width: '100%',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
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
    overflowY: 'hidden',
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
    // backgroundColor: 'red',
    // borderEndColor: 'black',
    // borderBlockColor: 'grey',
    borderWidth: 1,
    // padding: 10,
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
    width: '30%',
    marginTop: 10,
  }
})
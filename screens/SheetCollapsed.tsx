import { StarIcon } from '@/components/ui/icon';
import useSelectedSpecialist from '@/hooks/useSelectedSpecialist'
import { SpecialistType } from '@/types/SpecialistType';
import { View, Text, StyleSheet } from 'react-native'
import { Star } from 'lucide-react-native';


const SpecialistCard = ({specialist}:{
  specialist: SpecialistType
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{specialist.name}</Text>
      {/* <Text style={styles.subtitle}>{specialist.rating}</Text> */}
      { Array.from({length: specialist.rating}).map((_, index) => <Star key={index} fill='orange'/>) }
    </View>
  )
};


const SheetCollapsed = () => {
  const { selectedSpecialist, setSelectedSpecialist } = useSelectedSpecialist();
  return (
    <View style={styles.container}>
      {selectedSpecialist && <SpecialistCard specialist={selectedSpecialist} />}
      {!selectedSpecialist && <Text style={styles.title}>Showing specialists nearby</Text>}
    </View>
  )
}
export default SheetCollapsed;


const styles = StyleSheet.create({
  container: {
    width: '100%',
    // alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'left',
  }
})
import useSelectedSpecialist from '@/hooks/useSelectedSpecialist';
import { View, Text, StyleSheet } from 'react-native'
const SheetMiddle = () => {
  const { selectedSpecialist, setSelectedSpecialist } = useSelectedSpecialist();
  return (
    <View style={styles.container}>
      {selectedSpecialist && <Text style={styles.title}>{selectedSpecialist.name}</Text>}
      {!selectedSpecialist && <Text style={styles.title}>Showing specialists nearby</Text>}
    </View>
  )
}
export default SheetMiddle

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
  }
})

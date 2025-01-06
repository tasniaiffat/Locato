import useSelectedSpecialist from '@/hooks/useSelectedSpecialist';
import { View, Text } from 'react-native'
const SheetExpanded = () => {
  const { selectedSpecialist, setSelectedSpecialist } = useSelectedSpecialist();
  return (
    <View>
      <Text>SheetExpanded</Text>
      {selectedSpecialist && <Text>{selectedSpecialist.name}</Text>}
      {!selectedSpecialist && <Text>Showing specialists nearby</Text>}
    </View>
  )
}
export default SheetExpanded
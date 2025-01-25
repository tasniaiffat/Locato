import { colors } from '@/constants/Colors';
import { View, Text, StyleSheet } from 'react-native'

const ServiceCard = ({ name, specialty, rating }: { name: string, specialty: string, rating: number }) => {
  const formattedRating = rating ? rating.toFixed(1) : 'N/A'; // Handle undefined rating
  
  return (
    <View style={cardStyles.container}>
        <Text style={cardStyles.specialtyText}>{specialty}</Text>
        <Text style={cardStyles.text}>{name}</Text>   
        <Text style={cardStyles.ratingText}>Rating: {formattedRating} ⭐</Text>
    </View>
  );
};

export default ServiceCard;

const cardStyles = StyleSheet.create({
  container: {
    width: 335,
    height: 170,
    backgroundColor: "#a0c3be",
    margin: 10,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'left'
  },
  text: {
    color: "#2a323d",
    fontSize: 14,
    fontWeight: 'bold',
    
  },
  specialtyText: {
    color: "#2a323d",
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  ratingText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: 'normal'
  }
});

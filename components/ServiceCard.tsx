import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ServiceCard = ({
  name,
  specialty,
  rating,
  bookmarked,
  onBookmarkPress, // Pass a function from the parent
}: {
  name: string;
  specialty: string;
  rating: number;
  bookmarked: boolean;
  onBookmarkPress: () => void; // Function for bookmark handling
}) => {
  const formattedRating = rating ? rating.toFixed(1) : 'N/A'; // Handle undefined rating

  return (
    <View style={cardStyles.container}>
      {/* Bookmark icon at the top right */}
      <TouchableOpacity
        style={cardStyles.bookmarkButton}
        onPress={onBookmarkPress} // Call the passed function
      >
        <Icon
          name="bookmark"
          size={20}
          color={bookmarked ? '#FFD700' : '#fff'} // Highlight if bookmarked
        />
      </TouchableOpacity>

      <Text style={cardStyles.specialtyText}>{specialty}</Text>
      <Text style={cardStyles.text}>{name}</Text>
      <Text style={cardStyles.ratingText}>Rating: {formattedRating} ⭐</Text>
    </View>
  );
};

export default ServiceCard;

const cardStyles = StyleSheet.create({
  container: {
    width: 150,
    height: 170,
    backgroundColor: "#a0c3be",
    margin: 10,
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'left',
    position: 'relative', // Add position relative to place the bookmark button inside the card
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
    color: '#fff', // Update to better contrast with background
    fontSize: 14,
    fontWeight: 'normal',
  },
  bookmarkButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

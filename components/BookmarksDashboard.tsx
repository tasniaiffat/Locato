import { colors } from '@/constants/Colors';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import BookmarkCard from './BookmarkCard';
import { AntDesign } from '@expo/vector-icons';
import api from '@/services/api'; // Import the API service

const handleSeeAllPress = () => {
  console.log('See All bookmarks pressed');
};

const BookmarksDashboard = () => {
  const [bookmarks, setBookmarks] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch favorite services from the API
  const fetchFavorites = async () => {
    try {
      const response = await api.get('/users/favorites');  // Using the api service
      setBookmarks(response.data);  // Set the fetched favorites to state
      setLoading(false);  // Stop loading
    } catch (error) {
      setLoading(false);  // Stop loading
      console.error('Error fetching favorites:', error);
      Alert.alert('Error', 'Failed to fetch favorites.');
    }
  };

  // Fetch the data when the component mounts
  useEffect(() => {
    fetchFavorites();
  }, []);

  // Render bookmarks if they exist or show a loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saved Services</Text>
      <FlatList
        data={bookmarks}
        renderItem={({ item }) => (
          <BookmarkCard
            key={item.id}  // Assuming each item has a unique `id`
            text={item.name}  // Update this based on your API response structure
          />
        )}
        horizontal={true}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() => (
          <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllPress}>
            <Text style={styles.seeAllText}>See All</Text>
            <AntDesign name="right" size={24} color={colors.tint} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BookmarksDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#dfe4e0",
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginVertical: 20,
  },
  seeAllButton: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 16,
    marginVertical: 'auto',
  },
  seeAllText: {
    color: colors.tint,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

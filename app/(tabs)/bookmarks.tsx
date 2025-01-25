import { colors } from '@/constants/Colors';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import BookmarkCard from '@/components/BookmarkCard'; // Assuming BookmarkCard is set up to display service info
import { AntDesign } from '@expo/vector-icons';
import api from '@/services/api'; // Import the API service
import * as SecureStore from 'expo-secure-store'; // Import Secure Store

const handleSeeAllPress = () => {
  console.log('See All bookmarks pressed');
};

const BookmarksDashboard = () => {
  const [bookmarks, setBookmarks] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Function to fetch favorite services from the API
  const fetchFavorites = async () => {
    try {
      const token = await SecureStore.getItemAsync("userId"); // Fetch the token from Secure Store
      if (!token) {
        Alert.alert('Error', 'Authentication token not found.');
        setLoading(false);
        return;
      } else {
        console.log("Token", token);
      }

      const response = await api.get(`/users/favorites?userId=${token}`);
      setBookmarks(response.data); // Set the fetched favorites to state
    } catch (error) {
      console.error('Error fetching favorites:', error);
      Alert.alert('Error', 'Failed to fetch favorites.');
    } finally {
      setLoading(false); // Stop loading in both success and failure cases
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

  // Only display the first 5 bookmarks
  const displayedBookmarks = bookmarks.slice(0, 5);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Saved Services</Text>
      <FlatList
        data={displayedBookmarks}
        renderItem={({ item }) => (
          <BookmarkCard
            key={item.id} // Assuming each item has a unique `id`
            name={item.name} // Service provider name
            specialty={item.specialties.length > 0 ? item.specialties.map((spec) => spec.title).join(", "): 'Expert'}
            rating={item.rating || 0} // Rating (default to 0 if not provided)
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={() =>
          bookmarks.length > 5 ? (
            <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAllPress}>
              <Text style={styles.seeAllText}>See All</Text>
              <AntDesign name="right" size={24} color={colors.tint} />
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

export default BookmarksDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dfe4e0',
    height: '100%',
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

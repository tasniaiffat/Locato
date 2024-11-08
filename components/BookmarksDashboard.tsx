import { colors } from '@/constants/Colors';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native'

const BookmarkCard = () => (
    <View style={cardStyles.container}>
        <Text style={cardStyles.text}>Bookmark Card</Text>
    </View>
)



const BookmarksDashboard = () => {
  const [bookmarks, setBookmarks] = useState(Array.from({length: 5}, (_, i) => <BookmarkCard key={i}/>))
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Saved Services</Text>
        <FlatList
            data={bookmarks}
            renderItem={({item}) => item}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
        />
    </View>
  )
}
export default BookmarksDashboard;


const cardStyles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        backgroundColor: colors.tint,
        margin: 10,
        borderRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: colors.background,
        fontSize: 20,
        fontWeight: 'bold'
    }
})




const styles = StyleSheet.create({
    container: {
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.text,
      marginVertical: 20,
      marginLeft: 20
    }
})
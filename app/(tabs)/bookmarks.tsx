import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Bookmarks() {
  return (
    <View style={styles.container}>
      <Text>Bookmarks</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  }
})
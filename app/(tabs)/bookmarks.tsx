import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function Bookmarks() {
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text>Bookmarks</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  }
})
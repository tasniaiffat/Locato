import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

export default function Contribute() {
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <Text>Contribute</Text>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  }
})
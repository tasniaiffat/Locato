import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import React from 'react'
import MyHeader from '@/components/MyHeader'
import { colors } from '@/constants/Colors'
import SearchDiv from '@/components/SearchDiv'

export default function Home() {
  return (
    <View style={styles.container}>
      <SearchDiv />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center'
  },
})
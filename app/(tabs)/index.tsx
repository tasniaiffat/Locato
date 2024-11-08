import { StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { colors } from '@/constants/Colors'
import SearchDiv from '@/components/SearchDiv'
import BookmarksDashboard from '@/components/BookmarksDashboard'
import ServicesNearby from '@/components/ServicesNearby'

export default function Home() {
  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      <SearchDiv />
      <ServicesNearby />
      <BookmarksDashboard />
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    margin: 5,
    flex: 1,
  },
})
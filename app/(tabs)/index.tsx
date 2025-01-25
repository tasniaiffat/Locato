import { ImageBackground, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { colors } from '@/constants/Colors'
import SearchDiv from '@/components/SearchDiv'
import BookmarksDashboard from '@/components/BookmarksDashboard'
import ServicesNearby from '@/components/ServicesNearby'
import { SpecialistType } from '@/types/SpecialistType'
import { SelectedSpecialistContext } from '@/contexts/SelectedSpecialistContext'
import RecommendedQueries from '@/components/RecommendedQueries'
import LocatoSubscription from '@/components/SubscriptionSection'

export default function Home() {

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}>
      {/* <ImageBackground src=""/> */}
        <SearchDiv />
        <RecommendedQueries />
        <ServicesNearby />
        <LocatoSubscription/>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#dfe4e0",
  },
})
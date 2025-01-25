import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import Heading from './Heading'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { mlAPI } from '@/services/api';
import * as SecureStore from 'expo-secure-store';
import { colors } from '@/constants/Colors';

const RecommendedQueries = () => {

  const [queries, setQueries] = useState<string[]>([]);

  const fetchQueries = async () => {
    const userId = await SecureStore.getItemAsync("userId");
    if (!userId) {
      console.log("User not logged in for recommended queries");
      
      return;
    }
    const response = await mlAPI.get(`/recommendations/svd/${userId}`);
    console.log(response.data.recommended_queries);
    
    setQueries(response.data.recommended_queries);
  }
  useEffect(() => {
    fetchQueries();
  },[]);
  
  return (
    <View style={{ padding: 15 }}>
      <Heading
        textColor='black'
        textLabel='Recommended Queries'
        size={25}
        style={{ marginTop: 10, marginBottom: 10 }}
        />

        <ScrollView horizontal={true} style={{ flexDirection: 'row', overflow:'scroll' }}>
          {queries.map((query, index) => (
            <View 
              key={index}
              style={{ padding: 10, backgroundColor: colors.background, borderRadius: 10, margin: 5 }}>
              <Text key={index} style={{color:colors.tabIconDefault}}>{query}</Text>
            </View>
          ))}
        </ScrollView>
    </View>
  )
}
export default RecommendedQueries
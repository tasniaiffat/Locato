import { grey, lightblue } from '@/constants/Colors';
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const providerData = {
  name: 'Jane Doe',
  speciality: 'Web Developer',
  experience: 8, // years of experience
  revenue: '$150,000', // total earned revenue
  recentProjects: [
    { id: '1', title: 'E-commerce Website', description: 'Built a complete e-commerce solution.' },
    { id: '2', title: 'Portfolio Website', description: 'Designed a personal portfolio for a photographer.' },
    { id: '3', title: 'Mobile App', description: 'Developed a cross-platform mobile application.' },
  ],
};

const Dashboard = () => {
  const renderProjectItem = ({ item }) => (
    <View style={styles.projectItem}>
      <Text style={styles.projectTitle}>{item.title}</Text>
      <Text style={styles.projectDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.name}>{providerData.name}</Text>
        <Text style={styles.speciality}>{providerData.speciality}</Text>
        <Text style={styles.experience}>{providerData.experience} years of experience</Text>
      </View>

      <View style={styles.statsSection}>
        <Text style={styles.statsHeader}>Total Earned Revenue</Text>
        <Text style={styles.revenue}>{providerData.revenue}</Text>
      </View>

      <View style={styles.projectsSection}>
        <Text style={styles.projectsHeader}>Recent Projects</Text>
        <FlatList
          data={providerData.recentProjects}
          renderItem={renderProjectItem}
          keyExtractor={(item) => item.id}
          style={styles.projectList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 16,
  },
  profileHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  speciality: {
    fontSize: 18,
    color: '#555',
    marginTop: 4,
  },
  experience: {
    fontSize: 16,
    color: '#777',
    marginTop: 4,
  },
  statsSection: {
    marginBottom: 20,
    backgroundColor: lightblue,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  statsHeader: {
    fontSize: 18,
    color: grey,
    fontWeight: 'bold',
  },
  revenue: {
    fontSize: 20,
    color: grey,
    fontWeight: 'bold',
    marginTop: 8,
  },
  projectsSection: {
    flex: 1,
  },
  projectsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  projectList: {
    flex: 1,
  },
  projectItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  projectDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});

export default Dashboard;

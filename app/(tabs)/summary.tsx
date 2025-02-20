import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SummaryCard = ({ title, items, icon }: { title: string; items: string[]; icon: string }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.card, isDark && styles.cardDark]}>
      <View style={styles.cardHeader}>
        <Ionicons name={icon as any} size={24} color="#007AFF" />
        <Text style={[styles.cardTitle, isDark && styles.textLight]}>{title}</Text>
      </View>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={[styles.itemText, isDark && styles.textLight]}>{item}</Text>
          <Pressable style={styles.editButton}>
            <Ionicons name="pencil" size={16} color="#007AFF" />
          </Pressable>
        </View>
      ))}
    </View>
  );
};

export default function SummaryScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const actionItems = [
    'Review Q4 reports by Friday',
    'Prepare presentation slides',
    'Contact marketing team',
  ];

  const meetingDetails = [
    'Next Tuesday at 2 PM',
    'Virtual Meeting - Zoom',
    'Duration: 1 hour',
  ];

  const keyPoints = [
    'Discussed Q4 performance metrics',
    'New marketing strategy overview',
    'Team capacity planning',
  ];

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.textLight]}>Summary</Text>
      </View>

      <ScrollView style={styles.content}>
        <SummaryCard title="Action Items" items={actionItems} icon="checkmark-circle" />
        <SummaryCard title="Meeting Details" items={meetingDetails} icon="calendar" />
        <SummaryCard title="Key Discussion Points" items={keyPoints} icon="list" />
      </ScrollView>

      <View style={styles.fab}>
        <Pressable style={styles.fabButton}>
          <Ionicons name="share-outline" size={24} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  containerDark: {
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  textLight: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardDark: {
    backgroundColor: '#2C2C2C',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#1A1A1A',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  editButton: {
    padding: 4,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
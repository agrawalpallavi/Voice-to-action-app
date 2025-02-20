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

const TaskItem = ({ task, priority }: { task: string; priority: 'high' | 'medium' | 'low' }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const priorityColors = {
    high: '#FF3B30',
    medium: '#FF9500',
    low: '#34C759',
  };

  return (
    <View style={[styles.taskItem, isDark && styles.taskItemDark]}>
      <View style={styles.taskContent}>
        <View style={[styles.priorityDot, { backgroundColor: priorityColors[priority] }]} />
        <Text style={[styles.taskText, isDark && styles.textLight]}>{task}</Text>
      </View>
      <View style={styles.taskActions}>
        <Pressable style={styles.actionButton}>
          <Ionicons name="calendar-outline" size={20} color="#007AFF" />
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Ionicons name="share-outline" size={20} color="#007AFF" />
        </Pressable>
      </View>
    </View>
  );
};

export default function TasksScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const tasks = [
    { task: 'Review Q4 reports', priority: 'high' as const, deadline: 'Friday' },
    { task: 'Prepare presentation slides', priority: 'medium' as const, deadline: 'Next week' },
    { task: 'Contact marketing team', priority: 'low' as const, deadline: 'Tomorrow' },
    { task: 'Update project timeline', priority: 'medium' as const, deadline: 'Today' },
  ];

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.textLight]}>Tasks</Text>
      </View>

      <ScrollView style={styles.content}>
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={`${task.task} (${task.deadline})`}
            priority={task.priority}
          />
        ))}
      </ScrollView>

      <View style={styles.fab}>
        <Pressable style={styles.fabButton}>
          <Ionicons name="add" size={24} color="white" />
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
  taskItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskItemDark: {
    backgroundColor: '#2C2C2C',
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  taskActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  actionButton: {
    padding: 8,
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
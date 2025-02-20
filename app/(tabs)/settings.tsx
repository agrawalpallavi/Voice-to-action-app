import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const SettingItem = ({
  icon,
  title,
  description,
  type = 'toggle',
  value,
  onValueChange,
}: {
  icon: string;
  title: string;
  description: string;
  type?: 'toggle' | 'select';
  value: boolean;
  onValueChange: (value: boolean) => void;
}) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.settingItem, isDark && styles.settingItemDark]}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon as any} size={24} color="#007AFF" />
      </View>
      <View style={styles.settingContent}>
        <Text style={[styles.settingTitle, isDark && styles.textLight]}>{title}</Text>
        <Text style={[styles.settingDescription, isDark && styles.textLightSecondary]}>
          {description}
        </Text>
      </View>
      {type === 'toggle' && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={value ? '#007AFF' : '#f4f3f4'}
        />
      )}
      {type === 'select' && (
        <Pressable>
          <Ionicons name="chevron-forward" size={20} color="#999999" />
        </Pressable>
      )}
    </View>
  );
};

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const [settings, setSettings] = useState({
    darkMode: colorScheme === 'dark',
    autoSave: true,
    businessModel: true,
  });

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.textLight]}>Settings</Text>
      </View>

      <View style={styles.content}>
        <SettingItem
          icon="moon"
          title="Dark Mode"
          description="Enable dark mode for better visibility in low light"
          value={settings.darkMode}
          onValueChange={(value) =>
            setSettings((prev) => ({ ...prev, darkMode: value }))
          }
        />

        <SettingItem
          icon="save"
          title="Auto-save Transcriptions"
          description="Automatically save all voice recordings and transcriptions"
          value={settings.autoSave}
          onValueChange={(value) =>
            setSettings((prev) => ({ ...prev, autoSave: value }))
          }
        />

        <SettingItem
          icon="business"
          title="Business-optimized Model"
          description="Use AI model optimized for business terminology"
          value={settings.businessModel}
          onValueChange={(value) =>
            setSettings((prev) => ({ ...prev, businessModel: value }))
          }
        />
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
  textLightSecondary: {
    color: '#CCCCCC',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  settingItemDark: {
    backgroundColor: '#2C2C2C',
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666666',
  },
});
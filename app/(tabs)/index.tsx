import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { WaveformAnimation } from '../../components/WaveformAnimation';
import { useRecording } from '../../hooks/useRecording';

export default function RecordScreen() {
  const {
    isRecording,
    isProcessing,
    transcription,
    error,
    startRecording,
    stopRecording,
  } = useRecording();
  
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handleRecordPress = async () => {
    if (isRecording) {
      await stopRecording();
    } else {
      await startRecording();
    }
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.containerDark]}>
      <View style={styles.header}>
        <Text style={[styles.title, isDark && styles.textLight]}>EchoTalk</Text>
      </View>

      <View style={styles.waveformContainer}>
        <WaveformAnimation isRecording={isRecording} />
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <ScrollView
        style={styles.transcriptionContainer}
        contentContainerStyle={styles.transcriptionContent}>
        {isProcessing ? (
          <View style={styles.processingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={[styles.processingText, isDark && styles.textLight]}>
              Processing your recording...
            </Text>
          </View>
        ) : (
          <Text style={[styles.transcriptionText, isDark && styles.textLight]}>
            {transcription || 'Press and hold the microphone button to start recording...'}
          </Text>
        )}
      </ScrollView>

      <View style={styles.controlsContainer}>
        <Pressable
          onPress={handleRecordPress}
          style={[
            styles.recordButton,
            isRecording && styles.recordButtonActive,
            isProcessing && styles.recordButtonDisabled,
          ]}
          disabled={isProcessing}>
          <Ionicons
            name={isRecording ? 'stop' : 'mic'}
            size={32}
            color="white"
          />
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
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  textLight: {
    color: '#FFFFFF',
  },
  waveformContainer: {
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transcriptionContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  transcriptionContent: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    minHeight: 200,
  },
  transcriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#1A1A1A',
  },
  controlsContainer: {
    padding: 20,
    alignItems: 'center',
  },
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
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
  recordButtonActive: {
    backgroundColor: '#FF3B30',
  },
  recordButtonDisabled: {
    backgroundColor: '#999999',
    opacity: 0.7,
  },
  errorContainer: {
    margin: 20,
    padding: 10,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
  },
  processingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  processingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#1A1A1A',
    textAlign: 'center',
  },
});
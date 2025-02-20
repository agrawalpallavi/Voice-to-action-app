import { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';
import { recordingManager } from '../lib/recording';
import { storage, Recording } from '../lib/storage';
import { transcribeAudio, extractInformation, startSpeechRecognition, stopSpeechRecognition } from '../lib/openai';

export function useRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [currentRecording, setCurrentRecording] = useState<Recording | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const checkPermissions = async () => {
    try {
      if (Platform.OS === 'web') {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        stream.getTracks().forEach(track => track.stop());
        return true;
      } else {
        const permission = await Audio.requestPermissionsAsync();
        return permission.status === 'granted';
      }
    } catch (err) {
      console.error('Permission error:', err);
      return false;
    }
  };

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      const hasPermission = await checkPermissions();
      
      if (!hasPermission) {
        throw new Error('Microphone permission not granted');
      }

      if (Platform.OS === 'web') {
        await startSpeechRecognition();
      } else {
        await recordingManager.startRecording();
      }
      
      setIsRecording(true);
      setTranscription('');
    } catch (err) {
      setError('Failed to start recording. Please check permissions.');
      console.error('Start recording error:', err);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      setError(null);
      setIsProcessing(true);
      
      let audioUri = '';
      if (Platform.OS === 'web') {
        await stopSpeechRecognition();
        audioUri = 'web-recording'; // Placeholder for web
      } else {
        audioUri = await recordingManager.stopRecording();
      }
      
      setIsRecording(false);

      // Transcribe the audio
      const text = await transcribeAudio(audioUri);
      setTranscription(text);

      // Extract structured information
      const info = await extractInformation(text);

      // Save the recording
      const recording = await recordingManager.saveRecording(
        text,
        audioUri,
        30 // Duration in seconds
      );
      setCurrentRecording(recording);

      // Save extracted information
      if (info.meeting) {
        await storage.addMeeting({
          ...info.meeting,
          recordingId: recording.id,
        });
      }

      if (info.actionItems) {
        for (const item of info.actionItems) {
          await storage.addTask({
            title: item.task,
            priority: item.priority,
            deadline: item.deadline,
            completed: false,
            recordingId: recording.id,
          });
        }
      }

      if (info.keyPoints) {
        for (const point of info.keyPoints) {
          await storage.addKeyPoint({
            text: point,
            recordingId: recording.id,
          });
        }
      }
    } catch (err) {
      setError('Failed to process recording.');
      console.error('Stop recording error:', err);
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return {
    isRecording,
    isProcessing,
    transcription,
    currentRecording,
    error,
    startRecording,
    stopRecording,
  };
}
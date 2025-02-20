import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { storage, Recording } from './storage';

class RecordingManager {
  private recording: Audio.Recording | null = null;
  private sound: Audio.Sound | null = null;

  async startRecording(): Promise<void> {
    try {
      // Request permissions
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status !== 'granted') {
        throw new Error('Permission to record was denied');
      }

      // Configure audio mode
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      // Create and start recording
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      this.recording = recording;
    } catch (error) {
      console.error('Failed to start recording:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<string> {
    if (!this.recording) {
      throw new Error('No recording in progress');
    }

    try {
      await this.recording.stopAndUnloadAsync();
      const uri = this.recording.getURI();
      if (!uri) throw new Error('Recording URI is null');

      // Move the recording to a permanent location
      const fileName = `recording-${Date.now()}.m4a`;
      const newUri = `${FileSystem.documentDirectory}${fileName}`;
      await FileSystem.moveAsync({ from: uri, to: newUri });

      this.recording = null;
      return newUri;
    } catch (error) {
      console.error('Failed to stop recording:', error);
      throw error;
    }
  }

  async playRecording(uri: string): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync({ uri });
      this.sound = sound;
      await sound.playAsync();
    } catch (error) {
      console.error('Failed to play recording:', error);
      throw error;
    }
  }

  async stopPlayback(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.stopAsync();
        await this.sound.unloadAsync();
        this.sound = null;
      }
    } catch (error) {
      console.error('Failed to stop playback:', error);
      throw error;
    }
  }

  async saveRecording(text: string, audioUri: string, duration: number): Promise<Recording> {
    try {
      return await storage.addRecording({
        text,
        audioUri,
        timestamp: Date.now(),
        duration,
      });
    } catch (error) {
      console.error('Failed to save recording:', error);
      throw error;
    }
  }
}

export const recordingManager = new RecordingManager();
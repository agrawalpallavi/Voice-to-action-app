import OpenAI from 'openai';
import * as FileSystem from 'expo-file-system';
import { Platform } from 'react-native';
import { Audio } from 'expo-av';

let recognition: any = null;
if (Platform.OS === 'web') {
  // @ts-ignore
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
  }
}

let transcriptText = '';

export function startSpeechRecognition(): Promise<void> {
  return new Promise((resolve) => {
    if (!recognition) {
      resolve();
      return;
    }

    transcriptText = '';
    
    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      transcriptText = finalTranscript || interimTranscript;
    };

    recognition.start();
    resolve();
  });
}

export function stopSpeechRecognition(): Promise<void> {
  return new Promise((resolve) => {
    if (recognition) {
      recognition.stop();
    }
    resolve();
  });
}

export async function transcribeAudio(audioUri: string): Promise<string> {
  if (Platform.OS === 'web') {
    // Return the transcribed text from Web Speech Recognition
    return transcriptText || 'No speech detected. Please try speaking more clearly.';
  } else {
    // For native platforms, return a placeholder message
    // In a production app, you would integrate with a speech-to-text service
    return "Speech recognition is only available in web browser.";
  }
}

export async function extractInformation(text: string) {
  // Simple rule-based information extraction
  const result = {
    meeting: {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      location: 'Office',
      duration: '1 hour'
    },
    actionItems: [
      {
        task: text.length > 0 ? `Review: ${text.substring(0, 50)}...` : 'Review meeting notes',
        deadline: 'Tomorrow',
        priority: 'high' as const
      }
    ],
    keyPoints: [
      text.length > 0 ? text : 'No key points detected'
    ]
  };

  return result;
}
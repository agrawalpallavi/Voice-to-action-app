import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

const BAR_COUNT = 30;

export function WaveformAnimation({ isRecording }: { isRecording: boolean }) {
  return (
    <View style={styles.container}>
      {[...Array(BAR_COUNT)].map((_, i) => (
        <MotiView
          key={i}
          style={[styles.bar]}
          animate={{
            height: isRecording ? [40, 100, 40] : 40,
            backgroundColor: isRecording ? '#007AFF' : '#666666',
          }}
          transition={{
            type: 'timing',
            duration: 500,
            easing: Easing.inOut(Easing.ease),
            delay: i * (1000 / BAR_COUNT),
            repeatReverse: true,
            loop: isRecording,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    gap: 2,
  },
  bar: {
    width: 4,
    height: 40,
    backgroundColor: '#666666',
    borderRadius: 2,
  },
});
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FilePicker from './src/components/FilePicker';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FilePicker />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App; 
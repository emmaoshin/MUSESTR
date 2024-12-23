import React, { useState } from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';

const FilePicker = () => {
  const [fileUri, setFileUri] = useState(null);
  const [error, setError] = useState(null);

  const pickFile = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      // Verify file exists
      const exists = await RNFS.exists(result[0].uri);
      if (!exists) {
        throw new Error('Selected file does not exist');
      }

      setFileUri(result[0].uri);
      setError(null);
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        setError('Error selecting file: ' + err.message);
        console.error('File picker error:', err);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select File" onPress={pickFile} />
      {fileUri && (
        <Text style={styles.fileUri}>
          Selected file: {fileUri}
        </Text>
      )}
      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  fileUri: {
    marginTop: 20,
    fontSize: 14,
  },
  error: {
    marginTop: 20,
    color: 'red',
    fontSize: 14,
  },
});

export default FilePicker;

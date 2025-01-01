import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Modal from 'react-native-modal';
import Colors from '../constants/Colors';
import { useThemeContext } from '../hooks/themeContext';

const DeleteConfirmationModal = ({ isVisible, onDelete, onCancel, modalText, deletingState }) => {
  const { theme } = useThemeContext();


  return (
    <Modal
      isVisible={isVisible}
      backdropColor={theme.colors.backdrop} // Customize the backdrop color
      backdropOpacity={0.8} // Customize the backdrop opacity
      onBackdropPress={onCancel}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onRequestClose={onCancel}>
      <View style={[styles.modalContainer, { backgroundColor: theme.colors.tetiaryBackground }]}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.message, { color: theme.colors.text }]}>{modalText}</Text>
          
          {/* Show Activity Indicator if deletingState is true */}
          {deletingState ? (
            <ActivityIndicator size="large" color={Colors.primary} />
          ) : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity onPress={onDelete} style={[styles.button, { backgroundColor: Colors.primary }]}>
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onCancel}
                style={[styles.button, { borderColor: Colors.primary, borderWidth: 2, borderBottomWidth: 4 }]}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 20,
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default DeleteConfirmationModal;

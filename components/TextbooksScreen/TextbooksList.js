import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';

const TextbooksList = () => {
  // Dummy dataset of books
  const books = [
    {
      id: '1',
      name: 'Mathematics for Beginners',
      cover: 'https://via.placeholder.com/150x200.png?text=Mathematics',
      url: 'https://example.com/mathematics',
    },
    {
      id: '2',
      name: 'Science Simplified',
      cover: 'https://via.placeholder.com/150x200.png?text=Science',
      url: 'https://example.com/science',
    },
    {
      id: '3',
      name: 'History Essentials',
      cover: 'https://via.placeholder.com/150x200.png?text=History',
      url: 'https://example.com/history',
    },
    {
      id: '4',
      name: 'Geography Insights',
      cover: 'https://via.placeholder.com/150x200.png?text=Geography',
      url: 'https://example.com/geography',
    },
    {
      id: '5',
      name: 'English Literature',
      cover: 'https://via.placeholder.com/150x200.png?text=English',
      url: 'https://example.com/english',
    },
    {
      id: '6',
      name: 'Physics Concepts',
      cover: 'https://via.placeholder.com/150x200.png?text=Physics',
      url: 'https://example.com/physics',
    },
  ];

  const renderBook = ({ item }) => (
    <TouchableOpacity
      style={styles.bookContainer}
      onPress={() => {
        console.log(`Book URL: ${item.url}`);
      }}
    >
      <Image source={{ uri: item.cover }} style={styles.coverImage} />
      <Text style={styles.bookName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderBook}
        keyExtractor={(item) => item.id}
        numColumns={2} // Display 2 books per row
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    marginTop: 40,
  },
  listContent: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between', // Space books evenly in a row
    marginBottom: 20,
  },
  bookContainer: {
    flex: 1,
    marginHorizontal: 8,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Android shadow
  },
  coverImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  bookName: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default TextbooksList;

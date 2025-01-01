import React, { memo, useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import MyClassCard from './MyClassCard';
import { useNavigation } from '@react-navigation/native';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useContentContext } from '../../hooks/contentContext';
import Icon from 'react-native-vector-icons/Ionicons';
import FontSizes from '../../constants/FontSizes';
import { useUserDataContext } from '../../hooks/userDataContext';
import CourseCard from './CourseCard';
import { useCompletedWorkContext } from '../../hooks/completedWorkContext';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';

const { width } = Dimensions.get('window');

const MyClassesList = () => {
  const { levelState } = useUserDataContext();
  const { getIntoClass, classContent, isGoToClassButtonPressed, setIsGoToClassButtonPressed, getIntoCourse } = useContentContext();
  const { myClasses, loadingMyClasses, unEnroll, setMyCurrentChapters, setMyContentState, setCurrentQuestionPaperOrSyllabus, setCurrentQuestionPapers} = useAllSubjectsContext();
  const { completedWork } = useCompletedWorkContext();
  const { theme } = useThemeContext();
  const navigation = useNavigation();
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const goToClass = (item, subjectId) => {
    getIntoClass(subjectId, item.termId);
    setMyCurrentChapters(item.chapters);
    setMyContentState(prevState => ({
      ...prevState,
      currentSubject: subjectId,
      currentTerm: item.termId,
    }));
    navigation.navigate('MyClass');
  };

  const goToCourse = (courseId) => {
    getIntoCourse(courseId);
    setMyContentState(prevState => ({
      ...prevState,
      currentSubject: courseId,
      currentTerm: null,
    }));
    navigation.navigate('MyClass');
  };

  const goToQuestionPapers = async (subjectId) => {
    try {
      navigation.navigate('QuestionPapers');
      let papersCollectionRef;
      if (levelState === 'Tertiary') {
        papersCollectionRef = collection(db, 'courses', subjectId, 'questionPapers');
      } else {
        papersCollectionRef = collection(db, 'subjects', subjectId, 'questionPapers');
      }

      const q = query(papersCollectionRef);
      const querySnapshot = await getDocs(q);
      const papers = [];

      querySnapshot.forEach((doc) => {
        papers.push({ id: doc.id, ...doc.data() });
      });
      setCurrentQuestionPapers(papers);
    } catch (error) {
      console.error('Error fetching question papers:', error);
    }
  };

  const handleDelete = (subjectId) => {
    unEnroll(subjectId);
    setDeleteModalVisible(false);
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const calculateProgress = (subjectId, termId) => {
    let totalCompletedTime = 0;
    let totalTime = 0;

    const extractNumberFromString = (str) => {
      if (typeof str !== 'string') {
        return 0; // Return 0 if str is not a string or is undefined/null
      }

      const match = str.match(/\d+/); // Extract the digits from the string
      return match ? Number(match[0]) : 0; // Convert to number, default to 0 if no match
    };

    if (levelState === 'Tertiary') {
      completedWork.forEach(subject => {
        if (subject.name === subjectId) {
          subject.items.forEach(item => {
            const duration = extractNumberFromString(item.duration); // Extract and convert duration
            totalCompletedTime += duration;
          });
        }
      });

      myClasses.forEach(subject => {
        if (subject.courseId === subjectId) {
          totalTime += subject.totalTime;
        }
      });
    } else {
      completedWork.forEach(subject => {
        if (subject.name === subjectId) {
          subject.items.forEach(item => {
            if (item.termId === termId) {
              const duration = extractNumberFromString(item.duration); // Extract and convert duration
              totalCompletedTime += duration;
            }
          });
        }
      });

      myClasses.forEach(subject => {
        if (subject.subjectId === subjectId) {
          subject.terms.forEach(term => {
            if (term.termId === termId) {
              totalTime += term.totalTime;
            }
          });
        }
      });
    }

    return totalTime > 0 ? Math.round((totalCompletedTime / totalTime) * 100) : 0;
  };

  const renderCourse = ({ item }) => {
    const progress = calculateProgress(item.courseId, null);
    return (
      <CourseCard
        universityName={item.universityName}
        courseName={item.name}
        progress={progress}
        goToClass={() => goToCourse(item.courseId)}
        courseId={item.courseId}
      />
    );
  };

  const goToPdfScreen =({pdf})=>{
    console.log('Here is the pdf racho',pdf)
    setCurrentQuestionPaperOrSyllabus(pdf)
    navigation.navigate('PDF');
  }

  const renderItem = ({ item }) => {
    const sabaId = item.subjectId;
    const subImage = item.imagePath;

    return (
      <View style={styles.subjectContainer}>
        <View style={styles.headerContainer}>
          <Text
            style={[
              styles.subjectText,
              { color: theme.colors.text, maxWidth: width / 3 }, // Ensures text wraps if too long
            ]}
            numberOfLines={2} // Limits the number of lines to 2
            ellipsizeMode="tail" // Adds ellipsis if text overflows
          >
            {item.subject}
          </Text>
          <TouchableOpacity
            onPress={() => goToPdfScreen({pdf:item.syllabusUrl})}
          >
            <Text style={[styles.syllabus, { backgroundColor: theme.colors.secondaryBackground }, { color: theme.colors.text }]}>Syllabus</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>goToQuestionPapers(item.subjectId)}>
            <Text style={[styles.syllabus, { backgroundColor: theme.colors.secondaryBackground }, { color: theme.colors.text }]}>Past papers</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={openDeleteModal} style={styles.trashIcon}>
            <Icon name="trash-outline" size={20} color={theme.colors.text} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={item.terms.sort((a, b) => a.termNumber - b.termNumber)}
          renderItem={({ item }) => renderForm(item, sabaId, subImage)}
          keyExtractor={(formItem, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <DeleteConfirmationModal
          isVisible={isDeleteModalVisible}
          onDelete={() => handleDelete(item.subjectId)}
          onCancel={handleCancelDelete}
          modalText="Are you sure you want to delete this class?"
        />
      </View>
    );
  };

  const renderForm = (item, subjectId, subImage) => {
    const progress = calculateProgress(subjectId, item.termId);

    return (
      <MyClassCard
        form={item.form}
        totalHours={'20'}
        subjectImage={subImage}
        progress={progress}
        term={item.term}
        goToClass={() => goToClass(item, subjectId)}
      />
    );
  };

  return (
    <View>
      {loadingMyClasses || !levelState ? (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontFamily: 'ComicNeue-Bold', color: theme.colors.text }}>Loading...</Text>
        </View>
      ) : myClasses.length > 0 && !loadingMyClasses ? (
        <FlatList
          data={myClasses}
          renderItem={levelState === 'Tertiary' ? renderCourse : renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontSize: 20, fontFamily: 'ComicNeue-Bold', color: theme.colors.text }}>No classes yet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  subjectContainer: {
    marginTop: 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subjectText: {
    fontSize: FontSizes.heading6,
    fontFamily: 'ComicNeue-Bold',
    marginBottom: 5,
    marginLeft: 15,
  },
  syllabus: {
    backgroundColor: '#f1f1f1',
    color: '#666',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginLeft: 20,
    fontFamily: 'ComicNeue-Bold',
    fontSize: FontSizes.caption,
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    minWidth: 150,
  },
  formText: {
    fontSize: 16,
  },
  trashIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default MyClassesList;

import React, { memo, useCallback, useRef, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { BallIndicator } from 'react-native-indicators'; // Step 1
import { useNavigation } from '@react-navigation/native';
import { useSubjectContext } from '../../hooks/subjectDetailsConst';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import Colors from '../../constants/Colors';
import SubjectCard from './SubjectCards';
import { useThemeContext } from '../../hooks/themeContext';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FontSizes from '../../constants/FontSizes';
import { useUserDataContext } from '../../hooks/userDataContext';

const SubjectCardList = () => {
  const { width, height } = Dimensions.get('screen');
  const { levelState } = useUserDataContext();
  const { theme } = useThemeContext();
  const flatListRef = useRef(null);
  const navigation = useNavigation();
  const { filteredSubjects, loadingSubjects } = useAllSubjectsContext();
  const { setSubjectDetails } = useSubjectContext();

  const [loading, setLoading] = useState(false); // Step 2

  const handleOnPress = useCallback(async (item) => {
    setLoading(true); // Step 3

    // Perform any asynchronous tasks here, for example, API calls, etc.

    navigation.navigate('Enrolling');
    setSubjectDetails(item);
    setLoading(false); // Once the execution is complete, set loading to false
  }, [navigation, setSubjectDetails]);

  const scrollToTop = useCallback(() => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.renderItemContainer}>
      <SubjectCard
        subjectImage={levelState === 'Tertiary' ? item.courseImage : item.subjectImage}
        subjectName={item.name}
        syllabus={levelState === 'Tertiary' ? item.semester : item.syllabus.name}
        handleOnPress={() => handleOnPress(item)}
      />
      {loading && (
        <View style={styles.indicatorContainer}>
          <BallIndicator color={Colors.primary} />
        </View>
      )}
    </View>
  );

  const renderSkeleton = () => (
    <SkeletonPlaceholder backgroundColor={theme.colors.tetiaryBackground} highlightColor={theme.colors.primaryBackground}>
      <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
        <SkeletonPlaceholder.Item width={width * 0.70} height={height * 0.3} borderRadius={20} marginLeft={15} marginRight={15} marginBottom={20}/>
        <SkeletonPlaceholder.Item width={width * 0.70} height={height * 0.3} borderRadius={20}  marginBottom={20}/>
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  const renderHeaderSkeleton = () => (
    <View style={styles.header}>
      <SkeletonPlaceholder backgroundColor={theme.colors.tetiaryBackground} highlightColor={theme.colors.primaryBackground}>
        <SkeletonPlaceholder.Item width={150} height={30} borderRadius={5} marginLeft={5} marginBottom={10} />
      </SkeletonPlaceholder>
      <SkeletonPlaceholder backgroundColor={theme.colors.tetiaryBackground} highlightColor={theme.colors.primaryBackground}>
        <SkeletonPlaceholder.Item width={80} height={20} borderRadius={5} marginBottom={10} marginRight={10} />
      </SkeletonPlaceholder>
    </View>
  );

  useEffect(() => {
    scrollToTop();
  }, [filteredSubjects, scrollToTop]);

  return (
    <View style={{ paddingBottom: 15, marginTop: 16 }}>
      {loadingSubjects ? (
        renderHeaderSkeleton()
      ) : (
        <View style={styles.header}>
          <Text style={[styles.headerText, { color: theme.colors.text }]}>{levelState === 'Tertiary' ? 'Courses' : 'Subjects'}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('PopularClasses')}>
            <Text style={[styles.seeAll, { color: theme.colors.text }]}>See All</Text>
          </TouchableOpacity>
        </View>
      )}

      <FlatList
        ref={flatListRef}
        horizontal
        data={loadingSubjects ? Array.from({ length: 2 }) : filteredSubjects}
        keyExtractor={(item, index) => (loadingSubjects ? `skeleton_${index}` : item.id)}
        renderItem={loadingSubjects ? renderSkeleton : renderItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  renderItemContainer: {
    marginLeft: 10,
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: '15%',
    paddingHorizontal: 10,
  },
  seeAll: {
    fontSize: FontSizes.body2,
    fontFamily: 'ComicNeue-Bold',
    marginRight: 10,
  },
  headerText: {
    paddingLeft: 10,
    fontSize: FontSizes.heading3,
    fontFamily: 'ComicNeue-Bold',
  },
});

export default memo(SubjectCardList);

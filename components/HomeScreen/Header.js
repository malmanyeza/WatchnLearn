import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import FontAwesome from 'react-native-vector-icons/Ionicons';
import { useThemeContext } from '../../hooks/themeContext';
import { useAllSubjectsContext } from '../../hooks/allSubjectsContext';
import { useUserDataContext } from '../../hooks/userDataContext';

const Header = ({ loading }) => {
  const { theme } = useThemeContext();
  const { userDetails } = useUserDataContext();
  const {loadingSubjects} = useAllSubjectsContext()


  const renderSkeleton = () => (
    <SkeletonPlaceholder backgroundColor={theme.colors.tetiaryBackground} highlightColor={theme.colors.primaryBackground}>
      <SkeletonPlaceholder.Item flexDirection="row" justifyContent='space-between'>
      <SkeletonPlaceholder.Item>
        <SkeletonPlaceholder.Item width={60} height={20} borderRadius={10} marginLeft={20} marginBottom={10} />
        <SkeletonPlaceholder.Item width={120} height={30} borderRadius={15} marginLeft={20}/>
      </SkeletonPlaceholder.Item>
      <SkeletonPlaceholder.Item width={40} height={40} borderRadius={20} marginRight={20} />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );

  const renderContent = () => (
    <View style={styles.container}>
      <View style={styles.userInfo}>
        <Text style={[styles.welcomeText, { color: theme.colors.text }]}>Welcome</Text>
        <Text style={[styles.userName, { color: theme.colors.text }]}>{userDetails.firstName}</Text>
      </View>
      <View style={[styles.avatar, { backgroundColor: theme.colors.tetiaryBackground }]}>
        <FontAwesome name="person" size={25} color={theme.colors.secondaryText} />
      </View>
    </View>
  );

  return loadingSubjects ? renderSkeleton() : renderContent();
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingLeft: 20,
  },
  welcomeText: {
    fontSize: 14,
    fontFamily: 'ComicNeue-Bold',
  },
  userName: {
    fontSize: 20,
    fontFamily: 'ComicNeue-Bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(Header);

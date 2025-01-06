import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {BlurView} from '@react-native-community/blur';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth'; // Add this import
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LESSONS} from '../../src/constants/LessonData';
import {getLessonProgress, saveLessonProgress} from '../util/storage';

const LessonListScreen = () => {
  const navigation = useNavigation();
  const [lessons, setLessons] = useState(LESSONS);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({});

  // const [userProgress, setUserProgress] = useState({});

  const loadUserProgress = async () => {
    try {
      // First try to load from AsyncStorage for immediate display
      const cachedProgress = await getLessonProgress();
      setUserProgress(cachedProgress);

      // Then load from Firestore for up-to-date data
      const userId = auth().currentUser?.uid;
      if (userId) {
        const progressSnapshot = await firestore()
          .collection('users')
          .doc(userId)
          .collection('languageProgress')
          .get();

        const progressData = {};
        progressSnapshot.forEach(doc => {
          const data = doc.data();
          progressData[doc.id] = data.score || 0;
        });

        // Update state and cache if we got new data
        if (Object.keys(progressData).length > 0) {
          setUserProgress(progressData);
          await saveLessonProgress(progressData);
        }
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  useEffect(() => {
    loadUserProgress();

    // Set up real-time listener for progress updates
    const userId = auth().currentUser?.uid;
    if (userId) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(userId)
        .collection('languageProgress')
        .onSnapshot(snapshot => {
          const progressData = {};
          snapshot.forEach(doc => {
            const data = doc.data();
            progressData[doc.id] = data.score || 0;
          });
          setUserProgress(progressData);
          saveLessonProgress(progressData);
        });

      return () => unsubscribe();
    }
  }, []);

  // useEffect(() => {
  //   loadUserProgress();
  //   // Simulate loading time
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  useEffect(() => {
    loadUserProgress();
    // Set up real-time progress updates
    setTimeout(() => setLoading(false), 1000);
    const userId = auth().currentUser?.uid;
    if (userId) {
      const unsubscribe = firestore()
        .collection('users')
        .doc(userId)
        .collection('languageProgress')
        .onSnapshot(
          snapshot => {
            const progressData = {};
            snapshot.forEach(doc => {
              const data = doc.data();
              progressData[doc.id] = data.score || 0;
            });
            setUserProgress(progressData);
          },
          error => {
            console.error('Progress listener error:', error);
          },
        );

      return () => unsubscribe();
    }
  }, []);

  // const loadUserProgress = async () => {
  //   try {
  //     const progress = await AsyncStorage.getItem('userProgress');
  //     if (progress) {
  //       setUserProgress(JSON.parse(progress));
  //     }
  //   } catch (error) {
  //     console.error('Error loading progress:', error);
  //   }
  // };

  // const loadUserProgress = async () => {
  //   try {
  //     const userId = auth().currentUser?.uid;
  //     if (!userId) {
  //       console.log('No authenticated user found');
  //       return;
  //     }

  //     console.log('User ID:', auth().currentUser?.uid);

  //     // Get progress from Firestore
  //     const progressSnapshot = await firestore()
  //       .collection('users')
  //       .doc(userId)
  //       .collection('languageProgress')
  //       .get();

  //     const progressData = {};
  //     progressSnapshot.forEach(doc => {
  //       const data = doc.data();
  //       // Calculate percentage from the score field
  //       progressData[doc.id] = data.score || 0;
  //     });

  //     setUserProgress(progressData);

  //     // Also save to AsyncStorage for offline access
  //     await AsyncStorage.setItem('userProgress', JSON.stringify(progressData));
  //   } catch (error) {
  //     console.error('Error loading progress:', error);
  //     // Try to load from AsyncStorage as fallback
  //     try {
  //       const cachedProgress = await AsyncStorage.getItem('userProgress');
  //       if (cachedProgress) {
  //         setUserProgress(JSON.parse(cachedProgress));
  //       }
  //     } catch (fallbackError) {
  //       console.error('Error loading cached progress:', fallbackError);
  //     }
  //   }
  // };

  // const loadUserProgress = async () => {
  //   try {
  //     const userId = auth().currentUser?.uid;
  //     console.log('Current User ID:', userId); // Debug log 1

  //     const progressSnapshot = await firestore()
  //       .collection('users')
  //       .doc(userId)
  //       .collection('languageProgress')
  //       .get();

  //     console.log('Progress Snapshot exists:', progressSnapshot.size > 0); // Debug log 2
  //     console.log('Raw Progress Data:', progressSnapshot.docs.map(doc => ({
  //       id: doc.id,
  //       data: doc.data()
  //     }))); // Debug log 3

  //     const progressData = {};
  //     progressSnapshot.forEach(doc => {
  //       const data = doc.data();
  //       progressData[doc.id] = data.score || 0;
  //     });

  //     console.log('Processed Progress Data:', progressData); // Debug log 4
  //     setUserProgress(progressData);
  //   } catch (error) {
  //     console.error('Error loading progress:', error);
  //   }
  // };

  // const loadUserProgress = async () => {
  //   try {
  //     const userId = auth().currentUser?.uid;
  //     console.log('Loading progress for user:', userId); // Debug log

  //     if (!userId) {
  //       console.error('No authenticated user found');
  //       return;
  //     }

  //     const progressSnapshot = await firestore()
  //       .collection('users')
  //       .doc(userId)
  //       .collection('languageProgress')
  //       .get();

  //     console.log('Found progress documents:', progressSnapshot.size); // Debug log

  //     const progressData = {};
  //     progressSnapshot.forEach(doc => {
  //       const data = doc.data();
  //       console.log('Progress doc:', doc.id, data); // Debug log
  //       // Make sure to use the score field
  //       progressData[doc.id] = data.score || 0;
  //     });

  //     console.log('Final progress data:', progressData); // Debug log
  //     setUserProgress(progressData);
  //   } catch (error) {
  //     console.error('Error loading progress:', error);
  //   }
  // };

  const getLevelColor = level => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return ['#4CAF50', '#2E7D32'];
      case 'intermediate':
        return ['#FF9800', '#F57C00'];
      case 'advanced':
        return ['#F44336', '#C62828'];
      default:
        return ['#9E9E9E', '#616161'];
    }
  };

  const renderLessonCard = ({item, index}) => {
    const progress = userProgress[item.id] || 0;
    const isCompleted = progress === 80;

    return (
      <Animatable.View animation="fadeInUp" delay={index * 100} useNativeDriver>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LessonDetail', {
              lessonId: item.id,
              currentProgress: progress,
            })
          }
          activeOpacity={0.7}>
          <LinearGradient
            colors={['#ffffff', '#f8f9fa']}
            style={styles.lessonCard}>
            <LinearGradient
              colors={getLevelColor(item.level)}
              style={styles.levelTag}>
              <Text style={styles.levelText}>{item.level}</Text>
            </LinearGradient>

            <View style={styles.cardHeader}>
              <Text style={styles.lessonTitle}>{item.title}</Text>
              {isCompleted && (
                <Icon name="check-circle" size={24} color="#4CAF50" />
              )}
            </View>

            <View style={styles.durationContainer}>
              <Icon name="clock-outline" size={16} color="#666" />
              <Text style={styles.duration}>{item.duration}</Text>
            </View>

            <Text style={styles.description}>{item.description}</Text>

            {/* <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, {width: `${progress}%`,backgroundColor: isCompleted ? '#4CAF50' : '#6200ee'}]} />
              </View>
              <Text style={styles.progressText}>{`${progress}%`}</Text>
            </View> */}

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${progress}%`,
                      backgroundColor: isCompleted ? '#4CAF50' : '#6200ee',
                    },
                  ]}
                />
              </View>
              <Text
                style={[
                  styles.progressText,
                  {color: isCompleted ? '#4CAF50' : '#666'},
                ]}>
                {`${Math.round(progress)}%`}
              </Text>
            </View>

            <View style={styles.topicsContainer}>
              {item.topics.map((topic, index) => (
                <View key={index} style={styles.topicTag}>
                  <Text style={styles.topicText}>{topic}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading lessons...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={lessons}
        renderItem={renderLessonCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: wp(4),
    color: '#666',
  },
  listContainer: {
    padding: wp(4),
  },
  lessonCard: {
    borderRadius: wp(3),
    padding: wp(4),
    marginBottom: hp(2),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  levelTag: {
    paddingHorizontal: wp(3),
    paddingVertical: hp(0.5),
    borderRadius: wp(1),
    alignSelf: 'flex-start',
    marginBottom: hp(1),
  },
  levelText: {
    color: 'white',
    fontSize: wp(3.5),
    fontWeight: '600',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  lessonTitle: {
    fontSize: wp(5),
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  durationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  duration: {
    fontSize: wp(3.5),
    color: '#666',
    marginLeft: wp(1),
  },
  description: {
    fontSize: wp(3.8),
    color: '#666',
    marginBottom: hp(1.5),
  },
  // progressContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: hp(1.5),
  // },
  // progressBar: {
  //   flex: 1,
  //   height: hp(1),
  //   backgroundColor: '#e0e0e0',
  //   borderRadius: wp(1),
  //   marginRight: wp(2),
  //   overflow: 'hidden',
  // },
  // progressFill: {
  //   height: '100%',
  //   backgroundColor: '#6200ee',
  //   borderRadius: wp(1),
  // },
  // progressText: {
  //   fontSize: wp(3.5),
  //   color: '#666',
  //   width: wp(10),
  // },
  progressContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    minWidth: 45,
    textAlign: 'right',
  },
  topicsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: hp(1),
  },
  topicTag: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.5),
    borderRadius: wp(1),
    marginRight: wp(2),
    marginBottom: hp(0.5),
  },
  topicText: {
    fontSize: wp(3.5),
    color: '#1976D2',
  },
});

export default LessonListScreen;

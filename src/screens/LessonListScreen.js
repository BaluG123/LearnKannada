// import React from 'react';
// import {View, FlatList, Text, TouchableOpacity, StyleSheet} from 'react-native';
// import {LESSONS} from '../../src/constants/LessonData';

// const LessonListScreen = ({navigation}) => {
//   const renderLessonCard = ({item}) => (
//     <TouchableOpacity
//       style={styles.lessonCard}
//       onPress={() => navigation.navigate('LessonDetail', {lessonId: item.id})}>
//       <View style={styles.levelTag}>
//         <Text style={styles.levelText}>{item.level}</Text>
//       </View>
//       <Text style={styles.lessonTitle}>{item.title}</Text>
//       <Text style={styles.duration}>{item.duration}</Text>
//       <Text style={styles.description}>{item.description}</Text>
//       <View style={styles.topicsContainer}>
//         {item.topics.map((topic, index) => (
//           <Text key={index} style={styles.topic}>
//             • {topic}
//           </Text>
//         ))}
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={LESSONS}
//         renderItem={renderLessonCard}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// };

// export default LessonListScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   lessonCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   levelTag: {
//     backgroundColor: '#e0e0e0',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     alignSelf: 'flex-start',
//     marginBottom: 8,
//   },
//   lessonTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   contentCard: {
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   kannadaText: {
//     fontSize: 32,
//     marginBottom: 12,
//   },
//   pronunciationText: {
//     fontSize: 18,
//     color: '#666',
//     marginBottom: 8,
//   },
//   questionCount: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 16,
//   },
//   optionsContainer: {
//     marginTop: 20,
//   },
//   optionButton: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 8,
//     marginBottom: 12,
//   },
//   selectedOption: {
//     backgroundColor: '#e3f2fd',
//   },
//   explanationContainer: {
//     marginTop: 20,
//     padding: 16,
//     backgroundColor: '#f8f8f8',
//     borderRadius: 8,
//   },
// });

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
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LESSONS} from '../../src/constants/LessonData';

const LessonListScreen = () => {
  const navigation = useNavigation();
  const [lessons, setLessons] = useState(LESSONS);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    loadUserProgress();
    // Simulate loading time
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const loadUserProgress = async () => {
    try {
      const progress = await AsyncStorage.getItem('userProgress');
      if (progress) {
        setUserProgress(JSON.parse(progress));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

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
    const isCompleted = progress === 100;

    return (
      <Animatable.View animation="fadeInUp" delay={index * 100} useNativeDriver>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('LessonDetail', {lessonId: item.id})
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

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, {width: `${progress}%`}]} />
              </View>
              <Text style={styles.progressText}>{`${progress}%`}</Text>
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.5),
  },
  progressBar: {
    flex: 1,
    height: hp(1),
    backgroundColor: '#e0e0e0',
    borderRadius: wp(1),
    marginRight: wp(2),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6200ee',
    borderRadius: wp(1),
  },
  progressText: {
    fontSize: wp(3.5),
    color: '#666',
    width: wp(10),
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

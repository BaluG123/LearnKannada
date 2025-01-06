// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   ScrollView,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from 'react-native';
// import {
//   fetchUserProfile,
//   updateLanguageProgress,
// } from '../util/firestoreService';

// const HomeScreen = ({navigation, route}) => {
//   const {username} = route.params;
//   const [userData, setUserData] = useState(null);
//   const [dailyStreak, setDailyStreak] = useState(0);

//   useEffect(() => {
//     loadUserData();
//   }, []);

//   const loadUserData = async () => {
//     try {
//       const profile = await fetchUserProfile();
//       setUserData(profile);
//     } catch (error) {
//       console.error('Error loading profile:', error);
//     }
//   };

//   const DailyProgress = () => (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>Daily Progress</Text>
//       <View style={styles.progressInfo}>
//         <Text>Streak: {dailyStreak} days</Text>
//         <Text>Today's XP: {userData?.dailyXP || 0}</Text>
//       </View>
//     </View>
//   );

//   const QuickActions = () => (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>Quick Actions</Text>
//       <View style={styles.actionButtons}>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('LessonList')}>
//           <Text>Continue Learning</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('Practice')}>
//           <Text>Daily Practice</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.actionButton}
//           onPress={() => navigation.navigate('Flashcards')}>
//           <Text>Flashcards</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   const RecommendedLessons = () => (
//     <View style={styles.card}>
//       <Text style={styles.cardTitle}>Recommended For You</Text>
//       <ScrollView horizontal>
//         {/* Add recommended lesson cards here */}
//       </ScrollView>
//     </View>
//   );

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.greeting}>ನಮಸ್ಕಾರ, {username}!</Text>
//       <DailyProgress />
//       <QuickActions />
//       <RecommendedLessons />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   greeting: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   card: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginBottom: 12,
//   },
//   progressInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'space-between',
//   },
//   actionButton: {
//     backgroundColor: '#f0f0f0',
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 8,
//     width: '48%',
//     alignItems: 'center',
//   },
// });

// export default HomeScreen;

import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  fetchUserProfile,
  updateLanguageProgress,
} from '../util/firestoreService';
import {LESSONS} from '../constants/LessonData';
import LottieView from 'lottie-react-native';

const HomeScreen = ({navigation, route}) => {
  const {username} = route.params;
  const [userData, setUserData] = useState(null);
  const [dailyStreak, setDailyStreak] = useState(0);
  const [loading, setLoading] = useState(true);
  const [recommendedLessons, setRecommendedLessons] = useState([]);

  useEffect(() => {
    loadUserData();
    getRecommendedLessons();
  }, []);

  const loadUserData = async () => {
    try {
      const profile = await fetchUserProfile();
      setUserData(profile);
      setDailyStreak(profile?.streak || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error loading profile:', error);
      setLoading(false);
    }
  };

  const getRecommendedLessons = () => {
    // Mock recommendation logic - replace with actual recommendation algorithm
    const recommended = LESSONS.slice(0, 3);
    setRecommendedLessons(recommended);
  };

  const DailyProgress = () => (
    <Animatable.View animation="fadeInUp" delay={100} useNativeDriver>
      <LinearGradient colors={['#ffffff', '#f8f9fa']} style={styles.card}>
        <Text style={styles.cardTitle}>Daily Progress</Text>
        <View style={styles.progressInfo}>
          <View style={styles.progressItem}>
            <Icon name="fire" size={24} color="#FF9800" />
            <Text style={styles.progressLabel}>Streak</Text>
            <Text style={styles.progressValue}>{dailyStreak} days</Text>
            {/* <LottieView
              source={require('../lottie/Rice.json')}
              autoPlay
              loop
              style={{width: wp(100), height: wp(100)}}
            /> */}
          </View>
          <View style={styles.progressItem}>
            <Icon name="star" size={24} color="#FFC107" />
            <Text style={styles.progressLabel}>Today's XP</Text>
            <Text style={styles.progressValue}>{userData?.dailyXP || 0}</Text>
          </View>
        </View>
      </LinearGradient>
    </Animatable.View>
  );

  const QuickActions = () => (
    <Animatable.View animation="fadeInUp" delay={200} useNativeDriver>
      <LinearGradient colors={['#ffffff', '#f8f9fa']} style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('LessonList')}>
            <LinearGradient
              colors={['#6200ee', '#3700b3']}
              style={styles.actionButtonGradient}>
              <Icon name="book-open-variant" size={24} color="white" />
              <Text style={styles.actionButtonText}>Continue Learning</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Practice')}>
            <LinearGradient
              colors={['#00C853', '#009624']}
              style={styles.actionButtonGradient}>
              <Icon name="pencil" size={24} color="white" />
              <Text style={styles.actionButtonText}>Daily Practice</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Flashcards')}>
            <LinearGradient
              colors={['#FF6D00', '#F57C00']}
              style={styles.actionButtonGradient}>
              <Icon name="cards" size={24} color="white" />
              <Text style={styles.actionButtonText}>Flashcards</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </Animatable.View>
  );

  const RecommendedLessons = () => (
    <Animatable.View animation="fadeInUp" delay={300} useNativeDriver>
      <LinearGradient colors={['#ffffff', '#f8f9fa']} style={styles.card}>
        <Text style={styles.cardTitle}>Recommended For You</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.recommendedContainer}>
          {recommendedLessons.map((lesson, index) => (
            <TouchableOpacity
              key={lesson.id}
              onPress={() =>
                navigation.navigate('LessonDetail', {lessonId: lesson.id})
              }
              style={styles.recommendedCard}>
              <LinearGradient
                colors={['#E8EAF6', '#C5CAE9']}
                style={styles.recommendedGradient}>
                <Text style={styles.recommendedTitle}>{lesson.title}</Text>
                <Text style={styles.recommendedDuration}>
                  <Icon name="clock-outline" size={14} color="#666" />{' '}
                  {lesson.duration}
                </Text>
                <View style={styles.recommendedLevel}>
                  <Text style={styles.recommendedLevelText}>
                    {lesson.level}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </LinearGradient>
    </Animatable.View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading your profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animatable.Text
        animation="fadeInDown"
        style={styles.greeting}
        useNativeDriver>
        ನಮಸ್ಕಾರ, {username}!
      </Animatable.Text>
      <DailyProgress />
      <QuickActions />
      <RecommendedLessons />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: wp(4),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: hp(2),
    fontSize: wp(4),
    color: '#666',
  },
  greeting: {
    fontSize: wp(6),
    fontWeight: 'bold',
    marginBottom: hp(2),
    color: '#333',
  },
  card: {
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
  cardTitle: {
    fontSize: wp(4.5),
    fontWeight: '600',
    marginBottom: hp(1.5),
    color: '#333',
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: wp(3.5),
    color: '#666',
    marginTop: hp(0.5),
  },
  progressValue: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#333',
    marginTop: hp(0.5),
  },
  actionButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '31%',
    marginBottom: hp(1),
  },
  actionButtonGradient: {
    padding: wp(3),
    borderRadius: wp(2),
    alignItems: 'center',
  },
  actionButtonText: {
    color: 'white',
    fontSize: wp(3.2),
    fontWeight: '500',
    marginTop: hp(0.5),
    textAlign: 'center',
  },
  recommendedContainer: {
    paddingRight: wp(4),
  },
  recommendedCard: {
    width: wp(60),
    marginRight: wp(3),
  },
  recommendedGradient: {
    padding: wp(3),
    borderRadius: wp(2),
    height: hp(15),
    justifyContent: 'space-between',
  },
  recommendedTitle: {
    fontSize: wp(4),
    fontWeight: '600',
    color: '#333',
  },
  recommendedDuration: {
    fontSize: wp(3.5),
    color: '#666',
  },
  recommendedLevel: {
    backgroundColor: 'rgba(98, 0, 238, 0.1)',
    paddingHorizontal: wp(2),
    paddingVertical: hp(0.3),
    borderRadius: wp(1),
    alignSelf: 'flex-start',
  },
  recommendedLevelText: {
    fontSize: wp(3),
    color: '#6200ee',
  },
});

export default HomeScreen;

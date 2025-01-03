// import React, {useState, useEffect, useRef} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   Animated,
// } from 'react-native';
// import * as Animatable from 'react-native-animatable';
// import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import Sound from 'react-native-sound';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {LESSONS} from '../constants/LessonData';

// const LessonDetailScreen = ({route, navigation}) => {
//   const {lessonId} = route.params;
//   const lesson = LESSONS.find(l => l.id === lessonId);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [loading, setLoading] = useState(true);
//   const [sound, setSound] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);

//   // Create refs for animation values
//   const slideAnim = useRef(new Animated.Value(0)).current;
//   const fadeAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//     return () => {
//       if (sound) {
//         sound.release();
//       }
//     };
//   }, []);

//   const animateContent = direction => {
//     // Reset animations
//     slideAnim.setValue(direction === 'next' ? 300 : -300);
//     fadeAnim.setValue(0);

//     // Run parallel animations
//     Animated.parallel([
//       Animated.spring(slideAnim, {
//         toValue: 0,
//         useNativeDriver: true,
//         friction: 8,
//         tension: 40,
//       }),
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   const handleNavigation = direction => {
//     if (direction === 'next' && currentIndex < lesson.content.length - 1) {
//       animateContent('next');
//       setCurrentIndex(prev => prev + 1);
//     } else if (direction === 'prev' && currentIndex > 0) {
//       animateContent('prev');
//       setCurrentIndex(prev => prev - 1);
//     } else if (
//       direction === 'next' &&
//       currentIndex === lesson.content.length - 1
//     ) {
//       navigation.navigate('Quiz', {lessonId});
//     }
//   };

//   const playAudio = async audioUrl => {
//     if (sound) {
//       sound.release();
//     }

//     const newSound = new Sound(audioUrl, Sound.MAIN_BUNDLE, error => {
//       if (error) {
//         console.error('Failed to load sound', error);
//         return;
//       }
//       setIsPlaying(true);
//       newSound.play(success => {
//         setIsPlaying(false);
//         if (!success) {
//           console.error('Playback failed');
//         }
//       });
//     });
//     setSound(newSound);
//   };

//   const renderProgressBar = () => (
//     <View style={styles.progressContainer}>
//       {lesson.content.map((_, index) => (
//         <View
//           key={index}
//           style={[
//             styles.progressDot,
//             index === currentIndex && styles.progressDotActive,
//           ]}
//         />
//       ))}
//     </View>
//   );

//   const renderContent = content => {
//     return (
//       <Animated.View
//         style={[
//           styles.contentContainer,
//           {
//             transform: [{translateX: slideAnim}],
//             opacity: fadeAnim,
//           },
//         ]}>
//         <LinearGradient
//           colors={['#ffffff', '#f8f9fa']}
//           style={styles.contentCard}>
//           <Text style={styles.kannadaText}>{content.kannada}</Text>
//           <Text style={styles.pronunciationText}>{content.pronunciation}</Text>
//           <Text style={styles.englishText}>{content.english}</Text>

//           <TouchableOpacity
//             style={styles.audioButton}
//             onPress={() => playAudio(content.audioUrl)}>
//             <LinearGradient
//               colors={['#6200ee', '#3700b3']}
//               style={styles.audioButtonGradient}>
//               <Icon
//                 name={isPlaying ? 'pause-circle' : 'play-circle'}
//                 size={24}
//                 color="white"
//               />
//               <Text style={styles.audioButtonText}>
//                 {isPlaying ? 'Playing...' : 'Play Audio'}
//               </Text>
//             </LinearGradient>
//           </TouchableOpacity>
//         </LinearGradient>
//       </Animated.View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#6200ee" />
//         <Text style={styles.loadingText}>Loading lesson...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Animatable.View
//         animation="fadeInDown"
//         duration={500}
//         style={styles.header}
//         useNativeDriver>
//         <Text style={styles.lessonTitle}>{lesson.title}</Text>
//         <View style={styles.lessonInfo}>
//           <LinearGradient
//             colors={['#6200ee', '#3700b3']}
//             style={styles.levelTag}>
//             <Text style={styles.levelText}>{lesson.level}</Text>
//           </LinearGradient>
//           <Text style={styles.lessonProgress}>
//             {currentIndex + 1} of {lesson.content.length}
//           </Text>
//         </View>
//       </Animatable.View>

//       {renderProgressBar()}
//       {renderContent(lesson.content[currentIndex])}

//       <Animatable.View
//         animation="fadeInUp"
//         duration={500}
//         style={styles.navigationButtons}
//         useNativeDriver>
//         <TouchableOpacity
//           style={[
//             styles.navButton,
//             currentIndex === 0 && styles.navButtonDisabled,
//           ]}
//           onPress={() => handleNavigation('prev')}
//           disabled={currentIndex === 0}>
//           <LinearGradient
//             colors={
//               currentIndex === 0
//                 ? ['#e0e0e0', '#bdbdbd']
//                 : ['#6200ee', '#3700b3']
//             }
//             style={styles.navButtonGradient}>
//             <Icon name="chevron-left" size={24} color="white" />
//             <Text style={styles.navButtonText}>Previous</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={styles.navButton}
//           onPress={() => handleNavigation('next')}>
//           <LinearGradient
//             colors={['#6200ee', '#3700b3']}
//             style={styles.navButtonGradient}>
//             <Text style={styles.navButtonText}>
//               {currentIndex === lesson.content.length - 1
//                 ? 'Take Quiz'
//                 : 'Next'}
//             </Text>
//             <Icon
//               name={
//                 currentIndex === lesson.content.length - 1
//                   ? 'pencil'
//                   : 'chevron-right'
//               }
//               size={24}
//               color="white"
//             />
//           </LinearGradient>
//         </TouchableOpacity>
//       </Animatable.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     padding: wp(4),
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: hp(2),
//     fontSize: wp(4),
//     color: '#666',
//   },
//   header: {
//     marginBottom: hp(2),
//   },
//   lessonTitle: {
//     fontSize: wp(6),
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: hp(1),
//   },
//   lessonInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   levelTag: {
//     paddingHorizontal: wp(3),
//     paddingVertical: hp(0.5),
//     borderRadius: wp(1),
//   },
//   levelText: {
//     color: 'white',
//     fontSize: wp(3.5),
//     fontWeight: '600',
//   },
//   lessonProgress: {
//     fontSize: wp(3.5),
//     color: '#666',
//   },
//   progressContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: hp(2),
//   },
//   progressDot: {
//     width: wp(2),
//     height: wp(2),
//     borderRadius: wp(1),
//     backgroundColor: '#e0e0e0',
//     marginHorizontal: wp(1),
//   },
//   progressDotActive: {
//     backgroundColor: '#6200ee',
//     width: wp(2.5),
//     height: wp(2.5),
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   contentCard: {
//     padding: wp(6),
//     borderRadius: wp(3),
//     alignItems: 'center',
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   kannadaText: {
//     fontSize: wp(10),
//     marginBottom: hp(2),
//     color: '#333',
//   },
//   pronunciationText: {
//     fontSize: wp(4.5),
//     color: '#666',
//     marginBottom: hp(1),
//   },
//   englishText: {
//     fontSize: wp(5),
//     color: '#333',
//     marginBottom: hp(2),
//   },
//   audioButton: {
//     width: '100%',
//     marginTop: hp(2),
//   },
//   audioButtonGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: wp(3),
//     borderRadius: wp(2),
//   },
//   audioButtonText: {
//     color: 'white',
//     fontSize: wp(4),
//     marginLeft: wp(2),
//     fontWeight: '500',
//   },
//   navigationButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: hp(4),
//   },
//   navButton: {
//     width: '48%',
//   },
//   navButtonDisabled: {
//     opacity: 0.5,
//   },
//   navButtonGradient: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: wp(3),
//     borderRadius: wp(2),
//   },
//   navButtonText: {
//     color: 'white',
//     fontSize: wp(4),
//     marginHorizontal: wp(2),
//     fontWeight: '500',
//   },
// });

// export default LessonDetailScreen;

import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Animated,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Sound from 'react-native-sound';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {LESSONS} from '../constants/LessonData';

const LessonDetailScreen = ({route, navigation}) => {
  const {lessonId} = route.params;
  const lesson = LESSONS.find(l => l.id === lessonId);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Create refs for animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    return () => {
      if (sound) {
        sound.release();
      }
    };
  }, []);

  const animateContent = direction => {
    // Reset animations
    slideAnim.setValue(direction === 'next' ? 300 : -300);
    fadeAnim.setValue(0);

    // Run parallel animations
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        friction: 8,
        tension: 40,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleNavigation = direction => {
    if (direction === 'next' && currentIndex < lesson.content.length - 1) {
      animateContent('next');
      setCurrentIndex(prev => prev + 1);
    } else if (direction === 'prev' && currentIndex > 0) {
      animateContent('prev');
      setCurrentIndex(prev => prev - 1);
    } else if (
      direction === 'next' &&
      currentIndex === lesson.content.length - 1
    ) {
      navigation.navigate('Quiz', {lessonId});
    }
  };

  const playAudio = async audioUrl => {
    if (sound) {
      sound.release();
    }

    const newSound = new Sound(audioUrl, error => {
      if (error) {
        console.error('Failed to load sound', error);
        return;
      }
      setIsPlaying(true);
      newSound.play(success => {
        setIsPlaying(false);
        if (!success) {
          console.error('Playback failed');
        }
      });
    });
    setSound(newSound);
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      {lesson.content.map((_, index) => (
        <View
          key={index}
          style={[
            styles.progressDot,
            index === currentIndex && styles.progressDotActive,
          ]}
        />
      ))}
    </View>
  );

  const renderContent = content => {
    return (
      <Animated.View
        style={[
          styles.contentContainer,
          {
            transform: [{translateX: slideAnim}],
            opacity: fadeAnim,
          },
        ]}>
        <LinearGradient
          colors={['#ffffff', '#f8f9fa']}
          style={styles.contentCard}>
          <Text style={styles.kannadaText}>{content.kannada}</Text>
          <Text style={styles.pronunciationText}>{content.pronunciation}</Text>
          <Text style={styles.englishText}>{content.english}</Text>

          <TouchableOpacity
            style={styles.audioButton}
            onPress={() => playAudio(content.audioUrl)}>
            <LinearGradient
              colors={['#6200ee', '#3700b3']}
              style={styles.audioButtonGradient}>
              <Icon
                name={isPlaying ? 'pause-circle' : 'play-circle'}
                size={24}
                color="white"
              />
              <Text style={styles.audioButtonText}>
                {isPlaying ? 'Playing...' : 'Play Audio'}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Loading lesson...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Animatable.View
        animation="fadeInDown"
        duration={500}
        style={styles.header}
        useNativeDriver>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>
        <View style={styles.lessonInfo}>
          <LinearGradient
            colors={['#6200ee', '#3700b3']}
            style={styles.levelTag}>
            <Text style={styles.levelText}>{lesson.level}</Text>
          </LinearGradient>
          <Text style={styles.lessonProgress}>
            {currentIndex + 1} of {lesson.content.length}
          </Text>
        </View>
      </Animatable.View>

      {renderProgressBar()}
      {renderContent(lesson.content[currentIndex])}

      <Animatable.View
        animation="fadeInUp"
        duration={500}
        style={styles.navigationButtons}
        useNativeDriver>
        <TouchableOpacity
          style={[
            styles.navButton,
            currentIndex === 0 && styles.navButtonDisabled,
          ]}
          onPress={() => handleNavigation('prev')}
          disabled={currentIndex === 0}>
          <LinearGradient
            colors={
              currentIndex === 0
                ? ['#e0e0e0', '#bdbdbd']
                : ['#6200ee', '#3700b3']
            }
            style={styles.navButtonGradient}>
            <Icon name="chevron-left" size={24} color="white" />
            <Text style={styles.navButtonText}>Previous</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => handleNavigation('next')}>
          <LinearGradient
            colors={['#6200ee', '#3700b3']}
            style={styles.navButtonGradient}>
            <Text style={styles.navButtonText}>
              {currentIndex === lesson.content.length - 1
                ? 'Take Quiz'
                : 'Next'}
            </Text>
            <Icon
              name={
                currentIndex === lesson.content.length - 1
                  ? 'pencil'
                  : 'chevron-right'
              }
              size={24}
              color="white"
            />
          </LinearGradient>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: wp('5%'),
    backgroundColor: '#6200ee',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  lessonTitle: {
    fontSize: wp('6%'),
    color: '#fff',
    fontWeight: 'bold',
  },
  lessonInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  levelTag: {
    paddingVertical: hp('0.5%'),
    paddingHorizontal: wp('3%'),
    borderRadius: 20,
  },
  levelText: {
    color: '#fff',
    fontSize: wp('4%'),
  },
  lessonProgress: {
    color: '#fff',
    fontSize: wp('4%'),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  progressDot: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    backgroundColor: '#e0e0e0',
    marginHorizontal: wp('1%'),
  },
  progressDotActive: {
    backgroundColor: '#6200ee',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },
  contentCard: {
    width: '100%',
    padding: wp('5%'),
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  kannadaText: {
    fontSize: wp('8%'),
    color: '#6200ee',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: hp('2%'),
  },
  pronunciationText: {
    fontSize: wp('6%'),
    color: '#333',
    textAlign: 'center',
    marginBottom: hp('1%'),
  },
  englishText: {
    fontSize: wp('5%'),
    color: '#666',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  audioButton: {
    marginTop: hp('2%'),
  },
  audioButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1%'),
    borderRadius: 20,
  },
  audioButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('5%'),
    paddingVertical: hp('2%'),
  },
  navButton: {
    flex: 1,
    marginHorizontal: wp('1%'),
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1%'),
    borderRadius: 20,
  },
  navButtonText: {
    color: '#fff',
    fontSize: wp('4%'),
    marginLeft: wp('2%'),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: hp('2%'),
    fontSize: wp('4%'),
    color: '#6200ee',
  },
});

export default LessonDetailScreen;

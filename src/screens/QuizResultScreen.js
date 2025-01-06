// // import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
// // import {updateLanguageProgress} from '../../utils/firestoreService';
// // import {updateUserXP} from '../util/firestoreService';
// // import {useEffect} from 'react';

// // const QuizResultScreen = ({route, navigation}) => {
// //   const {score, total, lessonId} = route.params;
// //   const percentage = (score / total) * 100;

// //   useEffect(() => {
// //     saveProgress();
// //   }, []);

// //   const saveProgress = async () => {
// //     try {
// //       // Update lesson completion status
// //       await updateLanguageProgress(lessonId, {
// //         completed: true,
// //         score: percentage,
// //         completedAt: new Date(),
// //       });

// //       // Update XP points
// //       const xpEarned = Math.floor(percentage);
// //       await updateUserXP(xpEarned);
// //     } catch (error) {
// //       console.error('Error saving progress:', error);
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <View style={styles.resultCard}>
// //         <Text style={styles.resultTitle}>Quiz Complete!</Text>
// //         <View style={styles.scoreCircle}>
// //           <Text style={styles.scoreText}>
// //             {score}/{total}
// //           </Text>
// //           <Text style={styles.percentageText}>{percentage.toFixed(1)}%</Text>
// //         </View>
// //         {percentage >= 80 ? (
// //           <View style={styles.successMessage}>
// //             <Text style={styles.congratsText}>
// //               Congratulations! You've mastered this lesson!
// //             </Text>
// //           </View>
// //         ) : (
// //           <View style={styles.retryMessage}>
// //             <Text style={styles.retryText}>
// //               Keep practicing! Try to achieve at least 80% to master this
// //               lesson.
// //             </Text>
// //           </View>
// //         )}
// //         <View style={styles.buttonContainer}>
// //           <TouchableOpacity
// //             style={styles.button}
// //             onPress={() => navigation.navigate('LessonDetail', {lessonId})}>
// //             <Text style={styles.buttonText}>Review Lesson</Text>
// //           </TouchableOpacity>
// //           <TouchableOpacity
// //             style={[styles.button, styles.primaryButton]}
// //             onPress={() => navigation.navigate('LessonList')}>
// //             <Text style={styles.primaryButtonText}>Next Lesson</Text>
// //           </TouchableOpacity>
// //         </View>
// //       </View>
// //     </View>
// //   );
// // };

// // export default QuizResultScreen;

// // const styles = StyleSheet.create({
// //   audioContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     marginVertical: 10,
// //   },
// //   playButton: {
// //     backgroundColor: '#e3f2fd',
// //     padding: 12,
// //     borderRadius: 25,
// //     marginRight: 10,
// //   },
// //   resetButton: {
// //     backgroundColor: '#f5f5f5',
// //     padding: 12,
// //     borderRadius: 25,
// //   },
// //   container: {
// //     flex: 1,
// //     padding: 16,
// //     backgroundColor: '#f5f5f5',
// //     justifyContent: 'center',
// //   },
// //   resultCard: {
// //     backgroundColor: 'white',
// //     borderRadius: 12,
// //     padding: 24,
// //     alignItems: 'center',
// //     elevation: 4,
// //   },
// //   scoreCircle: {
// //     width: 120,
// //     height: 120,
// //     borderRadius: 60,
// //     backgroundColor: '#e3f2fd',
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     marginVertical: 24,
// //   },
// //   scoreText: {
// //     fontSize: 32,
// //     fontWeight: 'bold',
// //     color: '#1976d2',
// //   },
// //   percentageText: {
// //     fontSize: 18,
// //     color: '#1976d2',
// //   },
// //   buttonContainer: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-around',
// //     width: '100%',
// //     marginTop: 24,
// //   },
// //   button: {
// //     padding: 12,
// //     borderRadius: 8,
// //     width: '45%',
// //     alignItems: 'center',
// //   },
// //   primaryButton: {
// //     backgroundColor: '#1976d2',
// //   },
// //   primaryButtonText: {
// //     color: 'white',
// //     fontWeight: '600',
// //   },
// // });

// import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
// import {
//   updateLanguageProgress,
//   updateUserXP,
// } from '../../utils/firestoreService';
// import {useEffect} from 'react';

// const QuizResultScreen = ({route, navigation}) => {
//   const {score, total, lessonId} = route.params;
//   const percentage = (score / total) * 100;

//   useEffect(() => {
//     saveProgress();
//   }, []);

//   const saveProgress = async () => {
//     try {
//       const progressData = {
//         completed: true,
//         score: percentage,
//         completedAt: new Date(),
//       };

//       // Remove undefined fields
//       Object.keys(progressData).forEach(key => {
//         if (progressData[key] === undefined) {
//           delete progressData[key];
//         }
//       });

//       // Update lesson completion status
//       await updateLanguageProgress(lessonId, progressData);

//       // Update XP points
//       const xpEarned = Math.floor(percentage);
//       await updateUserXP(xpEarned);
//     } catch (error) {
//       console.error('Error saving progress:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.resultCard}>
//         <Text style={styles.resultTitle}>Quiz Complete!</Text>
//         <View style={styles.scoreCircle}>
//           <Text style={styles.scoreText}>
//             {score}/{total}
//           </Text>
//           <Text style={styles.percentageText}>{percentage.toFixed(1)}%</Text>
//         </View>
//         {percentage >= 80 ? (
//           <View style={styles.successMessage}>
//             <Text style={styles.congratsText}>
//               Congratulations! You've mastered this lesson!
//             </Text>
//           </View>
//         ) : (
//           <View style={styles.retryMessage}>
//             <Text style={styles.retryText}>
//               Keep practicing! Try to achieve at least 80% to master this
//               lesson.
//             </Text>
//           </View>
//         )}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('LessonDetail', {lessonId})}>
//             <Text style={styles.buttonText}>Review Lesson</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, styles.primaryButton]}
//             onPress={() => navigation.navigate('LessonList')}>
//             <Text style={styles.primaryButtonText}>Next Lesson</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default QuizResultScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//   },
//   resultCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 24,
//     alignItems: 'center',
//     elevation: 4,
//   },
//   scoreCircle: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#e3f2fd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 24,
//   },
//   scoreText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#1976d2',
//   },
//   percentageText: {
//     fontSize: 18,
//     color: '#1976d2',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginTop: 24,
//   },
//   button: {
//     padding: 12,
//     borderRadius: 8,
//     width: '45%',
//     alignItems: 'center',
//   },
//   primaryButton: {
//     backgroundColor: '#1976d2',
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
// });

// import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
// import {
//   updateLanguageProgress,
//   updateUserXP,
// } from '../../utils/firestoreService';
// import {useEffect} from 'react';

// const QuizResultScreen = ({route, navigation}) => {
//   const {score, total, lessonId} = route.params;
//   const percentage = (score / total) * 100;

//   useEffect(() => {
//     saveProgress();
//   }, []);

//   const saveProgress = async () => {
//     try {
//       const progressData = {
//         completed: true,
//         score: percentage,
//         completedAt: new Date(),
//       };

//       // Remove undefined fields
//       Object.keys(progressData).forEach(key => {
//         if (progressData[key] === undefined) {
//           delete progressData[key];
//         }
//       });

//       // Update lesson completion status
//       await updateLanguageProgress(lessonId, progressData);

//       // Update XP points
//       const xpEarned = Math.floor(percentage);
//       await updateUserXP(xpEarned);
//     } catch (error) {
//       console.error('Error saving progress:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.resultCard}>
//         <Text style={styles.resultTitle}>Quiz Complete!</Text>
//         <View style={styles.scoreCircle}>
//           <Text style={styles.scoreText}>
//             {score}/{total}
//           </Text>
//           <Text style={styles.percentageText}>{percentage.toFixed(1)}%</Text>
//         </View>
//         {percentage >= 80 ? (
//           <View style={styles.successMessage}>
//             <Text style={styles.congratsText}>
//               Congratulations! You've mastered this lesson!
//             </Text>
//           </View>
//         ) : (
//           <View style={styles.retryMessage}>
//             <Text style={styles.retryText}>
//               Keep practicing! Try to achieve at least 80% to master this
//               lesson.
//             </Text>
//           </View>
//         )}
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => navigation.navigate('LessonDetail', {lessonId})}>
//             <Text style={styles.buttonText}>Review Lesson</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[styles.button, styles.primaryButton]}
//             onPress={() => navigation.navigate('LessonList')}>
//             <Text style={styles.primaryButtonText}>Next Lesson</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default QuizResultScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//     justifyContent: 'center',
//   },
//   resultCard: {
//     backgroundColor: 'white',
//     borderRadius: 12,
//     padding: 24,
//     alignItems: 'center',
//     elevation: 4,
//   },
//   scoreCircle: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     backgroundColor: '#e3f2fd',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 24,
//   },
//   scoreText: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     color: '#1976d2',
//   },
//   percentageText: {
//     fontSize: 18,
//     color: '#1976d2',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginTop: 24,
//   },
//   button: {
//     padding: 12,
//     borderRadius: 8,
//     width: '45%',
//     alignItems: 'center',
//   },
//   primaryButton: {
//     backgroundColor: '#1976d2',
//   },
//   primaryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
// });

import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {updateLanguageProgress, updateUserXP} from '../util/firestoreService';
import {saveUserData, getUserData} from '../util/storage';
import {useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const QuizResultScreen = ({route, navigation}) => {
  const {score, total, lessonId} = route.params;
  const percentage = (score / total) * 100;

  useEffect(() => {
    saveProgress();
  }, []);

  const saveProgress = async () => {
    try {
      const progressData = {
        completed: true,
        score: percentage,
        completedAt: new Date().toISOString(),
      };

      // Save to Firestore and AsyncStorage
      await updateLanguageProgress(lessonId, progressData);
      console.log('Progress saved successfully for lesson:', lessonId);

      // Update XP points
      const xpEarned = Math.floor(percentage);
      await updateUserXP(xpEarned);
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  };

  // const saveProgress = async () => {
  //   try {
  //     const progressData = {
  //       completed: true,
  //       score: percentage,
  //       completedAt: new Date(),
  //     };

  //     // Remove undefined fields
  //     Object.keys(progressData).forEach(key => {
  //       if (progressData[key] === undefined) {
  //         delete progressData[key];
  //       }
  //     });

  //     // Update lesson completion status
  //     await updateLanguageProgress(lessonId, progressData);

  //     // Update XP points
  //     const xpEarned = Math.floor(percentage);
  //     await updateUserXP(xpEarned);

  //     // Save progress data locally
  //     await saveUserData(progressData);
  //   } catch (error) {
  //     console.error('Error saving progress:', error);
  //   }
  // };

  // const saveProgress = async () => {
  //   try {
  //     if (!lessonId) {
  //       console.error('No lessonId provided');
  //       return;
  //     }

  //     const progressData = {
  //       completed: true,
  //       score: percentage,
  //       completedAt: new Date(),
  //     };

  //     // Remove undefined fields
  //     Object.keys(progressData).forEach(key => {
  //       if (progressData[key] === undefined) {
  //         delete progressData[key];
  //       }
  //     });

  //     console.log('Saving progress for lesson:', lessonId, progressData); // Debug log

  //     // Update lesson completion status
  //     await updateLanguageProgress(lessonId, progressData);
  //     console.log('Language progress updated successfully'); // Debug log

  //     // Update XP points
  //     const xpEarned = Math.floor(percentage);
  //     await updateUserXP(xpEarned);
  //     console.log('XP updated successfully'); // Debug log

  //     // Save progress data locally
  //     await saveUserData(progressData);
  //     console.log('Local progress saved successfully'); // Debug log
  //   } catch (error) {
  //     console.error('Error saving progress:', error);
  //     // You might want to show an error message to the user here
  //   }
  // };

  // const saveProgress = async () => {
  //   try {
  //     console.log('Quiz Result - Lesson ID:', lessonId); // Debug log

  //     if (!lessonId) {
  //       console.error('No lessonId provided');
  //       return;
  //     }

  //     const progressData = {
  //       completed: true,
  //       score: percentage,
  //       completedAt: new Date(),
  //     };

  //     console.log('Saving progress data:', progressData); // Debug log

  //     // Save to Firestore
  //     await updateLanguageProgress(lessonId, progressData);

  //     // Verify the save
  //     const userId = auth().currentUser?.uid;
  //     const savedDoc = await firestore()
  //       .collection('users')
  //       .doc(userId)
  //       .collection('languageProgress')
  //       .doc(lessonId)
  //       .get();

  //     console.log('Verified saved data:', savedDoc.data()); // Debug log

  //     // Update XP points
  //     const xpEarned = Math.floor(percentage);
  //     await updateUserXP(xpEarned);
  //   } catch (error) {
  //     console.error('Error saving progress:', error);
  //   }
  // };

  return (
    <View style={styles.container}>
      <View style={styles.resultCard}>
        <Text style={styles.resultTitle}>Quiz Complete!</Text>
        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>
            {score}/{total}
          </Text>
          <Text style={styles.percentageText}>{percentage.toFixed(1)}%</Text>
        </View>
        {percentage >= 80 ? (
          <View style={styles.successMessage}>
            <Text style={styles.congratsText}>
              Congratulations! You've mastered this lesson!
            </Text>
          </View>
        ) : (
          <View style={styles.retryMessage}>
            <Text style={styles.retryText}>
              Keep practicing! Try to achieve at least 80% to master this
              lesson.
            </Text>
          </View>
        )}
        <View style={styles.buttonContainer}>
          {/* <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LessonDetail', {lessonId})}>
            <Text style={styles.buttonText}>Review Lesson</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('LessonList')}>
            <Text style={styles.primaryButtonText}>Next Lesson</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default QuizResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  resultCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  percentageText: {
    fontSize: 18,
    color: '#1976d2',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 24,
  },
  button: {
    padding: 12,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#1976d2',
  },
  primaryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

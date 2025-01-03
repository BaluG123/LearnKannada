import {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {QUIZ_QUESTIONS} from '../constants/quizData';

const QuizScreen = ({route, navigation}) => {
  const {lessonId} = route.params;
  const questions = QUIZ_QUESTIONS[lessonId];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswer = answer => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    setShowExplanation(false);
    setSelectedAnswer(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Quiz completed
      navigation.navigate('QuizResult', {score, total: questions.length});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionCount}>
        Question {currentQuestion + 1} of {questions.length}
      </Text>
      <Text style={styles.question}>{questions[currentQuestion].question}</Text>
      <View style={styles.optionsContainer}>
        {questions[currentQuestion].options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              selectedAnswer === option && styles.selectedOption,
            ]}
            onPress={() => handleAnswer(option)}
            disabled={showExplanation}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {showExplanation && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationText}>
            {questions[currentQuestion].explanation}
          </Text>
          <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
            <Text>Next</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  lessonCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  levelTag: {
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contentCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  kannadaText: {
    fontSize: 32,
    marginBottom: 12,
  },
  pronunciationText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  questionCount: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 20,
  },
  optionButton: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: '#e3f2fd',
  },
  explanationContainer: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
});

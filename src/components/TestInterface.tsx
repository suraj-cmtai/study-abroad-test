
import { useState, useEffect, useRef } from 'react';
import { TestAnswer } from '../pages/Index';
import { generateRandomQuestions, AIQuestion } from '../services/openai';
import { TestLoader } from './test/TestLoader';
import { TestError } from './test/TestError';
import { TestProgress } from './test/TestProgress';
import { QuestionCard } from './test/QuestionCard';
import { TestTimer } from './test/TestTimer';
import { TestActions } from './test/TestActions';

interface TestInterfaceProps {
  onCompleteTest: (answers: TestAnswer[], questions: AIQuestion[]) => void;
}

export const TestInterface = ({ onCompleteTest }: TestInterfaceProps) => {
  const [questions, setQuestions] = useState<AIQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<TestAnswer[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  
  const timerRef = useRef<NodeJS.Timeout>();

  // Generate questions when component mounts
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const generatedQuestions = await generateRandomQuestions();
        setQuestions(generatedQuestions);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to generate questions:', err);
        setError('Failed to generate questions from AI. Please check your internet connection and try again.');
        setIsLoading(false);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    if (questions.length === 0 || isLoading) return;

    // Start timer for current question
    setTimeRemaining(30);
    setSelectedAnswer('');
    setQuestionStartTime(Date.now());
    
    timerRef.current = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleNextQuestion(''); // Auto-submit with empty answer
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestion, questions, isLoading]);

  const handleNextQuestion = (answer: string) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const timeSpent = (Date.now() - questionStartTime) / 1000;
    const currentQ = questions[currentQuestion];
    
    const newAnswer: TestAnswer = {
      questionId: currentQuestion + 1,
      answer: answer,
      timeSpent: timeSpent,
      category: currentQ.category
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onCompleteTest(updatedAnswers, questions);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer) {
      handleNextQuestion(selectedAnswer);
    }
  };

  if (isLoading) {
    return <TestLoader />;
  }

  if (error) {
    return <TestError error={error} />;
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="py-6 sm:py-8">
      <TestProgress 
        currentQuestion={currentQuestion} 
        totalQuestions={questions.length} 
        timeRemaining={timeRemaining} 
      />

      <QuestionCard 
        question={currentQ}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
      />

      <TestActions 
        selectedAnswer={selectedAnswer}
        isLastQuestion={currentQuestion === questions.length - 1}
        onSubmit={handleSubmitAnswer}
      />

      <TestTimer timeRemaining={timeRemaining} />
    </div>
  );
};

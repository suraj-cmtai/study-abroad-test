
import { useState, useEffect, useCallback } from 'react';
import { TestInterface } from '../components/TestInterface';
import { ResultsPage } from '../components/ResultsPage';
import { WelcomePage } from '../components/WelcomePage';
import { analyzeAnswersWithAI, AIQuestion } from '../services/openai';

export type TestPhase = 'welcome' | 'testing' | 'results';

export interface TestAnswer {
  questionId: number;
  answer: string;
  timeSpent: number;
  category: string;
}

export interface CareerRecommendation {
  title: string;
  description: string;
  matchPercentage: number;
  skills: string[];
  educationPath: string[];
  image?: string;
  link?: string;
}

export interface UserDetails {
  name: string;
  phone: string;
  email: string;
}

const Index = () => {
  const [currentPhase, setCurrentPhase] = useState<TestPhase>('welcome');
  const [testAnswers, setTestAnswers] = useState<TestAnswer[]>([]);
  const [careerRecommendations, setCareerRecommendations] = useState<CareerRecommendation[]>([]);
  const [testQuestions, setTestQuestions] = useState<AIQuestion[]>([]);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startTest = (details: UserDetails) => {
    console.log('🎯 Setting userDetails:', details);
    setUserDetails(details);
    setCurrentPhase('testing');
    setTestAnswers([]);
    setTestQuestions([]);
  };

  const completeTest = useCallback(async (answers: TestAnswer[], questions: AIQuestion[]) => {
    console.log('📝 Completing test with userDetails:', userDetails);
    setTestAnswers(answers);
    setTestQuestions(questions);
    setCurrentPhase('results');
    setIsAnalyzing(true);
    
    try {
      console.log('Analyzing answers with AI:', answers);
      const aiRecommendations = await analyzeAnswersWithAI(answers);
      setCareerRecommendations(aiRecommendations);
    } catch (error) {
      console.error('Error getting AI recommendations:', error);
      // Fallback to mock recommendations if AI analysis fails
      generateFallbackRecommendations(answers);
    }
    
    setIsAnalyzing(false);
  }, [userDetails]);

  const generateFallbackRecommendations = (answers: TestAnswer[]) => {
    // Fallback recommendations if AI analysis fails
    const mockRecommendations: CareerRecommendation[] = [
      {
        title: "Diploma in Business and Retail Management",
        description: "Based on your responses, you show strong leadership and organizational skills that are perfect for business management. This course will equip you with essential skills in modern business management and retail operations.",
        matchPercentage: 95,
        skills: ["Business Management", "Retail Operations", "Customer Relations", "Team Leadership"],
        educationPath: ["6 Months Course", "6 Months Internship", "Industry Certification"],
        image: "https://storage.googleapis.com/study-abroad-fbaab.firebasestorage.app/images/1750836555114_7-Essential-Retail-Leadership-Skills.jpg?GoogleAccessId=firebase-adminsdk-fbsvc%40study-abroad-fbaab.iam.gserviceaccount.com&Expires=16447017600&Signature=UOAhQ3qngT5DBJUskFTMnGCz8Zd9UE6ci7kfZvkS8zHniylR25UZh087YhihveiIy%2Bs%2Bm8fbk%2B3JNu3j4nGK7RSRKOmqbOr%2B%2F7ZRAg4msNyMVPzOvaiN3FBkPwz%2BXx7Q6kxv5OkVW3fCXQk4heDp8UsKGJ%2B7PHRr1LMuERO0Xm80%2Fioc7tbjKYVP4p3PQxMfpBBacr4kMHCtbwwgq5wcXMKjp4FcFfpSeOgmsjsOnDfaD5mSrQW7dWDLsMdp8Ir7qmDss%2BW2Gt522uxIbXSUl4uloHV6G%2FIZCtj7fW9T0OCeSucuJCCj4r2dCy1pzU1Oj665MkrJQfTSGF1n3%2BUxnQ%3D%3D",
        link: "/courses/MVuQX6OKG0hhGLq9VY4R"
      },
      {
        title: "Diploma in Hospitality and Tourism Management",
        description: "Your interpersonal skills and customer service orientation make you an excellent fit for hospitality and tourism. This program provides comprehensive training for dynamic careers in the hospitality sector.",
        matchPercentage: 88,
        skills: ["Customer Service", "Hospitality Operations", "Event Management", "Tourism Planning"],
        educationPath: ["6 Months Course", "6 Months Internship", "Industry Placement"],
        image: "https://storage.googleapis.com/study-abroad-fbaab.firebasestorage.app/images/1750835983473_66855c443be6fda3d50ba933_cte_hero_tourism_hospitality.jpg?GoogleAccessId=firebase-adminsdk-fbsvc%40study-abroad-fbaab.iam.gserviceaccount.com&Expires=16447017600&Signature=kgHV4%2BnVy79OYuNk9LzrJeLWlYmUaLmhZXSA%2FmKLcbKTr68gAjrXwVdeLH3E9zama731HEBXP1nnrq7X2W357XLvjpCUB5pwRVhMjs6MsuGDz0w9mOW6Ym5m6XeBv1AuoL0wteBpMMW1dpl1xtWAkiuy9BmWdaNqp%2BCmw5IaJ3eF%2BK0qSz5tcGmaMQeMzkqGhDnAob6%2F4vGa9IKnTqS0w003FAQ6z4i%2FRXhOiCo77v6icBpBu6gGAUhnW7n6M1LUdpHkzRu2npK5Wff%2BhlaTdj83TvNexTTQZ5UyG5VSksXiMtVENy3AmmAe8v3Li7Rf2bQXNlEwctg7u8n29y50tw%3D%3D",
        link: "/courses/OvC4bJrpmIxetIWtoBO7"
      },
      {
        title: "Full Stack Web Development",
        description: "Your analytical thinking and problem-solving abilities align perfectly with web development. This comprehensive course will teach you both frontend and backend technologies.",
        matchPercentage: 85,
        skills: ["Programming", "Web Technologies", "Problem Solving", "User Experience"],
        educationPath: ["1 Year Course", "Project-Based Learning", "Industry Projects"],
        image: "https://storage.googleapis.com/study-abroad-fbaab.firebasestorage.app/images/1750510776152_full-stack.jpg?GoogleAccessId=firebase-adminsdk-fbsvc%40study-abroad-fbaab.iam.gserviceaccount.com&Expires=16447017600&Signature=jAQvRUjCF6Y0CyHl1GnaYMZKC5hsdo1rukylFyJDCbEgCucNanDADFMxLDassU2nMoLaQYzRoSaBA4WmLb%2FTCc8p4IVhD5IHZ4IKf8aU6AVnSeD2HbeM1q5kbQptMfULgIatilJW8LYOu3I8qm5wgPRgmh0iiguePoTWhEZ5rMBBCadM7MpkWjHiEr9FBvEwoKrzjhoorSMAfWkPzMEJXOQw8nbaj1S4rZyqZ072u9YVnODy2cTvhQAHSKjdQyVyH2rMLQ%2FcQrXwtV6vxhx5bIM9FDhNheR5p8mH7PO24YgF9JtdGEOSGoi9QA7FbDz5ZxE7OOxFbH%2Fu8ESXMw1djg%3D%3D",
        link: "/courses/ADzDnrmhR6t42hWVAT9G"
      }
    ];

    setCareerRecommendations(mockRecommendations);
  };

  const retakeTest = () => {
    setCurrentPhase('welcome');
    setTestAnswers([]);
    setCareerRecommendations([]);
    setTestQuestions([]);
    setUserDetails(null);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentPhase === 'welcome' && (
          <WelcomePage onStartTest={startTest} />
        )}
        
        {currentPhase === 'testing' && (
          <TestInterface onCompleteTest={completeTest} />
        )}
        
        {currentPhase === 'results' && (
          <ResultsPage 
            recommendations={careerRecommendations}
            answers={testAnswers}
            questions={testQuestions}
            userDetails={userDetails}
            onRetakeTest={retakeTest}
            isAnalyzing={isAnalyzing}
          />
        )}
      </div>
    </div>
  );
};

export default Index;

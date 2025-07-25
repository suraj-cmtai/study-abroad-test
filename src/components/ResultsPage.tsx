
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CareerRecommendation, TestAnswer, UserDetails } from '../pages/Index';
import { AIQuestion } from '../services/openai';
import { RotateCcw, Trophy, BookOpen, Users, TrendingUp, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ResultsPageProps {
  recommendations: CareerRecommendation[];
  answers: TestAnswer[];
  questions: AIQuestion[];
  userDetails: UserDetails | null;
  onRetakeTest: () => void;
  isAnalyzing: boolean;
}

export const ResultsPage = ({ recommendations, answers, questions, userDetails, onRetakeTest, isAnalyzing }: ResultsPageProps) => {
  // Modal state management
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Send test data to API when component mounts
  useEffect(() => {
    const saveTestData = async () => {
      try {
        console.log('🚀 Starting to save test data...');
        console.log('Questions:', questions.length);
        console.log('Answers:', answers.length);
        console.log('Recommendations:', recommendations.length);
        console.log('User Details:', userDetails);
        console.log('User Details Type:', typeof userDetails);
        console.log('User Details Keys:', userDetails ? Object.keys(userDetails) : 'null');

        // Validate userDetails before proceeding
        if (!userDetails || !userDetails.name || !userDetails.email || !userDetails.phone) {
          console.error('❌ Invalid userDetails:', userDetails);
          return;
        }

        const testDuration = answers.reduce((sum, answer) => sum + answer.timeSpent, 0);
        const totalQuestions = questions.length;

        const testData = {
          questions: questions.map(q => ({
            id: q.id,
            question: q.question,
            options: q.options,
            category: q.category
          })),
          answers: answers,
          recommendations: recommendations,
          userDetails: {
            name: userDetails.name,
            email: userDetails.email,
            phone: userDetails.phone
          },
          testDuration: Math.round(testDuration),
          totalQuestions: totalQuestions
        };

        console.log('📤 Sending test data:', testData);
        console.log('📤 UserDetails in payload:', testData.userDetails);

        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
        console.log('🌐 API Base URL:', baseUrl);
        
        const apiUrl = `${baseUrl}/api/routes/test`;
        console.log('🔗 Full API URL:', apiUrl);
        
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(testData)
        });

        console.log('📥 Response status:', response.status);
        console.log('📥 Response ok:', response.ok);

        if (response.ok) {
          const result = await response.json();
          console.log('✅ Test data saved successfully:', result.data?.id);
        } else {
          const errorText = await response.text();
          console.error('❌ Failed to save test data:', response.status, response.statusText);
          console.error('❌ Error details:', errorText);
        }
      } catch (error) {
        console.error('❌ Error saving test data:', error);
      }
    };

    // More aggressive condition checking - only check for essential data
    const shouldSave = !isAnalyzing && 
                      questions.length > 0 && 
                      answers.length > 0 && 
                      userDetails &&
                      userDetails.name &&
                      userDetails.email &&
                      userDetails.phone;
    
    console.log('🔍 Should save test data?', shouldSave);
    console.log('🔍 Conditions:', {
      isAnalyzing,
      questionsLength: questions.length,
      answersLength: answers.length,
      recommendationsLength: recommendations.length,
      hasUserDetails: !!userDetails,
      userDetailsValid: userDetails ? (!!userDetails.name && !!userDetails.email && !!userDetails.phone) : false
    });

    if (shouldSave) {
      console.log('✅ All conditions met, saving test data...');
      // Add a small delay to ensure component is fully mounted
      setTimeout(() => {
        saveTestData();
      }, 100);
    } else {
      console.log('❌ Conditions not met for saving test data');
    }
  }, [questions, answers, recommendations, userDetails, isAnalyzing]);

  // Force save on component mount if data is available
  useEffect(() => {
    if (questions.length > 0 && answers.length > 0 && userDetails && !isAnalyzing) {
      console.log('🔄 Force saving test data on mount...');
      console.log('🔄 UserDetails in force save:', userDetails);
      
      const saveTestData = async () => {
        try {
          // Validate userDetails
          if (!userDetails || !userDetails.name || !userDetails.email || !userDetails.phone) {
            console.error('❌ Invalid userDetails in force save:', userDetails);
            return;
          }

          const testDuration = answers.reduce((sum, answer) => sum + answer.timeSpent, 0);
          const totalQuestions = questions.length;

          const testData = {
            questions: questions.map(q => ({
              id: q.id,
              question: q.question,
              options: q.options,
              category: q.category
            })),
            answers: answers,
            recommendations: recommendations,
            userDetails: {
              name: userDetails.name,
              email: userDetails.email,
              phone: userDetails.phone
            },
            testDuration: Math.round(testDuration),
            totalQuestions: totalQuestions
          };

          console.log('📤 Force save test data:', testData);

          const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
          const response = await fetch(`${baseUrl}/api/routes/test`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(testData)
          });

          if (response.ok) {
            const result = await response.json();
            console.log('✅ Force save successful:', result.data?.id);
          } else {
            const errorText = await response.text();
            console.error('❌ Force save failed:', response.status, errorText);
          }
        } catch (error) {
          console.error('❌ Force save error:', error);
        }
      };

      saveTestData();
    }
  }, []); // Only run once on mount

  const getInsightStats = () => {
    const categories = answers.reduce((acc, answer) => {
      acc[answer.category] = (acc[answer.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const avgResponseTime = answers.reduce((sum, answer) => sum + answer.timeSpent, 0) / answers.length;
    
    return { categories, avgResponseTime };
  };

  const { categories, avgResponseTime } = getInsightStats();

  if (isAnalyzing) {
    return (
      <div className="py-6 sm:py-8">
        <div className="text-center">
          <Loader2 className="h-12 w-12 sm:h-16 sm:w-16 text-blue-600 mx-auto mb-4 animate-spin" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Analyzing Your Responses
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Our AI is carefully analyzing your responses to provide personalized career recommendations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6 sm:py-8">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <div className="mb-6">
          <Trophy className="h-12 w-12 sm:h-16 sm:w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Your Career Profile
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Based on your responses, we've identified careers that align with your personality and strengths.
          </p>
          {userDetails && (
            <div className="mt-4 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200 mx-4">
              <p className="text-xs sm:text-sm text-blue-700">
                <strong>Name:</strong> {userDetails.name} | 
                <strong> Email:</strong> {userDetails.email} | 
                <strong> Phone:</strong> {userDetails.phone}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-12">
        <Card className="text-center">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-xl sm:text-2xl font-bold text-blue-600">{answers.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Questions Answered</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-xl sm:text-2xl font-bold text-teal-600">{Math.round(avgResponseTime)}s</div>
            <div className="text-xs sm:text-sm text-gray-600">Avg Response Time</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-xl sm:text-2xl font-bold text-orange-600">{recommendations.length}</div>
            <div className="text-xs sm:text-sm text-gray-600">Career Matches</div>
          </CardContent>
        </Card>
        <Card className="text-center">
          <CardContent className="pt-4 sm:pt-6">
            <div className="text-xl sm:text-2xl font-bold text-green-600">{Math.round(recommendations[0]?.matchPercentage || 0)}%</div>
            <div className="text-xs sm:text-sm text-gray-600">Best Match</div>
          </CardContent>
        </Card>
      </div>

      {/* Career Recommendations */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">Your Top Career Matches</h2>
        <div className="space-y-4 sm:space-y-6">
          {recommendations.map((career, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 flex flex-col lg:flex-row">
              {/* Course Image (if present) */}
              {career.image && (
                <div className="lg:w-1/4 flex-shrink-0 flex items-center justify-center p-3 sm:p-4">
                  <img src={career.image} alt={career.title} className="rounded-lg shadow-md w-full h-32 sm:h-40 object-cover" />
                </div>
              )}
              <div className={career.image ? "lg:w-3/4 flex-1 flex flex-col" : "flex-1 flex flex-col"}>
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 flex-wrap">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                        #{index + 1} Match
                      </Badge>
                      <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                        {career.matchPercentage}% Match
                      </Badge>
                    </div>
                    <CardTitle className="text-lg sm:text-xl md:text-2xl text-gray-800 break-words">{career.title}</CardTitle>
                  </div>
                  <div className="text-right">
                    <Progress value={career.matchPercentage} className="w-16 sm:w-24 mb-2" />
                    <div className="text-xs sm:text-sm text-gray-600">{career.matchPercentage}%</div>
                  </div>
                </div>
              </CardHeader>
                <CardContent className="flex-1 flex flex-col justify-between">
                  <div>
                <CardDescription className="text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
                  {career.description}
                </CardDescription>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                      Key Skills Required
                    </h4>
                    <div className="flex flex-wrap gap-1 sm:gap-2">
                      {career.skills.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-blue-600 border-blue-200 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <BookOpen className="h-3 w-3 sm:h-4 sm:w-4" />
                      Education Paths
                    </h4>
                    <ul className="space-y-1">
                      {career.educationPath.map((path, pathIndex) => (
                        <li key={pathIndex} className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                          <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-teal-500 rounded-full flex-shrink-0"></div>
                          <span className="break-words">{path}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                  </div>
                  {/* View Course Button */}
                  {career.link && (
                    <div className="mt-4 sm:mt-6 flex justify-end">
                      <a
                        href={career.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 sm:px-6 py-2 bg-orange-500 text-white font-semibold rounded-full shadow hover:bg-orange-600 transition-colors duration-200 text-sm sm:text-base"
                      >
                        View Course
                      </a>
                    </div>
                  )}
              </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Personality Insights */}
      <Card className="mb-6 sm:mb-8 bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center text-xl sm:text-2xl text-blue-800 flex items-center justify-center gap-2">
            <Users className="h-5 w-5 sm:h-6 sm:w-6" />
            Your Response Pattern
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {Object.entries(categories).map(([category, count]) => (
              <div key={category} className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-teal-600">{count}</div>
                <div className="text-xs sm:text-sm text-gray-600 capitalize break-words">{category.replace(/([A-Z])/g, ' $1').trim()}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="text-center space-y-4">
        <Button
          onClick={onRetakeTest}
          variant="outline"
          size="lg"
          className="px-6 sm:px-8 py-3 sm:py-4 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-300 w-full sm:w-auto text-base sm:text-lg"
        >
          <RotateCcw className="mr-2 h-4 w-4" />
          Retake Assessment
        </Button>
        
        <div className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto px-4">
          Remember, this assessment provides guidance based on your current preferences. 
          Your interests and strengths may evolve over time, so feel free to retake this test as you grow.
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={isSuccessModalOpen} onOpenChange={setIsSuccessModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              {modalTitle}
            </DialogTitle>
            <DialogDescription>
              {modalMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsSuccessModalOpen(false)}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={isErrorModalOpen} onOpenChange={setIsErrorModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              {modalTitle}
            </DialogTitle>
            <DialogDescription>
              {modalMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setIsErrorModalOpen(false)}>
              OK
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

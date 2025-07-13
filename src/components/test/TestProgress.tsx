import { Progress } from '@/components/ui/progress';
import { Clock } from 'lucide-react';

interface TestProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  timeRemaining: number;
}

export const TestProgress = ({ currentQuestion, totalQuestions, timeRemaining }: TestProgressProps) => {
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <div className="text-xs sm:text-sm text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
          <span className={`font-semibold ${timeRemaining <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
            {timeRemaining}s
          </span>
        </div>
      </div>
      <Progress value={progress} className="h-1.5 sm:h-2" />
    </div>
  );
};
import { Clock } from 'lucide-react';

interface TestTimerProps {
  timeRemaining: number;
}

export const TestTimer = ({ timeRemaining }: TestTimerProps) => {
  return (
    <div className="text-center mt-4 sm:mt-6">
      <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-gray-600">
        <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
        <span className={`font-semibold ${timeRemaining <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
          {timeRemaining} seconds remaining
        </span>
      </div>
    </div>
  );
};
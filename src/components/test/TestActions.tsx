import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface TestActionsProps {
  selectedAnswer: string;
  isLastQuestion: boolean;
  onSubmit: () => void;
}

export const TestActions = ({ selectedAnswer, isLastQuestion, onSubmit }: TestActionsProps) => {
  return (
    <div className="text-center">
      <Button
        onClick={onSubmit}
        disabled={!selectedAnswer}
        size="lg"
        className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-400 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full shadow-lg disabled:shadow-none transition-all duration-300 w-full sm:w-auto text-base sm:text-lg"
      >
        {isLastQuestion ? 'Complete Test' : 'Next Question'}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};
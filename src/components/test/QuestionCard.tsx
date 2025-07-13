import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AIQuestion } from '../../services/openai';

interface QuestionCardProps {
  question: AIQuestion;
  selectedAnswer: string;
  onAnswerSelect: (answer: string) => void;
}

export const QuestionCard = ({ question, selectedAnswer, onAnswerSelect }: QuestionCardProps) => {
  return (
    <Card className="mb-6 sm:mb-8 shadow-lg">
      <CardHeader className="pb-3 sm:pb-4">
        <div className="text-xs sm:text-sm text-blue-600 font-medium mb-2">{question.category}</div>
        <CardTitle className="text-lg sm:text-xl md:text-2xl leading-relaxed">
          {question.question}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 sm:space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerSelect(option)}
              className={`w-full p-3 sm:p-4 text-left rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                selectedAnswer === option
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 flex-shrink-0 ${
                  selectedAnswer === option
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedAnswer === option && (
                    <div className="w-full h-full rounded-full bg-white scale-50"></div>
                  )}
                </div>
                <span className="flex-1 text-sm sm:text-base">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
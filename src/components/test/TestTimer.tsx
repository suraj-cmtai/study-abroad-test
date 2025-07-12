interface TestTimerProps {
  timeRemaining: number;
}

export const TestTimer = ({ timeRemaining }: TestTimerProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-linear ${
              timeRemaining <= 10 ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${(timeRemaining / 30) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};
import { useState, useEffect } from 'react';
import { Sparkles, Brain, Layers, CheckCircle } from 'lucide-react';

const loadingSteps = [
  { 
    message: "Crafting personalised questions for you", 
    icon: Sparkles,
    duration: 2000 
  },
  { 
    message: "Creating psychometry environment for you", 
    icon: Brain,
    duration: 2000 
  },
  { 
    message: "Merging questions batches", 
    icon: Layers,
    duration: 2000 
  },
  { 
    message: "The test is about to ready", 
    icon: CheckCircle,
    duration: 1500 
  }
];

export const TestLoader = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentStep(prev => (prev + 1) % loadingSteps.length);
        setIsVisible(true);
      }, 300);
    }, loadingSteps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep]);

  const CurrentIcon = loadingSteps[currentStep].icon;

  return (
    <div className="py-6 sm:py-8">
      <div className="flex items-center justify-center min-h-[50vh] sm:min-h-[60vh]">
        <div className="text-center px-4">
          <div className={`transition-all duration-300 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="relative mb-6 sm:mb-8">
              <CurrentIcon className="h-8 w-8 sm:h-12 sm:w-12 text-primary mx-auto animate-pulse" />
              <div className="absolute inset-0 h-8 w-8 sm:h-12 sm:w-12 mx-auto rounded-full bg-primary/20 animate-ping"></div>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {loadingSteps[currentStep].message}
            </h2>
            
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="flex space-x-1 sm:space-x-2">
                {loadingSteps.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1.5 w-6 sm:h-2 sm:w-8 rounded-full transition-all duration-500 ${
                      index <= currentStep 
                        ? 'bg-primary' 
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <p className="text-sm sm:text-base text-muted-foreground animate-pulse">
              Please wait while we prepare your personalized assessment...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
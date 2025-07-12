import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Clock, Target, Zap, TrendingUp, User, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

interface UserDetails {
  name: string;
  phone: string;
  email: string;
}

interface WelcomePageProps {
  onStartTest: (userDetails: UserDetails) => void;
}

export const WelcomePage = ({
  onStartTest
}: WelcomePageProps) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState<Partial<UserDetails>>({});

  const validateForm = () => {
    const newErrors: Partial<UserDetails> = {};
    
    if (!userDetails.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!userDetails.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(userDetails.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!userDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userDetails.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onStartTest(userDetails);
    }
  };

  const handleInputChange = (field: keyof UserDetails, value: string) => {
    setUserDetails(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-6">
          Discover Your Career Path
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Take our AI-powered psychometric assessment to uncover career opportunities 
          that align with your personality, skills, and interests.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="text-center hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <CardTitle className="text-lg">7.5 Minutes</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Quick and efficient assessment</CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <Target className="h-8 w-8 text-teal-500 mx-auto mb-2" />
            <CardTitle className="text-lg">10 Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Focused psychometric evaluation</CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <CardTitle className="text-lg">AI-Powered</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Advanced analysis and insights</CardDescription>
          </CardContent>
        </Card>

        <Card className="text-center hover:shadow-lg transition-shadow duration-300">
          <CardHeader>
            <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <CardTitle className="text-lg">Personalized</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>Tailored career recommendations</CardDescription>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-teal-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-800">What to Expect</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Answer Questions</h3>
              <p className="text-sm text-gray-600">Respond to 10 carefully crafted questions about your preferences and thinking style</p>
            </div>
            <div>
              <div className="bg-teal-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-teal-600 font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">AI Analysis</h3>
              <p className="text-sm text-gray-600">Our AI analyzes your responses to understand your personality and aptitude patterns</p>
            </div>
            <div>
              <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="text-orange-600 font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Get Results</h3>
              <p className="text-sm text-gray-600">Receive personalized career recommendations with education paths and skill requirements</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* User Details Form */}
      <Card className="mb-8 bg-white border-blue-200 shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-2xl text-blue-800 flex items-center justify-center gap-2">
            <User className="h-6 w-6" />
            Tell Us About Yourself
          </CardTitle>
          <CardDescription className="text-center">
            Please provide your details to get personalized career recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={userDetails.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={userDetails.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={userDetails.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="text-center pt-4">
              <Button 
                type="submit" 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Start Your Career Assessment
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
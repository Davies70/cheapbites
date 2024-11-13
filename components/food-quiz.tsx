'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

const quizQuestions = [
  {
    question: "What's your preferred spice level?",
    options: ['Mild', 'Medium', 'Spicy', 'Extra Spicy'],
  },
  {
    question: 'How often do you try new cuisines?',
    options: ['Rarely', 'Sometimes', 'Often', 'Always'],
  },
  {
    question: "What's your favorite type of cuisine?",
    options: ['Italian', 'Asian', 'Mexican', 'American'],
  },
];

const FoodQuiz = () => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Here you would typically send the answers to your backend
      console.log('Quiz completed:', newAnswers);
      setShowQuiz(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalize Your Experience</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='mb-4'>
          Tell us about your food preferences to get personalized
          recommendations.
        </p>
        {!showQuiz ? (
          <Button onClick={() => setShowQuiz(true)}>
            Take Food Preference Quiz
          </Button>
        ) : (
          <div className='space-y-4'>
            <h3 className='font-semibold'>
              {quizQuestions[quizStep].question}
            </h3>
            <RadioGroup onValueChange={handleQuizAnswer}>
              {quizQuestions[quizStep].options.map((option, index) => (
                <div key={index} className='flex items-center space-x-2'>
                  <RadioGroupItem value={option} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`}>{option}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodQuiz;

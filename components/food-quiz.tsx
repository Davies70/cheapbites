'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
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
    options: [
      'Italian',
      'Chinese',
      'Mexican',
      'American',
      'Indian',
      'African',
      'French',
      'Japanese',
      'Thai',
    ],
  },
];

interface FoodQuizProps {
  onQuizComplete: (answers: string[]) => void;
}

const FoodQuiz = ({ onQuizComplete }: FoodQuizProps) => {
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    setQuizAnswers(newAnswers);
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleSubmit = () => {
    onQuizComplete([quizAnswers[2]]);
    setShowQuiz(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personalize Your Experience</CardTitle>
      </CardHeader>
      <CardContent>
        {!showQuiz ? (
          <>
            <p className='mb-4'>
              Tell us about your food preferences to get personalized
              recommendations.
            </p>
            <Button onClick={() => setShowQuiz(true)} className='w-full'>
              Take Food Preference Quiz
            </Button>
          </>
        ) : (
          <div className='space-y-4'>
            {!quizFinished ? (
              <>
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
              </>
            ) : (
              <>
                <p>
                  Great! You've completed the quiz. Ready to see your
                  personalized recommendations?
                </p>
                <Button onClick={handleSubmit} className='w-full'>
                  Submit Quiz
                </Button>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FoodQuiz;

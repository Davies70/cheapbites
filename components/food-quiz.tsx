"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, ArrowRight } from "lucide-react";

const quizQuestions = [
  {
    question: "What's your preferred spice level?",
    options: ["Mild", "Medium", "Spicy", "Extra Spicy"],
  },
  {
    question: "How often do you try new cuisines?",
    options: ["Rarely", "Sometimes", "Often", "Always"],
  },
  {
    question: "What's your favorite type of cuisine?",
    options: [
      "Italian",
      "Chinese",
      "Mexican",
      "American",
      "Indian",
      "French",
      "Japanese",
      "Thai",
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

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers, answer];
    if (quizStep < quizQuestions.length - 1) {
      setQuizAnswers(newAnswers);
      setQuizStep(quizStep + 1);
    } else {
      onQuizComplete(newAnswers);
    }
  };

  const progress = ((quizStep + 1) / quizQuestions.length) * 100;

  return (
    <Card className="border-0 shadow-none">
      {!showQuiz ? (
        <div className="p-8 text-center flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-2">
            <Sparkles className="w-8 h-8" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Personalize Your Experience
          </CardTitle>
          <CardDescription className="text-base">
            Tell us about your food preferences to get tailored, budget-friendly
            recommendations near you.
          </CardDescription>
          <Button
            onClick={() => setShowQuiz(true)}
            size="lg"
            className="w-full sm:w-auto mt-4 h-12 px-8 rounded-full font-bold"
          >
            Take the Quiz <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      ) : (
        <>
          <CardHeader className="pb-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Question {quizStep + 1} of {quizQuestions.length}
              </span>
              <span className="text-xs font-bold text-primary">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2 w-full" />
            <CardTitle className="text-xl font-bold mt-6 leading-tight">
              {quizQuestions[quizStep].question}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quizQuestions[quizStep].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleQuizAnswer(option)}
                  className="p-4 rounded-xl border-2 border-gray-100 bg-white text-left font-semibold text-gray-700 hover:border-primary hover:bg-primary/5 hover:text-primary transition-all duration-200 active:scale-95"
                >
                  {option}
                </button>
              ))}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default FoodQuiz;

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Check } from "lucide-react";

interface DietaryPreferenceProps {
  onPreferencesSubmit: (preferences: string[]) => void;
}

const restrictionsList = [
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Halal",
  "Kosher",
];

const DietaryPreference = ({ onPreferencesSubmit }: DietaryPreferenceProps) => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

  const toggleRestriction = (value: string) => {
    setDietaryRestrictions((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const handleNone = () => {
    setDietaryRestrictions([]);
    onPreferencesSubmit(["None"]);
  };

  const handleSubmit = () => {
    onPreferencesSubmit(
      dietaryRestrictions.length > 0 ? dietaryRestrictions : ["None"],
    );
  };

  return (
    <Card className="border-0 shadow-none">
      <CardHeader className="text-center pb-4 pt-8">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Any Dietary Restrictions?
        </CardTitle>
        <CardDescription>Select all that apply to you.</CardDescription>
      </CardHeader>
      <CardContent className="px-8 pb-8">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {restrictionsList.map((restriction) => {
            const isSelected = dietaryRestrictions.includes(restriction);
            return (
              <button
                key={restriction}
                onClick={() => toggleRestriction(restriction)}
                className={`flex items-center px-4 py-2.5 rounded-full text-sm font-semibold border-2 transition-all duration-200 ${
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground shadow-md"
                    : "border-gray-200 bg-white text-gray-600 hover:border-primary/50 hover:bg-gray-50"
                }`}
              >
                {isSelected && <Check className="w-4 h-4 mr-1.5" />}
                {restriction}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleNone}
            className="flex-1 h-12 rounded-xl font-semibold text-gray-600"
          >
            None, I eat everything
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 h-12 rounded-xl font-bold shadow-md"
          >
            Show My Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DietaryPreference;

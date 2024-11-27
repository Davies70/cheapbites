'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DietaryPreferenceProps {
  onPreferencesSubmit: (preferences: string[]) => void;
}

const DietaryPreference = ({ onPreferencesSubmit }: DietaryPreferenceProps) => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);

  const handleDietaryRestriction = (value: string) => {
    setDietaryRestrictions(
      dietaryRestrictions.includes(value)
        ? dietaryRestrictions.filter((item) => item !== value)
        : [...dietaryRestrictions, value]
    );
  };

  const handleSubmit = () => {
    onPreferencesSubmit(dietaryRestrictions);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dietary Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='mb-4'>Select any dietary restrictions or preferences:</p>
        <div className='flex flex-wrap gap-2 mb-4'>
          {['Vegan', 'Vegetarian', 'Gluten-Free', 'Halal', 'Kosher'].map(
            (restriction) => (
              <Button
                key={restriction}
                variant={
                  dietaryRestrictions.includes(restriction)
                    ? 'default'
                    : 'outline'
                }
                onClick={() => handleDietaryRestriction(restriction)}
              >
                {restriction}
              </Button>
            )
          )}
        </div>
        <Button onClick={handleSubmit} className='w-full'>
          Submit Preferences
        </Button>
      </CardContent>
    </Card>
  );
};

export default DietaryPreference;

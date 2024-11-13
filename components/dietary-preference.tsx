'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DietaryPreference = () => {
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const handleDietaryRestriction = (value: string) => {
    setDietaryRestrictions(
      dietaryRestrictions.includes(value)
        ? dietaryRestrictions.filter((item) => item !== value)
        : [...dietaryRestrictions, value]
    );
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Dietary Preferences</CardTitle>
      </CardHeader>
      <CardContent>
        <p className='mb-4'>Select any dietary restrictions or preferences:</p>
        <div className='flex flex-wrap gap-2'>
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
      </CardContent>
    </Card>
  );
};

export default DietaryPreference;

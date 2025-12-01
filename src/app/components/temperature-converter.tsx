"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { type Unit, convertTemperature } from '@/lib/temperature';
import { CelsiusIcon } from '@/components/icons/celsius-icon';
import { FahrenheitIcon } from '@/components/icons/fahrenheit-icon';
import { KelvinIcon } from '@/components/icons/kelvin-icon';

const FormSchema = z.object({
  temperature: z.coerce.number({
    invalid_type_error: 'Please enter a valid number.',
  }),
  unit: z.enum(['C', 'F', 'K']),
});

type ConvertedResult = {
  unit: Unit;
  name: string;
  value: number;
  icon: React.ElementType;
};

const unitDetails: Record<Unit, { name: string; icon: React.ElementType }> = {
  C: { name: 'Celsius', icon: CelsiusIcon },
  F: { name: 'Fahrenheit', icon: FahrenheitIcon },
  K: { name: 'Kelvin', icon: KelvinIcon },
};

export function TemperatureConverter() {
  const [results, setResults] = useState<ConvertedResult[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
    defaultValues: {
      temperature: 0,
      unit: 'C',
    },
  });

  const { temperature, unit } = form.watch();
  const { isValid } = form.formState;

  useEffect(() => {
    // This effect runs only on the client, so no hydration mismatch
    if (isValid) {
      const fromUnit = unit;
      const value = temperature;
      
      const otherUnits = (['C', 'F', 'K'] as Unit[]).filter(u => u !== fromUnit);

      const newResults = otherUnits.map(toUnit => ({
        unit: toUnit,
        name: unitDetails[toUnit].name,
        value: convertTemperature(value, fromUnit, toUnit),
        icon: unitDetails[toUnit].icon,
      }));

      setResults(newResults);
    } else {
      setResults([]);
    }
  }, [temperature, unit, isValid]);

  return (
    <div className="w-full max-w-md">
      <Card className="shadow-2xl shadow-primary/10 backdrop-blur-sm bg-card/80">
        <CardContent className="p-6">
          <Form {...form}>
            <form className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <FormField
                  control={form.control}
                  name="temperature"
                  render={({ field }) => (
                    <FormItem className="flex-grow w-full sm:w-auto">
                      <FormLabel>Temperature</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.1" placeholder="e.g., 32" {...field} className="text-lg h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem className="w-full sm:w-[150px]">
                      <FormLabel>From</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="text-lg h-12">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="C">Celsius (°C)</SelectItem>
                          <SelectItem value="F">Fahrenheit (°F)</SelectItem>
                          <SelectItem value="K">Kelvin (K)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6 h-[150px]">
        {results.length > 0 ? (
          results.map((result, index) => (
            <Card 
              key={result.unit} 
              className="shadow-lg transition-all duration-500 animate-in fade-in-0 zoom-in-95 backdrop-blur-sm bg-card/80" 
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-base font-medium text-muted-foreground">{result.name}</CardTitle>
                <result.icon className="w-6 h-6 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {result.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="sm:col-span-2 flex items-center justify-center rounded-lg bg-card/50 text-muted-foreground h-full">
            {isValid ? 'Enter a temperature to see conversions.' : 'Please enter a valid number.'}
          </div>
        )}
      </div>
    </div>
  );
}

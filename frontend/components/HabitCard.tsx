'use client';

import { Habit } from '@/lib/types';
import { Check } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HabitCardProps {
    habit: Habit;
    onToggle: (id: string) => void;
}

export function HabitCard({ habit, onToggle }: HabitCardProps) {
    return (
        <Card className="glass-card rounded-2xl hover-lift cursor-pointer group border-0">
            <CardContent className="p-5">
                <div className="flex items-center justify-between">
                    {/* Icon with gradient */}
                    <div className="flex items-center gap-4 flex-1">
                        <div
                            className={`${habit.gradient} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg`}
                        >
                            {habit.icon}
                        </div>

                        <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">
                                {habit.name}
                            </h3>
                            <p className="text-gray-400 text-sm">
                                {habit.streak} day streak 🔥
                            </p>
                        </div>
                    </div>

                    {/* Checkbox Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggle(habit.id);
                        }}
                        className={`
              w-10 h-10 rounded-full border-2 flex items-center justify-center
              transition-all duration-300 ease-out
              ${habit.completed
                                ? 'bg-green-500 border-green-500 scale-110 hover:bg-green-600'
                                : 'border-gray-600 hover:border-gray-400 group-hover:scale-110 hover:bg-transparent'
                            }
            `}
                    >
                        {habit.completed && (
                            <Check className="w-6 h-6 text-white animate-scale-in" />
                        )}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

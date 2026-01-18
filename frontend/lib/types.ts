// Type definitions for habits
export type HabitGradient =
    | 'gradient-purple'
    | 'gradient-blue'
    | 'gradient-pink'
    | 'gradient-orange'
    | 'gradient-green'
    | 'gradient-teal';

export interface Habit {
    id: string;
    name: string;
    gradient: HabitGradient;
    icon: string;
    completed: boolean;
    streak: number;
    frequency: 'daily' | 'weekly' | 'custom';
    createdAt: Date;
    completionHistory: Date[];
}

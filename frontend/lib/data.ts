import { Habit } from './types';

// Mock data for development
export const mockHabits: Habit[] = [
    {
        id: '1',
        name: 'Morning Run',
        gradient: 'gradient-purple',
        icon: '🏃',
        completed: true,
        streak: 12,
        frequency: 'daily',
        createdAt: new Date('2024-01-01'),
        completionHistory: [new Date()],
    },
    {
        id: '2',
        name: 'Read 30 Mins',
        gradient: 'gradient-blue',
        icon: '📖',
        completed: false,
        streak: 8,
        frequency: 'daily',
        createdAt: new Date('2024-01-05'),
        completionHistory: [],
    },
    {
        id: '3',
        name: 'Drink Water',
        gradient: 'gradient-orange',
        icon: '💧',
        completed: true,
        streak: 23,
        frequency: 'daily',
        createdAt: new Date('2023-12-20'),
        completionHistory: [new Date()],
    },
    {
        id: '4',
        name: 'Meditation',
        gradient: 'gradient-pink',
        icon: '🧘',
        completed: false,
        streak: 5,
        frequency: 'daily',
        createdAt: new Date('2024-01-10'),
        completionHistory: [],
    },
];

export const getHabitCompletionRate = (habit: Habit): number => {
    const totalDays = Math.floor(
        (new Date().getTime() - habit.createdAt.getTime()) / (1000 * 60 * 60 * 24)
    );
    return totalDays > 0
        ? Math.round((habit.completionHistory.length / totalDays) * 100)
        : 0;
};

export const getOverallCompletionRate = (habits: Habit[]): number => {
    if (habits.length === 0) return 0;
    const rates = habits.map(getHabitCompletionRate);
    return Math.round(rates.reduce((a, b) => a + b, 0) / habits.length);
};

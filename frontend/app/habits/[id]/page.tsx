'use client';

import { useState } from 'react';
import { ArrowLeft, Check, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { mockHabits } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function HabitDetailPage({ params }: { params: { id: string } }) {
    const router = useRouter();
    const habit = mockHabits.find(h => h.id === params.id);
    const [completedToday, setCompletedToday] = useState(habit?.completed || false);

    if (!habit) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] dark flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-xl">Habit not found</p>
                    <Link href="/" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">
                        Go back to dashboard
                    </Link>
                </div>
            </div>
        );
    }

    // Generate mock calendar data (last 30 days)
    const calendarDays = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        completed: Math.random() > 0.3, // Mock completion
    }));

    const thisWeekCompleted = 6;
    const thisMonthCompleted = 28;

    const handleToggleComplete = () => {
        setCompletedToday(!completedToday);
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this habit?')) {
            router.push('/');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] dark">
            <div className="max-w-3xl mx-auto px-6 py-12">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to dashboard
                </Link>

                {/* Habit Header */}
                <Card className="glass-card rounded-2xl mb-6 border-0">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`${habit.gradient} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-lg`}>
                                {habit.icon}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">{habit.name}</h1>
                                <p className="text-gray-400 capitalize">{habit.frequency}</p>
                            </div>
                        </div>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleDelete}
                            className="text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-colors border-0"
                        >
                            <Trash2 className="w-6 h-6" />
                        </Button>
                    </CardContent>
                </Card>

                {/* Check-in Button */}
                <Card className="glass-card rounded-2xl mb-6 border-0">
                    <CardContent className="p-12 flex flex-col items-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={handleToggleComplete}
                            className={`
                                w-40 h-40 rounded-full flex items-center justify-center border-0
                                transition-all duration-300 shadow-2xl
                                ${completedToday
                                    ? 'bg-green-500 hover:bg-green-600'
                                    : 'gradient-purple hover:scale-105'
                                }
                            `}
                        >
                            <div className="text-center">
                                <Check className="w-16 h-16 text-white mx-auto mb-2" />
                                <div className="text-white font-semibold">
                                    {completedToday ? 'Completed!' : 'Complete'}
                                </div>
                                <div className="text-white/80 text-sm">Today</div>
                            </div>
                        </Button>

                        <div className="mt-8 text-center">
                            <div className="text-gray-400 mb-1">Current Streak</div>
                            <div className="text-5xl font-bold text-white">
                                {habit.streak} days <span className="pulse-glow">🔥</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Calendar Grid */}
                <Card className="glass-card rounded-2xl mb-6 border-0">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">Last 30 Days</h3>
                        <div className="grid grid-cols-10 gap-2">
                            {calendarDays.map((day) => (
                                <div
                                    key={day.day}
                                    className={`
                                        aspect-square rounded-lg flex items-center justify-center text-sm
                                        ${day.completed
                                            ? 'bg-green-500/30 border border-green-500 text-green-300'
                                            : 'bg-white/5 border border-white/10 text-gray-500'
                                        }
                                    `}
                                >
                                    {day.completed ? '✓' : '○'}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <Card className="glass-card rounded-2xl border-0">
                        <CardContent className="p-6 text-center">
                            <div className="text-gray-400 mb-1">This Week</div>
                            <div className="text-3xl font-bold text-white">{thisWeekCompleted}/7</div>
                            <div className="text-sm text-green-400 mt-1">
                                {Math.round((thisWeekCompleted / 7) * 100)}%
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card rounded-2xl border-0">
                        <CardContent className="p-6 text-center">
                            <div className="text-gray-400 mb-1">This Month</div>
                            <div className="text-3xl font-bold text-white">{thisMonthCompleted}/31</div>
                            <div className="text-sm text-purple-400 mt-1">
                                {Math.round((thisMonthCompleted / 31) * 100)}%
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

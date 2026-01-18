'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { mockHabits, getHabitCompletionRate, getOverallCompletionRate } from '@/lib/data';
import { ProgressRing } from '@/components/ProgressRing';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function StatsPage() {
    const activeHabits = mockHabits.length;
    const bestStreak = Math.max(...mockHabits.map(h => h.streak));
    const overallRate = getOverallCompletionRate(mockHabits);

    // Mock weekly data
    const weeklyData = [
        { day: 'Mon', rate: 78 },
        { day: 'Tue', rate: 85 },
        { day: 'Wed', rate: 92 },
        { day: 'Thu', rate: 88 },
        { day: 'Fri', rate: 95 },
        { day: 'Sat', rate: 81 },
        { day: 'Sun', rate: 89 },
    ];

    const topHabits = mockHabits
        .map(habit => ({
            ...habit,
            rate: getHabitCompletionRate(habit),
        }))
        .sort((a, b) => b.rate - a.rate)
        .slice(0, 3);

    return (
        <div className="min-h-screen bg-[#0a0a0a] dark">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Back Button */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft className="w-5 h-5" />
                    Back to dashboard
                </Link>

                {/* Title */}
                <h1 className="text-4xl font-bold text-white mb-8">
                    Your Progress
                </h1>

                {/* Top Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="glass-card rounded-2xl border-0">
                        <CardContent className="p-8 text-center">
                            <div className="flex justify-center mb-4">
                                <ProgressRing percentage={overallRate} size={100} strokeWidth={8} />
                            </div>
                            <div className="text-gray-400 text-sm mb-1">Overall Rate</div>
                            <div className="text-blue-400 text-sm">Currently tracking</div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card rounded-2xl border-0">
                        <CardContent className="p-8 text-center">
                            <div className="text-6xl font-bold text-white mb-2">{activeHabits}</div>
                            <div className="text-gray-400 text-sm mb-1">Active Habits</div>
                            <div className="text-blue-400 text-sm flex items-center justify-center gap-1">
                                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                                Currently tracking
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="glass-card rounded-2xl border-0">
                        <CardContent className="p-8 text-center">
                            <div className="text-6xl font-bold text-white mb-2">
                                {bestStreak} <span className="pulse-glow">🔥</span>
                            </div>
                            <div className="text-gray-400 text-sm mb-1">Best Streak</div>
                            <div className="text-orange-400 text-sm">Consecutive days</div>
                        </CardContent>
                    </Card>
                </div>

                {/* Weekly Chart */}
                <Card className="glass-card rounded-2xl mb-8 border-0">
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Weekly Completion Rate</h2>
                        <div className="flex items-end justify-between gap-4 h-64">
                            {weeklyData.map((data) => (
                                <div key={data.day} className="flex-1 flex flex-col items-center gap-3">
                                    <div className="relative w-full flex-1 flex items-end">
                                        <div
                                            className="w-full gradient-purple rounded-t-lg transition-all duration-500 hover:scale-105 relative group"
                                            style={{ height: `${data.rate}%` }}
                                        >
                                            {/* Tooltip on hover */}
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-3 py-1 rounded-lg text-white text-sm whitespace-nowrap">
                                                {data.rate}%
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-gray-400 text-sm font-medium">{data.day}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Top Habits */}
                <Card className="glass-card rounded-2xl border-0">
                    <CardContent className="p-8">
                        <h2 className="text-2xl font-bold text-white mb-6">Top Habits</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {topHabits.map((habit, index) => (
                                <div
                                    key={habit.id}
                                    className="glass rounded-xl p-6 hover-lift cursor-pointer"
                                >
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className={`${habit.gradient} w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}>
                                            {habit.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-white font-semibold">{habit.name}</h3>
                                            <p className="text-gray-400 text-sm">{habit.streak} day streak</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-bold text-white">{habit.rate}%</div>
                                        <Badge
                                            className={`
                                                px-3 py-1 text-sm font-medium border-0
                                                ${index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                                    index === 1 ? 'bg-gray-400/20 text-gray-300' :
                                                        'bg-orange-400/20 text-orange-300'}
                                            `}
                                        >
                                            #{index + 1}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { mockHabits, getOverallCompletionRate } from '@/lib/data';
import { HabitCard } from '@/components/HabitCard';
import { FloatingAddButton } from '@/components/FloatingAddButton';
import { StreakBadge } from '@/components/StreakBadge';
import { Habit } from '@/lib/types';
import { BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function Home() {
  const router = useRouter();
  const [habits, setHabits] = useState<Habit[]>(mockHabits);

  const handleToggleHabit = (id: string) => {
    setHabits(habits.map(habit =>
      habit.id === id
        ? { ...habit, completed: !habit.completed }
        : habit
    ));
  };

  const handleHabitClick = (id: string) => {
    router.push(`/habits/${id}`);
  };

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const completedToday = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const longestStreak = Math.max(...habits.map(h => h.streak));
  const completionRate = getOverallCompletionRate(habits);

  return (
    <div className="min-h-screen bg-[#0a0a0a] dark">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Today, {todayDate.split(',')[1]}
            </h1>
            <p className="text-gray-400 text-lg">
              Small steps, big change. Keep going!
            </p>
          </div>

          <div className="flex items-center gap-3">
            {longestStreak > 0 && (
              <StreakBadge streak={longestStreak} />
            )}
            <Button
              asChild
              variant="ghost"
              className="glass px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-colors border-0"
            >
              <Link href="/stats">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <span className="text-white font-semibold">Stats</span>
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="glass-card rounded-2xl border-0">
            <CardContent className="p-6">
              <div className="text-gray-400 text-sm mb-1">Today's Progress</div>
              <div className="text-3xl font-bold text-white">
                {completedToday}/{totalHabits}
              </div>
              <div className="text-green-400 text-sm mt-1">
                {Math.round((completedToday / totalHabits) * 100)}% complete
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl border-0">
            <CardContent className="p-6">
              <div className="text-gray-400 text-sm mb-1">Active Habits</div>
              <div className="text-3xl font-bold text-white">{totalHabits}</div>
              <div className="text-blue-400 text-sm mt-1">All time</div>
            </CardContent>
          </Card>

          <Card className="glass-card rounded-2xl border-0">
            <CardContent className="p-6">
              <div className="text-gray-400 text-sm mb-1">Completion Rate</div>
              <div className="text-3xl font-bold text-white">{completionRate}%</div>
              <div className="text-purple-400 text-sm mt-1">Overall average</div>
            </CardContent>
          </Card>
        </div>

        {/* Habits Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Your Habits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {habits.map(habit => (
              <div key={habit.id} onClick={() => handleHabitClick(habit.id)}>
                <HabitCard
                  habit={habit}
                  onToggle={handleToggleHabit}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Empty state if no habits */}
        {habits.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl font-semibold text-white mb-2">
              No habits yet
            </h3>
            <p className="text-gray-400 mb-6">
              Start building better habits today!
            </p>
          </div>
        )}

        {/* Floating Add Button */}
        <FloatingAddButton />
      </div>
    </div>
  );
}

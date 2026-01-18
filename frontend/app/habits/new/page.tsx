'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { HabitGradient } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const HABIT_ICONS = ['🏃', '📖', '💧', '🧘', '🎯', '💪', '🎨', '✍️', '🎵', '🌱'];
const GRADIENTS: HabitGradient[] = [
    'gradient-purple',
    'gradient-blue',
    'gradient-pink',
    'gradient-orange',
    'gradient-green',
    'gradient-teal',
];
const FREQUENCIES = ['daily', 'weekly', 'custom'] as const;

export default function NewHabitPage() {
    const router = useRouter();
    const [habitName, setHabitName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(HABIT_ICONS[0]);
    const [selectedGradient, setSelectedGradient] = useState<HabitGradient>('gradient-purple');
    const [selectedFrequency, setSelectedFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would save to a database
        console.log({
            habitName,
            selectedIcon,
            selectedGradient,
            selectedFrequency,
        });
        router.push('/');
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

                {/* Title */}
                <h1 className="text-4xl font-bold text-white mb-8">
                    Create New Habit
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Habit Name */}
                    <Card className="glass-card rounded-2xl border-0">
                        <CardContent className="p-8">
                            <div className="space-y-6">
                                <div>
                                    <Label htmlFor="habit-name" className="text-gray-300 font-medium mb-3 block">
                                        Habit Name
                                    </Label>
                                    <Input
                                        id="habit-name"
                                        type="text"
                                        value={habitName}
                                        onChange={(e) => setHabitName(e.target.value)}
                                        placeholder="Drink water"
                                        className="bg-white/5 border-white/10 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500"
                                        required
                                    />
                                </div>

                                {/* Icon Picker */}
                                <div>
                                    <Label className="text-gray-300 font-medium mb-3 block">
                                        Pick an Icon
                                    </Label>
                                    <div className="grid grid-cols-5 gap-3">
                                        {HABIT_ICONS.map((icon) => (
                                            <Button
                                                key={icon}
                                                type="button"
                                                variant="ghost"
                                                onClick={() => setSelectedIcon(icon)}
                                                className={`
                                                    ${selectedGradient} w-full aspect-square rounded-xl p-0
                                                    flex items-center justify-center text-3xl border-0
                                                    transition-all duration-200
                                                    ${selectedIcon === icon
                                                        ? 'ring-4 ring-white/50 scale-110'
                                                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                                                    }
                                                `}
                                            >
                                                {icon}
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Color Picker */}
                                <div>
                                    <Label className="text-gray-300 font-medium mb-3 block">
                                        Pick a Color
                                    </Label>
                                    <div className="grid grid-cols-6 gap-3">
                                        {GRADIENTS.map((gradient) => (
                                            <Button
                                                key={gradient}
                                                type="button"
                                                variant="ghost"
                                                onClick={() => setSelectedGradient(gradient)}
                                                className={`
                                                    ${gradient} w-full aspect-square rounded-full p-0 border-0
                                                    transition-all duration-200
                                                    ${selectedGradient === gradient
                                                        ? 'ring-4 ring-white/50 scale-110'
                                                        : 'opacity-60 hover:opacity-100 hover:scale-105'
                                                    }
                                                `}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Frequency Selector */}
                                <div>
                                    <Label className="text-gray-300 font-medium mb-3 block">
                                        Frequency
                                    </Label>
                                    <div className="flex gap-3">
                                        {FREQUENCIES.map((freq) => (
                                            <Button
                                                key={freq}
                                                type="button"
                                                variant="ghost"
                                                onClick={() => setSelectedFrequency(freq)}
                                                className={`
                                                    flex-1 py-3 px-6 rounded-xl font-medium capitalize border-0
                                                    transition-all duration-200
                                                    ${selectedFrequency === freq
                                                        ? 'gradient-purple text-white shadow-lg hover:opacity-90'
                                                        : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                                    }
                                                `}
                                            >
                                                {freq}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        disabled={!habitName}
                        className="w-full gradient-purple py-4 rounded-2xl text-white font-semibold text-lg shadow-xl hover:scale-[1.02] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-0"
                    >
                        Create Habit
                    </Button>
                </form>
            </div>
        </div>
    );
}

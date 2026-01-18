'use client';

import { Badge } from '@/components/ui/badge';

interface StreakBadgeProps {
    streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
    return (
        <Badge className="glass px-4 py-2 flex items-center gap-2 text-base border-0 hover:bg-white/10">
            <span className="text-white font-semibold">{streak} day streak</span>
            <span className="pulse-glow">🔥</span>
        </Badge>
    );
}

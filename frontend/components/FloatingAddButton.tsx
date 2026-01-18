'use client';

import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function FloatingAddButton() {
    return (
        <Button
            asChild
            size="icon"
            className="fixed bottom-8 right-8 w-16 h-16 gradient-purple rounded-full shadow-2xl hover:scale-110 transition-transform duration-300 z-50 border-0"
        >
            <Link href="/habits/new">
                <Plus className="w-8 h-8 text-white" />
            </Link>
        </Button>
    );
}

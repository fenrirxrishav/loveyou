'use client';
import { Heart } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const HeartIcon = ({ style }: { style: React.CSSProperties }) => (
    <div className="absolute animate-heart-float" style={style}>
        <Heart className="w-8 h-8 text-primary/80 fill-primary/50" style={{filter: 'drop-shadow(0 0 5px hsl(var(--primary)))'}}/>
    </div>
);

export const HeartStream = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const hearts = useMemo(() => {
        if (!isClient) return [];
        return Array.from({ length: 20 }).map((_, i) => {
            return {
                id: i,
                style: {
                    left: `${Math.random() * 100}%`,
                    bottom: '-10%',
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${Math.random() * 3 + 4}s`, // Slower, more graceful float
                },
            };
        });
    }, [isClient]);

    if (!isClient) return null;

    return (
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
            {hearts.map(heart => (
                <HeartIcon key={heart.id} style={heart.style} />
            ))}
        </div>
    );
};

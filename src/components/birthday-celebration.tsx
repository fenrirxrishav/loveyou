'use client';
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const ConfettiPiece = ({ style, colorClass }: { style: React.CSSProperties, colorClass: string }) => (
  <div
    className={cn("absolute w-2 h-4 rounded-sm animate-confetti-fall", colorClass)}
    style={style}
  />
);

export const BirthdayCelebration = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const confetti = useMemo(() => {
        if (!isClient) return [];
        return Array.from({ length: 50 }).map((_, i) => {
            const colors = ['bg-primary', 'bg-accent', 'bg-yellow-300', 'bg-pink-400'];
            return {
                id: i,
                style: {
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 20 - 10}%`, // Start slightly above the container
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${Math.random() * 2 + 1}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                },
                colorClass: colors[Math.floor(Math.random() * colors.length)],
            };
        });
    }, [isClient]);

    if (!isClient) return null;

    return (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-headline text-accent text-glow animate-confetti-burst">
                Happy Birthday!
            </h2>
            {confetti.map(c => (
                <ConfettiPiece key={c.id} style={c.style} colorClass={c.colorClass} />
            ))}
        </div>
    );
};

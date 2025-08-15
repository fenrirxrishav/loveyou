
'use client';
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const ConfettiPiece = ({ style, colorClass }: { style: React.CSSProperties, colorClass: string }) => (
  <div
    className={cn("absolute w-2 h-4 rounded-sm animate-confetti-fall", colorClass)}
    style={style}
  />
);

export const BirthdayCelebration = ({ oneTime = false }: { oneTime?: boolean}) => {
    const [isClient, setIsClient] = useState(false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        setIsClient(true);
        if (oneTime) {
          const timer = setTimeout(() => {
              setShow(false);
          }, 4500); // Animation duration + a little extra
          return () => clearTimeout(timer);
        }
    }, [oneTime]);

    const confetti = useMemo(() => {
        if (!isClient) return [];
        return Array.from({ length: 50 }).map((_, i) => {
            const colors = ['bg-primary', 'bg-accent', 'bg-yellow-300', 'bg-pink-400'];
            return {
                id: i,
                style: {
                    left: `${Math.random() * 100}%`,
                    top: `${-10}%`,
                    animationDelay: `${Math.random() * 1.5}s`,
                    animationDuration: `${Math.random() * 2 + 2.5}s`,
                    transform: `rotate(${Math.random() * 360}deg)`,
                },
                colorClass: colors[Math.floor(Math.random() * colors.length)],
            };
        });
    }, [isClient]);

    if (!isClient || !show) return null;

    return (
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center overflow-hidden">
            <h2 className="text-4xl md:text-5xl font-headline text-accent animate-text-burst">
                Happy Birthday!
            </h2>
            {confetti.map(c => (
                <ConfettiPiece key={c.id} style={c.style} colorClass={c.colorClass} />
            ))}
        </div>
    );
};

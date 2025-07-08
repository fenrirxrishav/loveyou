'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Starfield } from '@/components/starfield';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/constellation');
    }, 1200); // Duration of the zoom animation
  };

  return (
    <main className={cn(
      "relative flex flex-col items-center justify-center h-screen w-full overflow-hidden",
      isNavigating && "animate-camera-zoom"
    )}>
      <Starfield
        starCount={2000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="transparent"
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <div className={cn("mb-8", isNavigating ? 'animate-heart-beat' : 'animate-pulse')}>
          <Heart className="w-24 h-24 text-primary fill-primary/20" style={{ filter: 'drop-shadow(0 0 15px hsl(var(--primary)))' }}/>
        </div>

        <h1 className="text-4xl md:text-6xl font-headline text-primary mb-4 text-glow animate-fade-in-down">
          Happy Birthday Sweetheart !!
        </h1>
        <p className="text-lg md:text-2xl font-body text-foreground/80 max-w-2xl mb-12 animate-fade-in-up">
          The beginning of everything.
        </p>
        
        <Button size="lg" className="glow font-bold text-lg px-8 py-6" onClick={handleClick} disabled={isNavigating}>
          Come with me
        </Button>
      </div>
    </main>
  );
}

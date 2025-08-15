
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Starfield } from '@/components/starfield';
import { Heart, Unlock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PASSWORD = "guys";

export default function Home() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.toLowerCase() === PASSWORD) {
      setError(false);
      setIsLocked(false);
    } else {
      setError(true);
      setInputValue("");
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsNavigating(true);
    setTimeout(() => {
      router.push('/constellation');
    }, 1200); // Duration of the zoom animation
  };

  if (isLocked) {
    return (
      <main className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-background animate-fade-in-up">
        <Starfield
          starCount={2000}
          starColor={[255, 255, 255]}
          speedFactor={0.05}
          backgroundColor="transparent"
        />
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 bg-card/30 backdrop-blur-lg rounded-2xl shadow-2xl shadow-primary/20 border border-primary/30 max-w-sm w-full animate-fade-in-down">
          <div className="mb-6">
            <Heart className="w-16 h-16 text-primary" style={{ filter: 'drop-shadow(0 0 10px hsl(var(--primary)))' }}/>
          </div>
          <h1 className="text-2xl font-headline text-primary mb-2 text-glow">A Universe Just for You</h1>
          <p className="text-foreground/80 mb-6">something that you always call me starts with 'g'</p>
          <form onSubmit={handlePasswordSubmit} className="w-full space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password" className="sr-only">Password</Label>
              <Input 
                id="password" 
                type="password" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter the secret word..."
                className="text-center bg-background/50 border-primary/30 focus:border-primary"
              />
            </div>
            {error && <p className="text-destructive text-sm">That's not it, try again.</p>}
            <Button size="lg" className="w-full glow font-bold text-lg" type="submit">
              <Unlock className="mr-2 h-5 w-5" />
              Unlock
            </Button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className={cn(
      "relative flex flex-col items-center justify-center h-screen w-full overflow-hidden animate-fade-in-up",
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

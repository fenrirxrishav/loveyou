'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Starfield } from '@/components/starfield';
import { Heart } from 'lucide-react';

export default function Home() {
  return (
    <main className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      <Starfield
        starCount={2000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="transparent"
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
        <div className="mb-8 animate-pulse">
          <Heart className="w-24 h-24 text-primary fill-primary/20" style={{ filter: 'drop-shadow(0 0 15px hsl(var(--primary)))' }}/>
        </div>

        <h1 className="text-4xl md:text-6xl font-headline text-primary mb-4 text-glow animate-fade-in-down">
          Starlight Serenade
        </h1>
        <p className="text-lg md:text-2xl font-body text-foreground/80 max-w-2xl mb-12 animate-fade-in-up">
          In a universe of billions, only one star captured my heart — you.
        </p>
        <Link href="/constellation" passHref>
          <Button size="lg" className="glow font-bold text-lg px-8 py-6">
            Enter Your Universe
          </Button>
        </Link>
      </div>
    </main>
  );
}

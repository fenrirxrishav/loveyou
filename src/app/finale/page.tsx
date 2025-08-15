
'use client';

import { useEffect, useState } from 'react';
import { PageNavigation } from '@/components/page-navigation';
import { Starfield } from '@/components/starfield';
import { HeartStream } from '@/components/heart-stream';
import { cn } from '@/lib/utils';


export default function FinalePage() {
  const [startAnimations, setStartAnimations] = useState(false);

  useEffect(() => {
    // Trigger animations shortly after the component mounts
    const timer = setTimeout(() => {
      setStartAnimations(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const bodyText = "This time, I think I wished you in the right way.";
  const finalWish = "Once again… from my heart… Happy Birthday, Mam! 💜";


  return (
    <main 
      className="min-h-screen w-full relative flex flex-col items-center justify-center text-center overflow-hidden p-4"
      style={{
        background: 'linear-gradient(180deg, #0B0C28 0%, #2D1F4E 100%)'
      }}
    >
      <Starfield starCount={1000} className="opacity-50" />
      <HeartStream />
      <div className={cn("relative z-10 space-y-12 transition-opacity duration-1000", startAnimations ? 'opacity-100' : 'opacity-0')}>
        
        <h1 className={cn(
          "text-4xl md:text-6xl font-headline text-primary transition-all duration-[1500ms] text-glow-finale",
           startAnimations ? 'animate-heading-reveal' : 'opacity-0'
        )}>
          One Last Thing…
        </h1>

        <div className="text-2xl md:text-3xl font-body text-foreground/90 space-y-8">
           <p className="animate-body-reveal" style={{ animationDelay: '1.5s' }}>
              {bodyText}
            </p>
           <p className="animate-final-wish-reveal whitespace-nowrap" style={{ animationDelay: '4s' }}>
            {finalWish}
          </p>
        </div>
      </div>
      <PageNavigation backLink="/mirror" />
    </main>
  );
}


'use client';

import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Starfield } from '@/components/starfield';
import { HeartStream } from '@/components/heart-stream';

export default function FinalePage() {
  return (
    <main className="min-h-screen w-full relative flex flex-col items-center justify-center text-center overflow-hidden p-4">
      <Starfield starCount={1000} className="opacity-50" />
      <HeartStream />
      <div className="relative z-10">
        <PageTitle>One Last Thing...</PageTitle>
        <div className="text-2xl md:text-3xl font-body text-foreground/90 my-12 space-y-4 animate-fade-in-up">
          <p>this time I wished you in right way , isn't ,</p>
          <p className="font-bold text-primary text-glow">once again "Happy Birthday Mam'm"</p>
        </div>
      </div>
      <PageNavigation backLink="/mirror" nextLink="/" />
    </main>
  );
}

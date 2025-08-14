
'use client';
import React from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function MirrorPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-24 pb-32">
      <PageTitle>How I See You</PageTitle>
      <p className="text-center font-body text-lg text-foreground/80 mb-12 animate-fade-in-up">
        Look into the mirror and see the reflection of my heart.
      </p>

      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-primary glow" />
        <div className="w-[calc(100%-40px)] h-[calc(100%-40px)] bg-background rounded-full overflow-hidden flex items-center justify-center relative">
          <Heart className="w-24 h-24 text-primary animate-pulse" />
        </div>
      </div>
      
      <PageNavigation backLink="/love-letters" nextLink="/soundtrack" />
    </main>
  );
}

'use client';

import React, { useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { Starfield } from '@/components/starfield';

const memories = [
  {
    id: 1,
    title: "The Day We Met",
    content: "I still remember what you were wearing. It felt like the universe conspired to bring us together.",
    position: { top: '20%', left: '15%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'couple meeting',
  },
  {
    id: 2,
    title: "Our First Movie Night",
    content: "You fell asleep halfway through, and I loved watching you more than the movie.",
    position: { top: '50%', left: '30%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'couple movie',
  },
  {
    id: 3,
    title: "A Comforting Smile",
    content: "The time you made me smile when I was at my worst. You're my sunshine.",
    position: { top: '35%', left: '75%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'comforting smile',
  },
  {
    id: 4,
    title: "Late Night Talks",
    content: "Our conversations under the stars, sharing dreams and fears. That's when I knew.",
    position: { top: '70%', left: '60%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'night talk',
  },
  {
    id: 5,
    title: "First 'I Love You'",
    content: "The world stopped for a moment. Every 'I love you' since has felt just as magical.",
    position: { top: '80%', left: '25%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'romantic couple',
  },
];

type Memory = (typeof memories)[0];

const Star = ({ memory, onClick }: { memory: Memory; onClick: (memory: Memory) => void }) => (
  <div
    className="absolute w-4 h-4 cursor-pointer"
    style={{ top: memory.position.top, left: memory.position.left }}
    onClick={() => onClick(memory)}
    role="button"
    aria-label={`Open memory: ${memory.title}`}
  >
    <div className="w-full h-full bg-accent rounded-full accent-glow transition-transform hover:scale-150" />
  </div>
);

export default function ConstellationPage() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <main className="min-h-screen w-full relative">
      <Starfield starCount={1000} className="opacity-50"/>
      <div className="relative z-10 container mx-auto px-4 py-24 pb-32">
        <PageTitle>Our Constellation</PageTitle>
        <p className="text-center font-body text-lg text-foreground/80 mb-8 animate-fade-in-up">
          Each star a memory, lighting up our universe. Click on a star to remember with me.
        </p>
        <Card className="w-full h-[60vh] md:h-[70vh] relative overflow-hidden bg-transparent border-primary/20 shadow-lg shadow-primary/10">
          <CardContent className="p-0 h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-950/30 to-background"></div>
            {memories.map((memory) => (
              <Star key={memory.id} memory={memory} onClick={setSelectedMemory} />
            ))}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedMemory} onOpenChange={(isOpen) => !isOpen && setSelectedMemory(null)}>
        <DialogContent className="max-w-md bg-card/80 backdrop-blur-lg border-primary/50">
          {selectedMemory && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-2xl text-primary">{selectedMemory.title}</DialogTitle>
              </DialogHeader>
              <div className="w-full aspect-video relative rounded-md overflow-hidden my-4">
                <Image src={selectedMemory.image} alt={selectedMemory.title} layout="fill" objectFit="cover" data-ai-hint={selectedMemory.aiHint} />
              </div>
              <DialogDescription className="text-foreground text-base font-body">{selectedMemory.content}</DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
      <PageNavigation nextLink="/love-letters" />
    </main>
  );
}

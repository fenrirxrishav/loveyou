'use client';

import React, { useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { Starfield } from '@/components/starfield';

const memories = [
  // Letter A
  {
    id: 1,
    title: "Apex of Our Story",
    content: "The very peak, where our story began. It felt like destiny.",
    position: { top: '20%', left: '25%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'galaxy stars',
  },
  {
    id: 2,
    title: "Our First Foundation",
    content: "The left pillar of our love, strong and true from our first meeting.",
    position: { top: '80%', left: '15%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'couple meeting',
  },
  {
    id: 3,
    title: "Our Second Foundation",
    content: "The right pillar of our love, built on laughter and shared dreams.",
    position: { top: '80%', left: '35%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'couple laughing',
  },
  {
    id: 4,
    title: "The Connecting Bridge",
    content: "This is the bridge that connects our hearts across any distance.",
    position: { top: '55%', left: '20%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'couple movie',
  },
  {
    id: 5,
    title: "Our Unbreakable Bond",
    content: "And here our bond was sealed. Nothing can break this connection.",
    position: { top: '55%', left: '30%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'comforting smile',
  },
  // Letter R
  {
    id: 6,
    title: "My Constant Star",
    content: "You are the unwavering, constant star in my sky.",
    position: { top: '20%', left: '55%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'night sky',
  },
  {
    id: 7,
    title: "Grounded in Love",
    content: "Your love keeps me grounded, always.",
    position: { top: '80%', left: '55%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'couple holding hands',
  },
  {
    id: 8,
    title: "The Circle of Us",
    content: "The start of the beautiful, full circle of our love.",
    position: { top: '20%', left: '70%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'night talk',
  },
  {
    id: 9,
    title: "Our Embrace",
    content: "How our lives curved to meet in a perfect embrace.",
    position: { top: '40%', left: '75%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'couple embrace',
  },
  {
    id: 10,
    title: "The Heart of it All",
    content: "At the heart of it all, there is you. Always you.",
    position: { top: '50%', left: '65%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'romantic couple',
  },
  {
    id: 11,
    title: "Our Shared Path",
    content: "From our love, a new path forward, one I walk joyfully with you.",
    position: { top: '80%', left: '75%' },
    image: 'https://placehold.co/400x300',
    aiHint: 'couple walking',
  },
];


type Memory = (typeof memories)[0];

const Star = ({ memory, onClick }: { memory: Memory; onClick: (memory: Memory) => void }) => (
  <button
    className="absolute flex items-center justify-center p-4"
    style={{ top: memory.position.top, left: memory.position.left, transform: 'translate(-50%, -50%)' }}
    onClick={() => onClick(memory)}
    aria-label={`Open memory: ${memory.title}`}
  >
    <div className="w-5 h-5 bg-accent rounded-full accent-glow transition-transform hover:scale-150" />
  </button>
);

export default function ConstellationPage() {
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);

  return (
    <main className="min-h-screen w-full relative">
      <Starfield starCount={2000} className="opacity-50"/>
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

'use client';

import React, { useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { Starfield } from '@/components/starfield';

const memoriesA = [
  { id: 1, title: "Our First Call", content: "The first time you said “mai he call krte hu” and that first WhatsApp call we had.", position: { top: '15%', left: '50%' }, image: 'https://placehold.co/400x300', aiHint: 'phone call' },
  { id: 2, title: "Long Chat", content: "That day you were free, and I suddenly found you online — we chatted for a long time.", position: { top: '45%', left: '30%' }, image: 'https://placehold.co/400x300', aiHint: 'chat bubble' },
  { id: 3, title: "Opening Up", content: "Me opening up — telling you the story of my past.", position: { top: '80%', left: '10%' }, image: 'https://placehold.co/400x300', aiHint: 'open book' },
  { id: 4, title: "First Long Chat", content: "Our first long conversation in chats.", position: { top: '45%', left: '70%' }, image: 'https://placehold.co/400x300', aiHint: 'couple chatting' },
  { id: 5, title: "Daily Chats", content: "The beginning of our regular daily chats.", position: { top: '80%', left: '90%' }, image: 'https://placehold.co/400x300', aiHint: 'calendar heart' },
  { id: 6, title: "Thinking of You", content: "Me thinking of you constantly, even during random moments.", position: { top: '60%', left: '40%' }, image: 'https://placehold.co/400x300', aiHint: 'daydream thought' },
  { id: 7, title: "From Chat to Call", content: "Our shift from chatting to a quick normal phone call.", position: { top: '60%', left: '60%' }, image: 'https://placehold.co/400x300', aiHint: 'phone icon' },
];

const memoriesR = [
  { id: 8, title: "Late Night Talks", content: "Our long, long late-night talk that never seemed to end.", position: { top: '15%', left: '20%' }, image: 'https://placehold.co/400x300', aiHint: 'moon stars' },
  { id: 9, title: "Together", content: "The moment we realized we were together.", position: { top: '80%', left: '20%' }, image: 'https://placehold.co/400x300', aiHint: 'holding hands' },
  { id: 10, title: "No Filters", content: "When I told you everything — no filters, no fear.", position: { top: '48%', left: '20%' }, image: 'https://placehold.co/400x300', aiHint: 'honesty trust' },
  { id: 11, title: "First Video Call", content: "Our very first video call.", position: { top: '15%', left: '50%' }, image: 'https://placehold.co/400x300', aiHint: 'video call' },
  { id: 12, title: "Special Name", content: "Me saving your number with a special name.", position: { top: '30%', left: '65%' }, image: 'https://placehold.co/400x300', aiHint: 'contact list' },
  { id: 13, title: "Mood Changer", content: "When a message from you instantly changed my mood.", position: { top: '48%', left: '50%' }, image: 'https://placehold.co/400x300', aiHint: 'happy message' },
  { id: 14, title: "It Meant the World", content: "When you said something small but it meant the world to me.", position: { top: '65%', left: '45%' }, image: 'https://placehold.co/400x300', aiHint: 'small gift' },
  { id: 15, title: "Comfortable Silence", content: "That moment we both were silent, but it felt so full.", position: { top: '80%', left: '70%' }, image: 'https://placehold.co/400x300', aiHint: 'peaceful silence' },
  { id: 16, title: "Connection", content: "When I realized this wasn’t just talking — it was connection.", position: { top: '48%', left: '35%' }, image: 'https://placehold.co/400x300', aiHint: 'spark connection' },
];

const allMemories = [...memoriesA, ...memoriesR];
type Memory = (typeof allMemories)[0];

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
        <Card className="w-full h-[90vh] md:h-[70vh] relative overflow-hidden bg-transparent border-primary/20 shadow-lg shadow-primary/10">
          <CardContent className="p-0 h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-950/30 to-background"></div>
            <div className="flex flex-col md:flex-row h-full w-full items-center justify-center md:gap-4">
              <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
                {memoriesA.map((memory) => (
                  <Star key={memory.id} memory={memory} onClick={setSelectedMemory} />
                ))}
              </div>
              <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
                {memoriesR.map((memory) => (
                  <Star key={memory.id} memory={memory} onClick={setSelectedMemory} />
                ))}
              </div>
            </div>
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
      <PageNavigation backLink="/" nextLink="/love-letters" />
    </main>
  );
}

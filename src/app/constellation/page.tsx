'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Starfield } from '@/components/starfield';
import { useToast } from '@/hooks/use-toast';

type Memory = {
  id: number;
  title: string;
  content: string;
  image: string;
  aiHint: string;
  desktopPos: { top: string; left: string };
  mobilePos: { top:string; left: string };
};

const memories: Memory[] = [
  // A
  { id: 1, title: 'Our First Call', content: 'The first time you said “mai he call krte hu” and that first WhatsApp call we had.', image: 'https://placehold.co/400x300', aiHint: 'phone call', desktopPos: { top: '80%', left: '15%' }, mobilePos: { top: '40%', left: '20%' } },
  { id: 2, title: 'Long Chat', content: 'That day you were free, and I suddenly found you online — we chatted for a long time.', image: 'https://placehold.co/400x300', aiHint: 'chat bubble', desktopPos: { top: '50%', left: '20%' }, mobilePos: { top: '25%', left: '30%' } },
  { id: 3, title: 'Opening Up', content: 'Me opening up — telling you the story of my past.', image: 'https://placehold.co/400x300', aiHint: 'open book', desktopPos: { top: '20%', left: '30%' }, mobilePos: { top: '10%', left: '50%' } },
  { id: 4, title: 'First Long Chat', content: 'Our first long conversation in chats.', image: 'https://placehold.co/400x300', aiHint: 'couple chatting', desktopPos: { top: '50%', left: '40%' }, mobilePos: { top: '25%', left: '70%' } },
  { id: 5, title: 'Daily Chats', content: 'The beginning of our regular daily chats.', image: 'https://placehold.co/400x300', aiHint: 'calendar heart', desktopPos: { top: '80%', left: '45%' }, mobilePos: { top: '40%', left: '80%' } },
  { id: 6, title: 'Thinking of You', content: 'Me thinking of you constantly, even during random moments.', image: 'https://placehold.co/400x300', aiHint: 'daydream thought', desktopPos: { top: '65%', left: '38%' }, mobilePos: { top: '30%', left: '65%' } },
  { id: 7, title: 'From Chat to Call', content: 'Our shift from chatting to a quick normal phone call.', image: 'https://placehold.co/400x300', aiHint: 'phone icon', desktopPos: { top: '65%', left: '22%' }, mobilePos: { top: '30%', left: '35%' } },
  { id: 8, title: 'Late Night Talks', content: 'Our long, long late-night talk that never seemed to end.', image: 'https://placehold.co/400x300', aiHint: 'moon stars', desktopPos: { top: '50%', left: '20%' }, mobilePos: { top: '25%', left: '30%' } },
  // R
  { id: 9, title: 'Together', content: 'The moment we realized we were together.', image: 'https://placehold.co/400x300', aiHint: 'holding hands', desktopPos: { top: '80%', left: '60%' }, mobilePos: { top: '90%', left: '20%' } },
  { id: 10, title: 'No Filters', content: 'When I told you everything — no filters, no fear.', image: 'https://placehold.co/400x300', aiHint: 'honesty trust', desktopPos: { top: '20%', left: '60%' }, mobilePos: { top: '55%', left: '20%' } },
  { id: 11, title: 'First Video Call', content: 'Our very first video call.', image: 'https://placehold.co/400x300', aiHint: 'video call', desktopPos: { top: '20%', left: '75%' }, mobilePos: { top: '55%', left: '50%' } },
  { id: 12, title: 'Special Name', content: 'Me saving your number with a special name.', image: 'https://placehold.co/400x300', aiHint: 'contact list', desktopPos: { top: '45%', left: '75%' }, mobilePos: { top: '70%', left: '50%' } },
  { id: 13, title: 'Mood Changer', content: 'When a message from you instantly changed my mood.', image: 'https://placehold.co/400x300', aiHint: 'happy message', desktopPos: { top: '45%', left: '60%' }, mobilePos: { top: '70%', left: '20%' } },
  { id: 14, title: 'It Meant the World', content: 'When you said something small but it meant the world to me.', image: 'https://placehold.co/400x300', aiHint: 'small gift', desktopPos: { top: '55%', left: '68%' }, mobilePos: { top: '75%', left: '35%' } },
  { id: 15, title: 'Comfortable Silence', content: 'That moment we both were silent, but it felt so full.', image: 'https://placehold.co/400x300', aiHint: 'peaceful silence', desktopPos: { top: '80%', left: '80%' }, mobilePos: { top: '90%', left: '55%' } },
  { id: 16, title: 'Connection', content: 'When I realized this wasn’t just talking — it was connection.', image: 'https://placehold.co/400x300', aiHint: 'spark connection', desktopPos: { top: '45%', left: '60%' }, mobilePos: { top: '70%', left: '20%' } },
];


const Star = ({ memory, onClick, position, isGlowing, isClickable }: { memory: Memory; onClick: () => void; position: { top: string; left: string }; isGlowing: boolean; isClickable: boolean; }) => (
  <button
    className="absolute flex items-center justify-center p-4 transition-opacity duration-500"
    style={{ top: position.top, left: position.left, transform: 'translate(-50%, -50%)', zIndex: 10 }}
    onClick={onClick}
    disabled={!isClickable}
    aria-label={`Open memory: ${memory.title}`}
  >
    <div className={cn(
      "w-5 h-5 bg-accent rounded-full transition-all duration-300",
      isClickable && "cursor-pointer hover:scale-150",
      isGlowing && "accent-glow scale-125",
      !isClickable && "opacity-60 bg-primary/50"
    )} />
  </button>
);

const Line = ({ p1, p2 }: { p1: { top: string; left: string }; p2: { top: string; left: string } }) => (
  <line
    x1={p1.left}
    y1={p1.top}
    x2={p2.left}
    y2={p2.top}
    className="stroke-primary/50 animate-fade-in-up"
    strokeWidth="1.5"
    strokeDasharray="4 4"
  />
);

export default function ConstellationPage() {
  const [revealedCount, setRevealedCount] = useState(1);
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const isMobile = useMemo(() => {
    if (!isClient) return false;
    return window.innerWidth < 768;
  }, [isClient]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleStarClick = (memory: Memory, index: number) => {
    if (index === revealedCount - 1) {
      setSelectedMemory(memory);
    } else {
       toast({
        title: "A story unfolds one star at a time",
        description: "Please click the glowing star to continue.",
        variant: "default",
      });
    }
  };

  const handleDialogChange = (isOpen: boolean) => {
    if (!isOpen) {
      if (selectedMemory && selectedMemory.id === memories[revealedCount - 1].id) {
        if (revealedCount < memories.length) {
          setRevealedCount(revealedCount + 1);
        } else if (revealedCount === memories.length && !isComplete) {
          setIsComplete(true);
          toast({
            title: "Our Constellation is Complete!",
            description: "You've lit up our entire universe of memories.",
          });
        }
      }
      setSelectedMemory(null);
    }
  };
  
  const Subtitle = () => {
    if (isComplete) {
      return "Our universe of memories, shining brightly."
    }
    if (revealedCount === 1) {
      return "Our story begins. Click the first glowing star."
    }
    return "Each star a memory, lighting up our universe. Click the glowing star."
  }

  if (!isClient) {
    return (
       <main className="min-h-screen w-full relative flex items-center justify-center">
         <Starfield starCount={2000} className="opacity-50"/>
         <p className="text-lg text-foreground/80 animate-pulse">Loading our universe...</p>
       </main>
    );
  }

  return (
    <main className="min-h-screen w-full relative">
      <Starfield starCount={2000} className="opacity-50"/>
      <div className="relative z-10 container mx-auto px-4 py-24 pb-32">
        <PageTitle>Our Constellation</PageTitle>
        <p className="text-center font-body text-lg text-foreground/80 mb-8 animate-fade-in-up h-6">
          <Subtitle />
        </p>
        <Card className="w-full h-[90vh] md:h-[70vh] relative overflow-hidden bg-transparent border-primary/20 shadow-lg shadow-primary/10">
          <CardContent className="p-0 h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-indigo-950/30 to-background"></div>
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 5 }}>
              {memories.slice(0, revealedCount - 1).map((mem, index) => {
                 const nextMem = memories[index + 1];
                 const p1 = isMobile ? mem.mobilePos : mem.desktopPos;
                 const p2 = isMobile ? nextMem.mobilePos : nextMem.desktopPos;
                 return <Line key={`line-${mem.id}`} p1={p1} p2={p2} />;
              })}
            </svg>
            {memories.slice(0, revealedCount).map((memory, index) => {
              const position = isMobile ? memory.mobilePos : memory.desktopPos;
              return (
                <Star
                  key={memory.id}
                  memory={memory}
                  position={position}
                  onClick={() => handleStarClick(memory, index)}
                  isClickable={index === revealedCount - 1 || isComplete}
                  isGlowing={index === revealedCount - 1 && !isComplete}
                />
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Dialog open={!!selectedMemory} onOpenChange={handleDialogChange}>
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

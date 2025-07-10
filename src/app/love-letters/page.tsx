'use client';

import React, { useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';


type StoryPhase = {
  content: string;
};

type StoryChapter = {
  id: number;
  title: string;
  phases: StoryPhase[];
};

const storyChapters: StoryChapter[] = [
  {
    id: 1,
    title: "Before You, There Was Noise",
    phases: [
      { content: "This is the story of how my world was before you. A beautiful chaos, but noise nonetheless." },
      { content: "Every day was a blur of moments, loud and bright, but lacking a certain melody." },
    ],
  },
  {
    id: 2,
    title: "The Shift I Didn’t Notice (But Felt Deeply)",
    phases: [
      { content: "Then, you came along. It wasn't a sudden storm, but a quiet, gentle sunrise I almost missed." },
      { content: "The noise began to fade, replaced by a hum of anticipation whenever you were near." },
    ],
  },
  {
    id: 3,
    title: "I Was Falling, But You Were Already There",
    phases: [
      { content: "I found myself thinking of you, re-reading your messages, smiling at the memory of your voice." },
      { content: "It wasn't a fall, but a realization. I wasn't falling into love; I was arriving home, and you were waiting." },
    ],
  },
    {
    id: 4,
    title: "This Isn’t Perfect — It’s Ours",
    phases: [
      { content: "Our story isn't a flawless fairy tale. It's better. It's real." },
      { content: "It's made of laughter, late-night talks, inside jokes, and the quiet understanding that this is our forever." },
    ],
  },
];

export default function StoryOfOursPage() {
  const [activeChapter, setActiveChapter] = useState<StoryChapter | null>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const { toast } = useToast();

  const handleChapterClick = (chapter: StoryChapter) => {
    const isUnlocked = chapter.id === 1 || completedChapters.includes(chapter.id - 1);
    
    if (isUnlocked) {
      setActiveChapter(chapter);
      setCurrentPhase(0);
    } else {
       toast({
        title: "A story unfolds in its own time.",
        description: "Please complete the previous chapter to continue.",
      });
    }
  };

  const handleNextPhase = () => {
    if (activeChapter && currentPhase < activeChapter.phases.length - 1) {
      setCurrentPhase(currentPhase + 1);
    }
  };
  
  const handleDialogClose = () => {
    if (activeChapter && !completedChapters.includes(activeChapter.id)) {
      setCompletedChapters([...completedChapters, activeChapter.id]);
    }
    setActiveChapter(null);
  }

  const allChaptersCompleted = completedChapters.length === storyChapters.length;

  return (
    <div className="min-h-screen w-full" style={{
      backgroundImage: `radial-gradient(circle at top right, hsl(var(--primary) / 0.1), transparent 40%), radial-gradient(circle at bottom left, hsl(var(--accent) / 0.1), transparent 50%)`,
    }}>
      <main className="container mx-auto px-4 py-24 pb-32">
        <PageTitle>Story of Ours From My Heart</PageTitle>
        <p className="text-center font-body text-lg text-foreground/80 mb-12 animate-fade-in-up">
          Each chapter holds a piece of our story. Click one to begin.
        </p>

        <div className="max-w-2xl mx-auto space-y-6">
          {storyChapters.map((chapter) => {
             const isUnlocked = chapter.id === 1 || completedChapters.includes(chapter.id - 1);
             const isCompleted = completedChapters.includes(chapter.id);
            return (
              <Card
                key={chapter.id}
                onClick={() => handleChapterClick(chapter)}
                className={cn(
                    "bg-card/50 backdrop-blur-sm border-primary/20 transition-all duration-300 shadow-lg",
                    isUnlocked ? "cursor-pointer hover:border-primary/50 hover:bg-card/70 hover:shadow-primary/20" : "opacity-60 cursor-not-allowed",
                )}
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <h2 className={cn("text-2xl font-headline", isUnlocked ? "text-primary/90" : "text-primary/40")}>{chapter.title}</h2>
                  {isCompleted ? (
                     <CheckCircle className="w-8 h-8 text-accent" />
                  ) : isUnlocked ? (
                     <Circle className="w-8 h-8 text-primary/30" />
                  ) : (
                     <Lock className="w-8 h-8 text-primary/30" />
                  )}
                </CardContent>
              </Card>
            )
           })}
        </div>
      </main>

      <Dialog open={!!activeChapter} onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
        <DialogContent className="bg-card/80 backdrop-blur-lg border-primary/50 max-w-lg">
          {activeChapter && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-3xl text-primary text-glow">{activeChapter.title}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-64 my-4 pr-4">
                <div className="space-y-6">
                  {activeChapter.phases.slice(0, currentPhase + 1).map((phase, index) => (
                     <DialogDescription
                        key={index}
                        className={cn(
                          "font-body text-lg text-foreground/90 leading-relaxed animate-fade-in-up",
                           index === currentPhase && "font-semibold text-foreground"
                        )}
                     >
                       {phase.content}
                     </DialogDescription>
                  ))}
                </div>
              </ScrollArea>
              <DialogFooter>
                {currentPhase < activeChapter.phases.length - 1 ? (
                  <Button onClick={handleNextPhase} variant="secondary">Continue...</Button>
                ) : (
                  <DialogClose asChild>
                    <Button onClick={handleDialogClose}>Finish Chapter</Button>
                  </DialogClose>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      <PageNavigation backLink="/constellation" nextLink={allChaptersCompleted ? "/soundtrack" : undefined} />
    </div>
  );
}

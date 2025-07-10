'use client';

import React, { useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

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
    title: "When I First Saw You",
    phases: [
      { content: "Phase 1: Placeholder for the first part of your story about seeing her." },
      { content: "Phase 2: Placeholder for the next part of the story." },
      { content: "Phase 3: Placeholder for the concluding thoughts on that first moment." },
    ],
  },
  {
    id: 2,
    title: "Why I Love You",
    phases: [
      { content: "Phase 1: Placeholder for the beginning of why you love her." },
      { content: "Phase 2: Placeholder for more reasons and examples." },
    ],
  },
  {
    id: 3,
    title: "What I Want for Us",
    phases: [
      { content: "Phase 1: Placeholder for your dreams about your future together." },
      { content: "Phase 2: Placeholder for more hopes and promises." },
      { content: "Phase 3: Placeholder for the final, heartfelt wish for your relationship." },
    ],
  },
];

export default function StoryOfOursPage() {
  const [activeChapter, setActiveChapter] = useState<StoryChapter | null>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);

  const handleChapterClick = (chapter: StoryChapter) => {
    setActiveChapter(chapter);
    setCurrentPhase(0);
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
          {storyChapters.map((chapter) => (
            <Card
              key={chapter.id}
              onClick={() => handleChapterClick(chapter)}
              className="bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/50 hover:bg-card/70 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-primary/20"
            >
              <CardContent className="p-6 flex items-center justify-between">
                <h2 className="text-2xl font-headline text-primary/90">{chapter.title}</h2>
                {completedChapters.includes(chapter.id) ? (
                   <CheckCircle className="w-8 h-8 text-accent" />
                ) : (
                   <Circle className="w-8 h-8 text-primary/30" />
                )}
              </CardContent>
            </Card>
          ))}
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

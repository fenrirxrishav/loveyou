'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Circle, Lock, KeyRound } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


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
      { content: "Life was loud — not in the kind of way that fills you, but in the way that drowns things out." },
      { content: "The days were busy, but empty. Always something happening — notifications buzzing, reels playing on loop, half-finished conversations in group chats, laughter that echoed but never landed. I was surrounded by people, and yet, I don’t remember feeling truly seen by any of them. Everything was fast, disposable, forgettable." },
      { content: "Back then, I didn’t really think about much. I didn’t reflect, I didn’t pause — I just flowed with whatever the day threw at me. My emotions? Muted. My thoughts? Scattered. My life? A series of moments stitched together by habit more than intention." },
      { content: "There were jokes — lots of them. The kind that fill timelines, not hearts. There was banter — loud, chaotic, meaningless. We called it “fun,” but it never really stayed with me. Just fleeting bursts of distraction that disappeared as quickly as they came. Backchodi, memes, group calls, random plans that never happened — the usual." },
      { content: "But nothing felt real. Not deeply. I didn’t crave connection. I didn’t look forward to any message. I never thought twice before replying. Conversations were mostly noise — hollow words to fill silence. I didn’t even notice how emotionally unavailable I had become… not just to others, but to myself." },
      { content: "I didn’t write long messages. I didn’t sit with my feelings. I didn’t care enough to. And honestly, it wasn’t sad. It wasn’t some dramatic loneliness. It was just — numb. Like a static buzz in the background. Life felt like a playlist on shuffle: loud tracks, random skips, no rhythm." },
      { content: "I was moving, but not going anywhere." },
      { content: "And then you came along. Quietly. No big entrance. No cliché moment. Just a simple conversation. A few texts. A random emoji. A weird inside joke that didn’t make sense, but somehow stuck." },
      { content: "And suddenly, the noise didn’t feel so loud anymore." },
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

const secretLetterPassword = "senior";

export default function StoryOfOursPage() {
  const [activeChapter, setActiveChapter] = useState<StoryChapter | null>(null);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [completedChapters, setCompletedChapters] = useState<number[]>([]);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSecretLetterOpen, setIsSecretLetterOpen] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [currentPhase]);

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

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.toLowerCase() === secretLetterPassword) {
      setIsPasswordDialogOpen(false);
      setPasswordError("");
      setPasswordInput("");
      setIsSecretLetterOpen(true);
    } else {
      setPasswordError("That's not it, try again sweetheart.");
    }
  };

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

          {allChaptersCompleted && (
             <Card
                onClick={() => {
                  if (isSecretLetterOpen) {
                    // Re-open secret letter if already unlocked
                    setIsSecretLetterOpen(true);
                  } else {
                    setIsPasswordDialogOpen(true);
                  }
                }}
                className="bg-card/50 backdrop-blur-sm border-accent/40 transition-all duration-300 shadow-lg cursor-pointer hover:border-accent/70 hover:bg-card/70 hover:shadow-accent/20 animate-fade-in-up"
              >
                <CardContent className="p-6 flex items-center justify-between">
                  <h2 className="text-2xl font-headline text-accent/90">A Secret Letter</h2>
                   {isSecretLetterOpen ? (
                     <CheckCircle className="w-8 h-8 text-accent" />
                   ) : (
                    <KeyRound className="w-8 h-8 text-accent/80" />
                   )}
                </CardContent>
              </Card>
          )}
        </div>
      </main>

      {/* Chapter Dialog */}
      <Dialog open={!!activeChapter} onOpenChange={(isOpen) => !isOpen && handleDialogClose()}>
        <DialogContent className="bg-card/80 backdrop-blur-lg border-primary/50 max-w-lg">
          {activeChapter && (
            <>
              <DialogHeader>
                <DialogTitle className="font-headline text-3xl text-primary text-glow">{activeChapter.title}</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-64 my-4 pr-4" viewportRef={scrollAreaRef}>
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
                    <Button onClick={handleDialogClose}>ok ab next</Button>
                  </DialogClose>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="bg-card/80 backdrop-blur-lg border-primary/50 max-w-sm">
           <DialogHeader>
              <DialogTitle className="font-headline text-2xl text-primary">Unlock the Secret</DialogTitle>
               <DialogDescription>
                A special word, just between us.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePasswordSubmit} className="space-y-4 pt-2">
               <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter the password"
                  />
               </div>
               {passwordError && <p className="text-destructive text-sm">{passwordError}</p>}
               <DialogFooter>
                  <Button type="submit">Unlock</Button>
               </DialogFooter>
            </form>
        </DialogContent>
      </Dialog>

      {/* Secret Letter Dialog */}
       <Dialog open={isSecretLetterOpen} onOpenChange={setIsSecretLetterOpen}>
        <DialogContent className="bg-card/80 backdrop-blur-lg border-primary/50 max-w-lg">
            <DialogHeader>
              <DialogTitle className="font-headline text-3xl text-primary text-glow">My Dearest,</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-64 my-4 pr-4">
              <div className="space-y-6 font-body text-lg text-foreground/90 leading-relaxed">
                 <p>This is where your secret, heartfelt letter will go.</p>
                 <p>You can write anything you want here, a memory, a promise, or just a simple 'I love you' that's meant only for her eyes after she's journeyed through your story.</p>
              </div>
            </ScrollArea>
            <DialogFooter>
               <DialogClose asChild>
                  <Button>I love you</Button>
               </DialogClose>
            </DialogFooter>
        </DialogContent>
      </Dialog>


      <PageNavigation backLink="/constellation" nextLink={allChaptersCompleted ? "/soundtrack" : undefined} />
    </div>
  );
}

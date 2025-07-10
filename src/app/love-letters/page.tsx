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
    title: "Phase 1: Before You, There Was Noise",
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
    title: "Phase 2: The Shift I Didn’t Notice (But Felt Deeply)",
    phases: [
      { content: "Something changed. You started lingering in my thoughts long after the chat ended. Not just as a name on my screen — but as a presence in my head." },
      { content: "Even in the middle of conversations with others, a part of me was still thinking about what you said earlier… or wondering what you might say next." },
      { content: "I started checking when you were last online. Started noticing how long it had been since you replied. I’d open your chat just to re-read things we already said — like maybe, between the lines, I’d find something new. Something unspoken." },
      { content: "When I texted, “Call karu?”, it wasn’t casual anymore. I wasn’t just bored. I wasn’t just passing time. I genuinely wanted to hear you. Your voice had started to feel like comfort — something that settled the chaos inside me, even if you barely said much." },
      { content: "But still — every time I asked, a quiet fear followed. Am I disturbing you? Am I taking too much space in your already complicated world?" },
      { content: "Because you didn’t always reply the way I hoped. Not cold — just… reserved. Careful. Distant, sometimes." },
      { content: "And me? I’m the opposite. I overthink, overfeel, overshare. You hold in — I spill out. You process silently — I write essays in my head before hitting send." },
      { content: "We’re built differently. But still… it worked. Somehow, between your quiet pauses and my emotional floods, we found a rhythm. Like music that doesn’t follow the usual beat, but still feels right. Still moves you." },
      { content: "You once told me you’re not good at sharing. And I believed you — because yeah, you don’t always say much. But what you don’t realise is that you do share — in ways that don’t always look like openness." },
      { content: "You share in the way you take a moment before replying. In the edits I can see in your messages — where you type, then delete, then type again." },
      { content: "You share in your hesitation — because it means you care how it lands. You share in the rare moments you say, “I don’t wanna lose this.” And you don’t say that lightly. I know that." },
      { content: "That was never small. That was never just “something.” That was everything." },
    ],
  },
  {
    id: 3,
    title: "Phase 3: I Was Falling, But You Were Already There",
    phases: [
        { content: "I didn’t realize it was love right away. There wasn’t some sudden epiphany, no fireworks going off in the sky. No cinematic moment with violins playing in the background, no heart racing like a movie scene." },
        { content: "It was slower than that. Quieter. Safer. It crept in through the smallest moments." },
        { content: "Like how I wanted to tell you something funny the second it happened — before I even reacted to it myself. Or how I started checking my phone way too often, just to see if you’d seen my message. Not even needing a reply — just that “seen” was enough to feel a little closer to you." },
        { content: "Your voice slowly started replacing music. Suddenly, songs didn’t hit the same. I’d rather listen to you talk about your day than play my favorite playlist. And even your silences — they had a kind of warmth I couldn’t explain." },
        { content: "Being with you felt like breathing. Not something I had to try at, not something I had to think about. Just natural. Like you were the air in the room — and I didn’t notice how vital you were until I imagined a version of my day without you in it." },
        { content: "You told me, once, that you were becoming more emotional. More attached. You weren’t used to it — you said it like a confession. But for me, it wasn’t a surprise. Because I was already there too — not just understanding what you were feeling… but living it." },
        { content: "It wasn’t about missing you anymore. It wasn’t about hoping you’d text back or call soon. It became this strange, quiet ache — a sense that without you, something in me was just… off. Incomplete." },
        { content: "Like I was trying to write a sentence and forgetting the most important word. Like a day without you in it was still a day — just a little less alive." },
        { content: "And that’s how I knew. Not because it was loud. But because when it was you, everything else went quiet — and still felt full." },
    ],
  },
  {
    id: 4,
    title: "Phase 4: This Isn’t Perfect - It's Ours",
    phases: [
        { content: "Yes, there’s an age gap. Yes, it’s “judgeable.” People can roll their eyes, raise their eyebrows, throw in their two cents like they know us. Like they get it. But they don’t." },
        { content: "Because what we have isn’t based on timelines, or boxes we’re supposed to fit in. It’s based on something quieter. Deeper. Something that doesn’t ask for permission to exist." },
        { content: "Yes, we both overthink. We hide feelings. We go quiet when we should speak, and sometimes we spill too much when we should stay still. We send long-ass messages that could’ve been a sentence — or say nothing at all when it actually matters." },
        { content: "We act like fools sometimes. Stubborn. Dramatic. Soft in the wrong places. But even in all that messiness — this isn’t a mistake. This is real." },
        { content: "It’s not perfect. It’s not Instagram-worthy every day. But it’s honest. It’s built on late-night calls, awkward silences, nervous confessions, and a hundred tiny moments where we chose each other — even when it was easier not to." },
        { content: "You once told me you’re not going anywhere. And weirdly, I believed you right away. Not because I’m naive. Not because I wanted to hear it. But because of how you said it." },
        { content: "Because if you were planning to leave, you wouldn’t have let me see the sides of you no one else gets. You wouldn’t have told me your fears like secrets. You wouldn’t have opened up slowly, painfully — like every word cost you something, but you still wanted me to have it." },
        { content: "You wouldn’t have shown me the messy, beautiful truth of your heart… and trusted me to hold it gently." },
        { content: "And me? I’ve changed. Not for you — but because of you. I think more now. Feel more. I don’t just want to enjoy this — I want to protect it. I don’t just want to feel good around you — I want to be better because of you." },
        { content: "You made me into someone who writes letters — someone who cares enough to slow down and pour their heart into words. You made me want to hold something real. Something steady. Something true." },
        { content: "I don’t know what the future looks like. I don’t know what life will throw at us. But I know you. I know the way you say my name like it means something. I know the way you show up, even in silence." },
        { content: "And I know this — whatever this is — it’s worth everything." },
    ],
  },
];

const secretLetterPassword = "guys";

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
                  <h2 className={cn("text-2xl font-headline", isUnlocked ? "text-primary/90" : "text-primary/40")}>
                    {isUnlocked ? chapter.title : `Chapter ${chapter.id}`}
                  </h2>
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
                something that you always calls me 
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


      <PageNavigation backLink="/constellation" nextLink={allChaptersCompleted ? "/mirror" : undefined} />
    </div>
  );
}

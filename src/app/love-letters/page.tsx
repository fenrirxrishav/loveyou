'use client';

import React, { useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const SECRET_PASSWORD = "mylove"; // The password you'll share in real life

export default function LoveLettersPage() {
  const [isSecretLetterOpen, setIsSecretLetterOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const { toast } = useToast();

  const handleUnlock = () => {
    if (password.toLowerCase() === SECRET_PASSWORD) {
      setIsUnlocked(true);
    } else {
      toast({
        title: "Wrong Password",
        description: "That's not it, my love. Try again.",
        variant: "destructive",
      });
      setPassword('');
    }
  };

  const LetterChapter = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-12">
      <h2 className="text-3xl font-headline text-amber-200/90 mb-4">{title}</h2>
      <div className="font-body text-lg text-stone-300/90 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full" style={{
      backgroundImage: `radial-gradient(circle at top right, hsl(var(--primary) / 0.1), transparent 40%), radial-gradient(circle at bottom left, hsl(var(--accent) / 0.1), transparent 50%)`,
    }}>
      <main className="container mx-auto px-4 py-24 pb-32">
        <PageTitle>Love Letters from the Heart</PageTitle>
        <p className="text-center font-body text-lg text-foreground/80 mb-12 animate-fade-in-up">
          Words from my heart to yours, a testament to our story.
        </p>

        <div className="max-w-4xl mx-auto bg-stone-900/50 rounded-lg shadow-2xl shadow-primary/10 border border-primary/20 backdrop-blur-sm">
          <ScrollArea className="h-[60vh] p-8 md:p-12">
            <div className="prose prose-invert">
              <LetterChapter title="When I First Saw You">
                <p>My Dearest,</p>
                <p>They say some moments are etched in time, and the moment I first saw you is one of them. It wasn't just seeing you; it was a feeling of recognition, as if a part of my soul I never knew was missing had just walked into the room. The world became a little brighter that day.</p>
              </LetterChapter>

              <Separator className="my-8 bg-primary/20" />

              <LetterChapter title="Why I Love You">
                <p>It’s in the way you laugh, a sound that could calm any storm within me. It's your kindness, a gentle force that makes the world a better place. It’s your strength, the quiet resilience that inspires me every day. I love you for all that you are, and all that you're yet to be.</p>
              </LetterChapter>
              
              <Separator className="my-8 bg-primary/20" />

              <LetterChapter title="What I Want for Us">
                <p>I dream of a future filled with simple joys: morning coffees, lazy Sundays, and a lifetime of adventures, big and small. I want to build a haven with you, a place where we are always safe, always cherished, and always home.</p>
                <p>Love always,</p>
                <p>[Your Name]</p>
              </LetterChapter>
            </div>
            
            <div className="text-center mt-12">
              <Button onClick={() => setIsSecretLetterOpen(true)} className="accent-glow">
                Unlock a Secret Letter
              </Button>
            </div>
          </ScrollArea>
        </div>
      </main>

      <Dialog open={isSecretLetterOpen} onOpenChange={setIsSecretLetterOpen}>
        <DialogContent className="bg-card/80 backdrop-blur-lg border-primary/50">
          <DialogHeader>
            <DialogTitle className="font-headline text-2xl text-primary">A Secret Note</DialogTitle>
          </DialogHeader>
          {isUnlocked ? (
            <div>
              <DialogDescription className="my-4 text-lg text-foreground font-body">
                My promise to you: To always choose you, to always love you, and to build a universe with you that's even more beautiful than the stars. This is just the beginning.
              </DialogDescription>
              <DialogFooter>
                <Button onClick={() => setIsSecretLetterOpen(false)}>Close</Button>
              </DialogFooter>
            </div>
          ) : (
            <div>
              <DialogDescription className="my-4 text-foreground">
                I've hidden a special promise here. Whisper the secret word to me.
              </DialogDescription>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="password" className="text-right text-foreground">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleUnlock}>Unlock</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
      <PageNavigation backLink="/constellation" nextLink="/soundtrack" />
    </div>
  );
}

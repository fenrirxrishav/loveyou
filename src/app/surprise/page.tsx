'use client';
import React, { useState, useMemo } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const PUZZLE_SIZE = 5;

const PuzzleStar = ({ placed, onClick, style }: { placed: boolean, onClick: () => void, style: React.CSSProperties }) => (
  <div className="absolute" style={style}>
    <button
      onClick={onClick}
      className={cn(
        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500",
        placed ? 'bg-accent/80 accent-glow scale-110' : 'bg-primary/20 border-2 border-dashed border-primary/50'
      )}
      aria-label={placed ? "Star placed" : "Place star"}
    >
      <Star className={cn("w-5 h-5 transition-colors", placed ? 'text-accent-foreground' : 'text-primary')} />
    </button>
  </div>
);

export default function SurprisePage() {
  const [placedStars, setPlacedStars] = useState<boolean[]>(Array(PUZZLE_SIZE).fill(false));
  const [isRevealed, setIsRevealed] = useState(false);
  const { toast } = useToast();

  const isSolved = useMemo(() => placedStars.every(p => p), [placedStars]);
  
  const handleStarClick = (index: number) => {
    if (isSolved) return;
    const nextStarToPlace = placedStars.findIndex(p => !p);
    if (index === nextStarToPlace) {
      const newPlacedStars = [...placedStars];
      newPlacedStars[index] = true;
      setPlacedStars(newPlacedStars);
      if (newPlacedStars.every(p => p)) {
        toast({ title: "The Heart is Complete!", description: "You've unlocked the final surprise." });
      }
    } else {
      toast({
        title: "A Twinkle Out of Place...",
        description: "Follow the path of our constellation.",
        variant: "default",
      });
    }
  };

  const heartPositions = [
    { top: '10%', left: '50%', transform: 'translateX(-50%)' },
    { top: '30%', left: '25%' },
    { top: '30%', left: '75%', transform: 'translateX(-100%)' },
    { top: '60%', left: '35%' },
    { top: '60%', left: '65%', transform: 'translateX(-100%)' },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-24 pb-32">
      <PageTitle>A Surprise for You</PageTitle>
      <p className="text-center font-body text-lg text-foreground/80 mb-8 max-w-2xl animate-fade-in-up">
        One final piece of my heart to give to you. Place the stars to form our cosmic heart and reveal your gift.
      </p>

      <div className="relative w-80 h-80 my-8">
        {heartPositions.map((pos, i) => (
          <PuzzleStar
            key={i}
            placed={placedStars[i]}
            onClick={() => handleStarClick(i)}
            style={{ top: pos.top, left: pos.left, transform: pos.transform || 'none' }}
          />
        ))}
      </div>
      
      {isSolved && (
        <Button onClick={() => setIsRevealed(true)} size="lg" className="accent-glow animate-fade-in-up mt-8">
          Click to Reveal Surprise
        </Button>
      )}

      <Dialog open={isRevealed} onOpenChange={setIsRevealed}>
        <DialogContent className="max-w-3xl bg-card/80 backdrop-blur-lg border-primary/50 p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="font-headline text-2xl text-primary">For You, My Love</DialogTitle>
          </DialogHeader>
          <div className="aspect-video w-full bg-background mt-4">
             {/* Replace this with your video. You can use an iframe for YouTube/Vimeo or a <video> tag for a direct file. */}
            <div className="w-full h-full flex items-center justify-center text-center p-4">
                <p className="text-muted-foreground">Your beautiful video message would be here, telling her how much she means to you.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <PageNavigation backLink="/mirror" />
    </main>
  );
}

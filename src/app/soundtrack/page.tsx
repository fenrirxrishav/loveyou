'use client';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import Image from 'next/image';
import { PlayCircle, Music, PauseCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const playlist = [
  { id: 1, title: 'Yellow', artist: 'Coldplay', caption: 'The night I realized you were everything.' },
  { id: 2, title: 'Perfect', artist: 'Ed Sheeran', caption: 'Because that\'s what you are to me.' },
  { id: 3, title: 'A Thousand Years', artist: 'Christina Perri', caption: 'How long I feel I\'ve waited for you.' },
  { id: 4, title: 'Your Song', artist: 'Elton John', caption: 'The moment you sang it softly in my ear.' },
];

export default function SoundtrackPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSong, setActiveSong] = useState<(typeof playlist)[0] | null>(null);

  const handlePlay = (song: (typeof playlist)[0]) => {
    if (activeSong?.id === song.id && isPlaying) {
      setIsPlaying(false);
      setActiveSong(null);
    } else {
      setActiveSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <main className="container mx-auto px-4 py-24 pb-32">
        <PageTitle>Our Soundtrack</PageTitle>
        <p className="text-center font-body text-lg text-foreground/80 mb-12 animate-fade-in-up">
          The melodies that tell our story. Each note, a memory.
        </p>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 relative">
            <Image
              src="https://placehold.co/400x400"
              alt="Vinyl record"
              width={400}
              height={400}
              className={cn(
                'rounded-full object-cover shadow-2xl shadow-primary/20',
                isPlaying && 'animate-spin'
              )}
              style={{ animationDuration: '8s', animationTimingFunction: 'linear', animationIterationCount: 'infinite' }}
              data-ai-hint="vinyl record"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center">
                <Music className="w-10 h-10 text-primary" />
              </div>
            </div>
          </div>

          <Card className="w-full max-w-lg bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                {playlist.map((song) => (
                  <div
                    key={song.id}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer"
                    onClick={() => handlePlay(song)}
                  >
                    <button aria-label={`Play ${song.title}`}>
                      {activeSong?.id === song.id && isPlaying ? (
                        <PauseCircle className="w-8 h-8 text-primary" />
                      ) : (
                        <PlayCircle className="w-8 h-8 text-foreground/70" />
                      )}
                    </button>
                    <div>
                      <h3 className="font-headline text-xl text-primary/90">{song.title}</h3>
                      <p className="text-sm text-foreground/80">{song.artist}</p>
                      <p className="text-sm font-body italic text-foreground/60 mt-1">"{song.caption}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <PageNavigation backLink="/mirror" nextLink="/wish-garden" />
    </div>
  );
}

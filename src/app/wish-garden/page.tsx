'use client';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Starfield } from '@/components/starfield';

const wishes = [
  { id: 1, wish: "Traveling to Italy, holding your hand while we eat gelato.", position: { top: '25%', left: '20%' } },
  { id: 2, wish: "Late-night talks in our own cozy apartment.", position: { top: '40%', left: '70%' } },
  { id: 3, wish: "Our kids asking how we met, and us telling them our fairy tale.", position: { top: '65%', left: '30%' } },
  { id: 4, wish: "Adopting a puppy and watching it grow with our family.", position: { top: '75%', left: '80%' } },
  { id: 5, wish: "Growing old together, our love story becoming a legend.", position: { top: '15%', left: '50%' } },
];

const Firefly = ({ wish, position }: { wish: string; position: { top: string; left: string } }) => (
  <Popover>
    <PopoverTrigger asChild>
      <div
        className="absolute w-3 h-3 cursor-pointer"
        style={{ ...position, animation: `float ${Math.random() * 5 + 3}s ease-in-out infinite` }}
      >
        <div className="w-full h-full bg-accent rounded-full accent-glow transition-transform hover:scale-150" />
      </div>
    </PopoverTrigger>
    <PopoverContent className="w-64 bg-card/80 backdrop-blur-lg border-accent/50 text-foreground">
      <p className="font-body text-center">{wish}</p>
    </PopoverContent>
  </Popover>
);

export default function WishGardenPage() {
  return (
    <div className="min-h-screen w-full relative">
       <style>
        {`
          @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px); }
            100% { transform: translate(0, 0); }
          }
        `}
      </style>
      <Starfield starCount={200} starColor={[212, 172, 13]} speedFactor={0.02} className="opacity-70" />
      <main className="relative z-10 container mx-auto px-4 py-24 pb-32">
        <PageTitle>The Wish Garden</PageTitle>
        <p className="text-center font-body text-lg text-foreground/80 mb-8 animate-fade-in-up">
          A place for our future dreams to grow. Click a firefly to see a wish.
        </p>
        <Card className="w-full h-[60vh] md:h-[70vh] relative overflow-hidden bg-transparent border-primary/20 shadow-lg shadow-primary/10">
          <CardContent className="p-0 h-full w-full">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-emerald-950/30 to-background"></div>
            {wishes.map((wish) => (
              <Firefly key={wish.id} wish={wish.wish} position={wish.position} />
            ))}
          </CardContent>
        </Card>
      </main>
      <PageNavigation backLink="/soundtrack" nextLink="/mirror" />
    </div>
  );
}

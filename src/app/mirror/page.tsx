
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BirthdayCelebration } from '@/components/birthday-celebration';
import { Camera } from 'lucide-react';
import { HeartStream } from '@/components/heart-stream';
import { cn } from '@/lib/utils';

const animatedWords = [
    { text: "Every time I think of you, my heart feels full.", position: { top: '5%', left: '50%' }, mobilePosition: { top: '5%', left: '50%'} },
    { text: "You’re not just part of my life—you’re the best part.", position: { top: '25%', left: '95%' }, mobilePosition: { top: '20%', left: '85%'} },
    { text: "Loving you is my favorite thing I’ve ever done.", position: { top: '50%', left: '100%' }, mobilePosition: { top: '40%', left: '95%'} },
    { text: "You’re the reason ordinary days feel extraordinary.", position: { top: '75%', left: '95%' }, mobilePosition: { top: '60%', left: '85%'} },
    { text: "No matter where life takes me, my heart will always find you.", position: { top: '95%', left: '50%' }, mobilePosition: { top: '80%', left: '50%'} },
    { text: "I didn’t know what completeness felt like until you.", position: { top: '75%', left: '5%' }, mobilePosition: { top: '60%', left: '15%'} },
    { text: "Your smile is my daily dose of happiness.", position: { top: '50%', left: '0%' }, mobilePosition: { top: '40%', left: '5%'} },
    { text: "I am so lucky to have you.", position: { top: '25%', left: '5%' }, mobilePosition: { top: '20%', left: '15%'} },
];

const AnimatedWord = ({ text, position, isVisible, animationDelay }: { text: string; position: { top: string; left: string }, isVisible: boolean, animationDelay: string }) => (
    <div className={cn(
        "absolute text-primary text-glow text-sm md:text-base font-headline text-center w-36 md:w-48 z-20",
        "transition-opacity duration-1000",
        isVisible ? 'opacity-100' : 'opacity-0'
        )}
        style={{
            top: position.top,
            left: position.left,
            transform: 'translate(-50%, -50%)',
        }}
    >
        {isVisible && (
             <p className="animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-primary pr-1">
                {text}
             </p>
        )}
    </div>
);

export default function MirrorPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [visibleWordsCount, setVisibleWordsCount] = useState(0);
  const { toast } = useToast();
  const celebrationShownRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (!celebrationShownRef.current) {
          setShowCelebration(true);
          celebrationShownRef.current = true;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions in your browser settings to see yourself.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);
  
  useEffect(() => {
    if(hasCameraPermission) {
      setVisibleWordsCount(0); // Reset for re-entry
      const interval = setInterval(() => {
        setVisibleWordsCount((prevCount) => {
          if (prevCount < animatedWords.length) {
            return prevCount + 1;
          }
          clearInterval(interval);
          return prevCount;
        });
      }, 3000); // Reveal a new word every 3 seconds
      return () => clearInterval(interval);
    }
  }, [hasCameraPermission]);


  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-24 pb-32 overflow-hidden">
      <PageTitle>How I See You</PageTitle>
      <p className="text-center font-body text-lg text-foreground/80 mb-12 animate-fade-in-up max-w-xl z-10 px-4">
        Look into the mirror and see the reflection of my heart. But also, it's your birthday! See yourself as I see you: a cause for celebration.
      </p>

      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] flex items-center justify-center">
        {animatedWords.map((word, index) => (
            <AnimatedWord 
                key={word.text} 
                text={word.text} 
                position={isMobile ? word.mobilePosition : word.position} 
                isVisible={index < visibleWordsCount} 
                animationDelay={`${index * 0.5}s`}
            />
        ))}
        <div className="absolute inset-0 rounded-full border-4 border-primary glow z-10" />
        <Card className="w-[calc(100%-20px)] h-[calc(100%-20px)] bg-background rounded-full overflow-hidden flex items-center justify-center relative shadow-inner z-0">
          <CardContent className="p-0 w-full h-full flex items-center justify-center">
            {hasCameraPermission && (
              <>
                {showCelebration && <BirthdayCelebration oneTime={true} />}
                <HeartStream />
              </>
            )}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              playsInline
              style={{ transform: 'scaleX(-1)' }} // Mirror effect
            />
            {!hasCameraPermission && (
              <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-center p-4">
                  <Camera className="w-16 h-16 text-primary/50 mb-4" />
                  <Alert variant="destructive" className="max-w-sm">
                    <AlertTitle>Camera Access Required</AlertTitle>
                    <AlertDescription>
                      Please allow camera access to see your reflection.
                    </AlertDescription>
                  </Alert>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <PageNavigation backLink="/love-letters" nextLink="/" />
    </main>
  );
}

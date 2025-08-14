
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
    { text: "Every time I think of you, my heart feels full.", position: { top: '5%', left: '50%' } },
    { text: "You’re not just part of my life—you’re the best part.", position: { top: '25%', left: '95%' } },
    { text: "Loving you is my favorite thing I’ve ever done.", position: { top: '50%', left: '100%' } },
    { text: "You’re the reason ordinary days feel extraordinary.", position: { top: '75%', left: '95%' } },
    { text: "No matter where life takes me, my heart will always find you.", position: { top: '95%', left: '50%' } },
    { text: "I didn’t know what completeness felt like until you.", position: { top: '75%', left: '5%' } },
    { text: "Your smile is my daily dose of happiness.", position: { top: '50%', left: '0%' } },
    { text: "I am so lucky to have you.", position: { top: '25%', left: '5%' } },
];

const AnimatedWord = ({ text, position, isVisible }: { text: string; position: { top: string; left: string }, isVisible: boolean }) => (
    <div className={cn(
        "absolute text-primary text-glow text-lg font-headline text-center w-48 z-20 transition-all duration-1000",
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        )}
        style={{
            top: position.top,
            left: position.left,
            transform: 'translate(-50%, -50%)'
        }}
    >
        {text}
    </div>
);

export default function MirrorPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [visibleWordsCount, setVisibleWordsCount] = useState(0);
  const { toast } = useToast();
  const celebrationShownRef = useRef(false);

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
    if(hasCameraPermission && visibleWordsCount < animatedWords.length) {
      const interval = setInterval(() => {
        setVisibleWordsCount((prevCount) => {
          const newCount = prevCount + 1;
          if (newCount >= animatedWords.length) {
            clearInterval(interval);
          }
          return newCount;
        });
      }, 2000); // Reveal a new word every 2 seconds
      return () => clearInterval(interval);
    }
  }, [hasCameraPermission, visibleWordsCount]);


  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-24 pb-32 overflow-hidden">
      <PageTitle>How I See You</PageTitle>
      <p className="text-center font-body text-lg text-foreground/80 mb-12 animate-fade-in-up max-w-xl z-10">
        Look into the mirror and see the reflection of my heart. But also, it's your birthday! See yourself as I see you: a cause for celebration.
      </p>

      <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] flex items-center justify-center">
        {hasCameraPermission && animatedWords.map((word, index) => (
            <AnimatedWord 
                key={word.text} 
                text={word.text} 
                position={word.position} 
                isVisible={index < visibleWordsCount} 
            />
        ))}
        <div className="absolute inset-0 rounded-full border-4 border-primary glow z-10" />
        <Card className="w-[calc(100%-20px)] h-[calc(100%-20px)] bg-background rounded-full overflow-hidden flex items-center justify-center relative shadow-inner z-0">
          <CardContent className="p-0 w-full h-full flex items-center justify-center">
            {hasCameraPermission && (
              <>
                {showCelebration && <BirthdayCelebration />}
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


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
    { text: "Every time I think of you, my heart feels full.", className: "top-[5%] left-1/2 -translate-x-1/2 animate-float-1" },
    { text: "You’re not just part of my life—you’re the best part.", className: "top-1/4 right-[5%] animate-float-2" },
    { text: "Loving you is my favorite thing I’ve ever done.", className: "top-1/2 right-0 animate-float-3" },
    { text: "No matter where life takes me, my heart will always find you.", className: "bottom-1/4 right-[5%] animate-float-4" },
    { text: "Your smile is my daily dose of happiness.", className: "bottom-[5%] left-1/2 -translate-x-1/2 animate-float-5" },
    { text: "I didn’t know what completeness felt like until you.", className: "bottom-1/4 left-[5%] animate-float-6" },
    { text: "You’re the reason ordinary days feel extraordinary.", className: "top-1/2 left-0 animate-float-2" },
    { text: "I am so lucky to have you.", className: "top-1/4 left-[5%] animate-float-3" },
];

const AnimatedWord = ({ text, className }: { text: string; className: string }) => (
    <div className={cn("absolute text-primary text-glow text-lg font-headline text-center w-48", className)}>
        {text}
    </div>
);

export default function MirrorPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
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

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-24 pb-32 overflow-hidden">
      <PageTitle>How I See You</PageTitle>
      <p className="text-center font-body text-lg text-foreground/80 mb-12 animate-fade-in-up max-w-xl z-10">
        Look into the mirror and see the reflection of my heart. But also, it's your birthday! See yourself as I see you: a cause for celebration.
      </p>

      <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] flex items-center justify-center">
        {hasCameraPermission && animatedWords.map(word => (
            <AnimatedWord key={word.text} text={word.text} className={word.className} />
        ))}
        <div className="absolute inset-0 rounded-full border-4 border-primary glow" />
        <Card className="w-[calc(100%-20px)] h-[calc(100%-20px)] bg-background rounded-full overflow-hidden flex items-center justify-center relative shadow-inner">
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

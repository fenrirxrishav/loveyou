
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
    { text: "Every time I think of you,\nmy heart feels full.", position: { top: '8%', left: '50%' }, mobilePosition: { top: '5%', left: '50%'} },
    { text: "You’re not just part of my life—\nyou’re the best part.", position: { top: '25%', left: '95%' }, mobilePosition: { top: '25%', left: '90%'} },
    { text: "Loving you is my favorite\nthing I’ve ever done.", position: { top: '50%', left: '100%' }, mobilePosition: { top: '50%', left: '95%'} },
    { text: "You’re the reason ordinary days\nfeel extraordinary.", position: { top: '75%', left: '95%' }, mobilePosition: { top: '75%', left: '90%'} },
    { text: "No matter where life takes me,\nmy heart will always find you.", position: { top: '92%', left: '50%' }, mobilePosition: { top: '95%', left: '50%'} },
    { text: "I didn’t know what completeness\nfelt like until you.", position: { top: '75%', left: '5%' }, mobilePosition: { top: '75%', left: '10%'} },
    { text: "Your smile is my daily\ndose of happiness.", position: { top: '50%', left: '0%' }, mobilePosition: { top: '50%', left: '5%'} },
    { text: "I am so lucky\nto have you.", position: { top: '25%', left: '5%' }, mobilePosition: { top: '25%', left: '10%'} },
];


const AnimatedWord = ({ text, position, isVisible }: { text: string; position: { top: string; left: string }, isVisible: boolean }) => (
    <div
        className={cn(
            "absolute text-primary text-glow text-sm font-headline text-center max-w-sm z-30",
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
             <div className="animate-typing">
                {text.split('\n').map((line, index) => (
                   <p key={index} style={{'--step-count': line.length} as React.CSSProperties}>
                       {line}
                   </p>
                ))}
             </div>
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
          description: 'Please enable camera permissions to see yourself.',
        });
      }
    };

    getCameraPermission();
  }, [toast]);
  
  useEffect(() => {
    if(hasCameraPermission) {
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

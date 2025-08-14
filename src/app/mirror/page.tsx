
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BirthdayCelebration } from '@/components/birthday-celebration';
import { Camera } from 'lucide-react';

export default function MirrorPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        setShowCelebration(true); // Trigger celebration on permission grant

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // Hide celebration after a few seconds
        setTimeout(() => {
          setShowCelebration(false);
        }, 5000);

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
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-24 pb-32">
      <PageTitle>How I See You</PageTitle>
      <p className="text-center font-body text-lg text-foreground/80 mb-12 animate-fade-in-up max-w-xl">
        Look into the mirror and see the reflection of my heart. But also, it's your birthday! See yourself as I see you: a cause for celebration.
      </p>

      <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[533px] flex items-center justify-center">
        <div className="absolute inset-0 rounded-2xl border-4 border-primary glow" />
        <Card className="w-[calc(100%-20px)] h-[calc(100%-20px)] bg-background rounded-2xl overflow-hidden flex items-center justify-center relative shadow-inner">
          <CardContent className="p-0 w-full h-full flex items-center justify-center">
            {showCelebration && <BirthdayCelebration />}
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

    
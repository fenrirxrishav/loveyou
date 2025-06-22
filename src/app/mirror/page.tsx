'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PageTitle } from '@/components/page-title';
import { PageNavigation } from '@/components/page-navigation';
import { Button } from '@/components/ui/button';
import { Camera, CameraOff, Heart } from 'lucide-react';

const adjectives = ["Stunning", "Kind", "Funny", "My Safe Place", "My Always", "My Everything"];

const AnimatedText = ({ words }: { words: string[] }) => {
  const [index, setIndex] = useState(0);
  const [translateY, setTranslateY] = useState('-220px');

  useEffect(() => {
    const onResize = () => {
      setTranslateY(window.innerWidth < 768 ? '-160px' : '-220px');
    };

    onResize();
    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, []);


  useEffect(() => {
    if (index >= words.length) return;
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, 1500);
    return () => clearTimeout(timeout);
  }, [index, words.length]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {words.slice(0, index).map((word, i) => (
        <p
          key={i}
          className="absolute font-headline text-2xl md:text-3xl text-primary text-glow animate-fade-in-up"
          style={{
            transform: `rotate(${i * (360 / words.length)}deg) translateY(${translateY}) rotate(-${i * (360 / words.length)}deg)`,
            animationDelay: `${i * 0.2}s`
          }}
        >
          {word}
        </p>
      ))}
    </div>
  );
};

const BlowingKissAnimation = () => {
  const kisses = useMemo(() => Array.from({ length: 7 }).map((_, i) => ({
    id: i,
    animationDuration: `${Math.random() * 1.5 + 1}s`,
    animationDelay: `${i * 0.15 + Math.random() * 0.2}s`,
    size: `${Math.random() * 16 + 12}px`,
  })), []);

  return (
    <div className="absolute bottom-[30%] left-[20%] pointer-events-none">
      {kisses.map(kiss => (
        <Heart
          key={kiss.id}
          className="absolute text-primary fill-primary/50 animate-kiss-blow origin-bottom-left"
          style={{
            animationDuration: kiss.animationDuration,
            animationDelay: kiss.animationDelay,
            width: kiss.size,
            height: kiss.size,
          }}
        />
      ))}
    </div>
  );
};

export default function MirrorPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [useWebcam, setUseWebcam] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setHasPermission(true);
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setHasPermission(false);
    }
  };

  useEffect(() => {
    if (useWebcam) {
      startWebcam();
    } else {
      const stream = videoRef.current?.srcObject as MediaStream;
      stream?.getTracks().forEach(track => track.stop());
    }
  }, [useWebcam]);

  const MirrorContent = () => {
    if (!useWebcam) {
      return (
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-center text-lg">Would you like to see what I see?</p>
          <Button onClick={() => setUseWebcam(true)} className="accent-glow">
            <Camera className="mr-2 h-4 w-4" /> Enable Camera
          </Button>
        </div>
      );
    }

    if (hasPermission === null) {
      return <p>Requesting camera permission...</p>;
    }

    if (hasPermission === false) {
      return (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <CameraOff className="w-16 h-16 text-destructive" />
          <p>Camera access denied.</p>
          <p className="text-sm text-muted-foreground">But I still see you perfectly.</p>
        </div>
      );
    }
    
    return (
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover scale-x-[-1] rounded-full"
        />
        <BlowingKissAnimation />
      </div>
    )
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center py-24 pb-32">
      <PageTitle>How I See You</PageTitle>
      <p className="text-center font-body text-lg text-foreground/80 mb-12 animate-fade-in-up">
        Look into the mirror and see the reflection of my heart.
      </p>

      <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-4 border-primary glow" />
        <div className="w-[calc(100%-40px)] h-[calc(100%-40px)] bg-background rounded-full overflow-hidden flex items-center justify-center">
          <MirrorContent />
        </div>
        {(useWebcam || hasPermission === false) && <AnimatedText words={adjectives} />}
      </div>
      
      <PageNavigation backLink="/wish-garden" nextLink="/surprise" />
    </main>
  );
}

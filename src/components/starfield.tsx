'use client';
import React, { useState, useRef, useEffect } from 'react';

interface StarfieldProps {
  starCount?: number;
  starColor?: [number, number, number];
  speedFactor?: number;
  backgroundColor?: string;
  className?: string;
}

export const Starfield: React.FC<StarfieldProps> = ({
  starCount = 5000,
  starColor = [255, 255, 255],
  speedFactor = 0.05,
  backgroundColor = 'black',
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [stars, setStars] = useState<
    {
      x: number;
      y: number;
      z: number;
    }[]
  >([]);
  
  const [finalStarCount, setFinalStarCount] = useState(starCount);

  useEffect(() => {
    // Run only on client
    const isMobile = window.innerWidth < 768;
    setFinalStarCount(isMobile ? Math.floor(starCount / 4) : starCount);
  }, [starCount]);


  useEffect(() => {
    const tempStars = Array.from({ length: finalStarCount }, () => ({
      x: Math.random() * 2 - 1,
      y: Math.random() * 2 - 1,
      z: Math.random(),
    }));
    setStars(tempStars);
  }, [finalStarCount]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();

    const render = () => {
      if(!canvas) return;
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      const focalLength = Math.max(canvas.width, canvas.height);

      stars.forEach((star) => {
        star.z -= speedFactor * 0.01;

        if (star.z <= 0) {
          star.x = Math.random() * 2 - 1;
          star.y = Math.random() * 2 - 1;
          star.z = 1;
        }

        const px = star.x * (focalLength / star.z) + cx;
        const py = star.y * (focalLength / star.z) + cy;
        const r = (1 - star.z) * 2;
        
        ctx.beginPath();
        ctx.arc(px, py, r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${starColor[0]}, ${starColor[1]}, ${starColor[2]}, ${1 - star.z})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [stars, starColor, speedFactor, backgroundColor]);

  return <canvas ref={canvasRef} className={`absolute inset-0 z-0 w-full h-full ${className}`} />;
};

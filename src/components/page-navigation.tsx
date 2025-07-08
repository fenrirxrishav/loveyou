import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type PageNavigationProps = {
  backLink?: string;
  nextLink?: string;
};

export function PageNavigation({ backLink, nextLink }: PageNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/30 backdrop-blur-sm z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          {backLink && (
            <Link href={backLink} passHref>
              <Button variant="outline" size="icon" className="glow">
                <ArrowLeft className="h-5 w-5" />
                 <span className="sr-only">Previous</span>
              </Button>
            </Link>
          )}
        </div>
        
        <div>
          {nextLink && (
            <Link href={nextLink} passHref>
              <Button variant="outline" className="accent-glow font-bold">
                there is more bby <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

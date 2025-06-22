type PageTitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function PageTitle({ children, className }: PageTitleProps) {
  return (
    <h1 className={`text-4xl md:text-6xl font-headline text-primary text-center mb-4 tracking-wider animate-fade-in-down text-glow ${className}`}>
      {children}
    </h1>
  );
}

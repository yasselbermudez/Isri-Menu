export default function CategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-lg min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
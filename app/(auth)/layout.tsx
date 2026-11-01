export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen grid place-items-center p-4">
      <div className="w-full max-w-sm space-y-6">{children}</div>
    </main>
  );
}

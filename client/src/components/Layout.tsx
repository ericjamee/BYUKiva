import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow bg-gray-50 w-full overflow-x-hidden">
        <div className="max-w-full">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
} 
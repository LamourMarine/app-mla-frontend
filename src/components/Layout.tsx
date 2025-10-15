import Navbar from './Navbar';
import Footer from './Footer';
interface LayoutProps {
    children: React.ReactNode;
    logo: string;
}

export default function Layout({ children, logo }: LayoutProps) {
    console.log("Navbar chargée !");
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <Navbar logo={logo}
        className="flex flex-col md:flex-row justify-between items-center px-4 py-3"
        />
        
        </header>

        <main className="flex-1 mt-20 px-4"> 
            {children}
        </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

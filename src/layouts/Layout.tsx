import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
interface LayoutProps {
  children: React.ReactNode;
  logo: string;
}

export default function Layout({ children, logo }: LayoutProps) {
  console.log("Navbar chargée !");
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow">
        <Navbar
          logo={logo}
          className="flex flex-col md:flex-row justify-between items-center px-4 py-3"
        />
      </header>

      <main
        className={`flex-1 mt-20 ${
          location.pathname === "/" ? "px-0" : "px-4"
        }`}
      >
        {children}
      </main>

      <footer className="bg-[#002A22] w-full text-center text-white py-8">
        <Footer />
      </footer>
    </div>
  );
}

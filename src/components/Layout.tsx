import Navbar from './Navbar';
import Footer from './Footer';
interface LayoutProps {
    children: React.ReactNode;
    logo: string;
}

export default function Layout({ children, logo }: LayoutProps) {
    return (
        <>
            <Navbar logo={logo}/>
            <main>{children}</main>
            <Footer />
        </>
    );
}
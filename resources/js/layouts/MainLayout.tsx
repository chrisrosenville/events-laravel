import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

interface MainLayoutProps {
    children: React.ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
    return (
        <>
            <Header />
            {props.children}
            <Footer />
        </>
    );
};

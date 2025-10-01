import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Nav from "./navbar/Nav";
import Header from "./Header/Header";

interface LayoutProps {
    isLoggedIn: boolean;
    onLogin: () => void;
}

export function Layout({ isLoggedIn, onLogin }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Nav 
                isLoggedIn={isLoggedIn} 
                onLogin={onLogin} 
            />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
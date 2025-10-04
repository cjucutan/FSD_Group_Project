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
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
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
import { Outlet } from "react-router";
import Footer from "./Footer/Footer";
import Nav from "./navbar/Nav";
import Header from "./Header/Header";

export function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 min-h-screen text-white">
            <Header />
            <Nav/>

            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
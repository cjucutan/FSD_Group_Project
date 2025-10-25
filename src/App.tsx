import './App.css';
import { HomePage } from './components/pages/Home';
import { Routes, Route } from 'react-router';
import { Layout } from './components/common/Layouts/Layout';
import { useEffect, useState } from 'react';
import DisplayAllGames from './components/pages/allGames';
import type { Game } from './components/common/types/games';
import Games from './components/data/games.json';
import SavedGames from './components/pages/savedGames';
import { CommunityHub } from './components/common/Community_Hub/CommunityHub';
import { Profile } from './components/common/user-profile/profile-page';
import { ToastContainer } from "react-toastify";
import { CartridgeCartPage } from './components/common/marketplace/CartridgeCartPage';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [marketSearch, setMarketSearch] = useState("");
    const [games, setGames] = useState<Game[]>(() => {
      const stored = localStorage.getItem("games");
      return stored ? JSON.parse(stored) : Games;
    });

    useEffect(() => {
      localStorage.setItem("games", JSON.stringify(games));
    }, [games]);

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    return (
      <>
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout 
                isLoggedIn={isLoggedIn} 
                onLogin={handleLogin} 
              />
            }
          >
          <Route 
            index 
            element={<HomePage />}
          />
          <Route
            path="/allGames"
            element={
              <DisplayAllGames
                games={games}
                setGames={setGames}
              />
            }
          />
          <Route
            path="/savedGames"
            element={
              <SavedGames
                games={games}
                setGames={setGames}
              />
            }
          />
          <Route path="CommunityHub" element={<CommunityHub />} />
          <Route path="/userProfile" element={<Profile />} />
          
          <Route
          path="marketplace"
          element={
            <CartridgeCartPage
              searchQuery={marketSearch}
              setSearchQuery={setMarketSearch}
            />
          }
        />
          </Route>
        </Routes>
        <ToastContainer />
      </>
    )
}

export default App

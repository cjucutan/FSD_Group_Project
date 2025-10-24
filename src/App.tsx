import './App.css'
import { HomePage } from './components/pages/Home'
import { BrowserRouter, Routes, Route } from 'react-router'
import { Layout } from './components/common/Layouts/Layout'
import { useState } from 'react'
import DisplayAllGames from './components/pages/allGames'
import SavedGames from './components/pages/savedGames'
import { CommunityHub } from './components/common/Community_Hub/CommunityHub'
import { Profile } from './components/common/user-profile/profile-page'
import { CartridgeCartPage } from './components/common/marketplace/CartridgeCartPage'
import { ToastContainer } from 'react-toastify';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [marketSearch, setMarketSearch] = useState("");

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    return (
      <BrowserRouter>
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
                gameDependencies={[]}
                gameFilterFn={null}
              />
            }
          />
          <Route
            path="/savedGames"
            element={<SavedGames/>}
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
      </BrowserRouter>
    )
}

export default App

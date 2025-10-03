import './App.css'
import { HomePage } from './components/pages/Home'
import { Routes, Route } from 'react-router'
import { Layout } from './components/common/Layouts/Layout'
import { useState } from 'react'
import { CommunityHub } from './components/common/Community_Hub/CommunityHub'


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = () => {
        setIsLoggedIn(true)
    }

    return (
        <Routes>
          <Route 
            path="/" 
            element={
              <Layout 
                isLoggedIn={isLoggedIn} 
                onLogin={handleLogin} 
              />
            }>
          <Route 
            index 
            element={<HomePage />}
          />
          <Route path="CommunityHub" element={<CommunityHub />} />
          </Route>
        </Routes>
    )
}

export default App

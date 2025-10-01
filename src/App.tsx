import './App.css'
import { HomePage } from './components/pages/Home'
import { Routes, Route } from 'react-router'
import { Layout } from './components/common/Layouts/Layout'
import { useState } from 'react'


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
          </Route>
        </Routes>
    )
}

export default App

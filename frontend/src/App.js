import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from './components/Header'
import Login from './components/user/Login'
import Singup from './components/user/Signup'
import StoryCreate from './components/user/StoryCreate'
import StoryRead from './components/user/StoryRead'
import StoryList from './components/user/StoryList'
import Insights from './components/user/Insights'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Singup />} />
            <Route path="login" element={<Login />} />
            <Route path="create" element={<StoryCreate />} />
            <Route path="read" element={<StoryRead />} />
            <Route path="list" element={<StoryList />} />
            <Route path="insights" element={<Insights />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  )
}

export default App

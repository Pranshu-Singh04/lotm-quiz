

// frontend/src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import WarningPage from './pages/WarningPage'
import QuizPage from './pages/QuizPage'
import LoadingPage from './pages/LoadingPage'
import ResultPage from './pages/ResultPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IntroPage />} />
        <Route path="/warning" element={<WarningPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}
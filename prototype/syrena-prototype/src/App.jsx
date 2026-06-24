import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import TrackSelectPage from './pages/TrackSelectPage'
import ProjectListPage from './pages/ProjectListPage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/get-started" element={<TrackSelectPage />} />
        <Route path="/tracks/:trackId" element={<ProjectListPage />} />
        <Route path="/tracks/:trackId/projects/:projectId" element={<ProjectDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

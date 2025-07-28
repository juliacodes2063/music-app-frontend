import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { TracksPage } from './pages/TracksPage'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/tracks" replace />} />
        <Route path="/tracks" element={<TracksPage />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} data-testid="toast-container" />
    </>

  )
}

export default App

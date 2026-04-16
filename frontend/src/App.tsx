import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Page } from './pages/Page'

const basename = import.meta.env.BASE_URL

export default function App() {
  return (
    <BrowserRouter basename={basename}>
      <Layout>
        <Routes>
          <Route path="/" element={<Page slug="index" />} />
          <Route path="/:slug" element={<Page />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

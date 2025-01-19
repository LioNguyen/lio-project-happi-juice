import { MainLayout } from '@/components/layout/mainLayout'
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import HomePage from './pages/homePage/HomePage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
    </Route>,
  ),
)

function App() {
  return <RouterProvider router={router} />
}

export default App

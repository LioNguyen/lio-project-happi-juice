import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import HomePage from './components/pages/homePage/HomePage'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomePage />}>
      <Route index element={<></>} />
    </Route>,
  ),
)

function App() {
  return <RouterProvider router={router} />
}

export default App

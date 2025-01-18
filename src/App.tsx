import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<div>Hello</div>}>
      <Route index element={<></>} />
    </Route>,
  ),
)

function App() {
  return <RouterProvider router={router} />
}

export default App

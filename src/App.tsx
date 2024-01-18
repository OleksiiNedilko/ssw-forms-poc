import './App.scss'
import BuilderPage from './components/BuilderPage'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import PreviewPage from './components/PreviewPage.tsx'
import Nav from './components/Nav.tsx'

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <header>
            <Nav>Form builder</Nav>
            <button type={'button'} className={'clear-storage'} onClick={() => {
              localStorage.clear()
            }}>clear
            </button>
          </header>
          <BuilderPage/>
        </>
      ),
    },
    {
      path:'preview',
      element:(
        <>
          <header>
            <Nav>Preview</Nav>
          </header>
          <PreviewPage/>
        </>
      )
    }
  ])

  return <RouterProvider router={router} />

}

export default App

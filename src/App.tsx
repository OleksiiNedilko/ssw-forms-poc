import './App.scss'
import BuilderPage from './components/BuilderPage'

function App() {

  return (
    <>
      <header>
        <p>form builder</p>
        <button type={'button'} className={'clear-storage'} onClick={() => {
          localStorage.clear()
        }}>clear
        </button>
      </header>
      <BuilderPage/>
    </>
  )
}

export default App

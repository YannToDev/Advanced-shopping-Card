import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// On importe le provider qui vient du contexte.
import { ShoppingCartProvider } from './context/ShoppingCardContext';

//  Pages Components
import { Home } from './pages/Home';
import { Store } from './pages/Store';
import { About } from './pages/About';

// Components
import { Navbar } from './components/Navbar';

// On englobe entièrement notre App du provider de context pour y avoir accès de partout
function App() {

  return (

    <ShoppingCartProvider>
      <Navbar />
         <Container className='mb-4'>
      <Routes>
        <Route path="/"  element={<Home />} />
        <Route path="/about"  element={<About />} />
        <Route path="/store"  element={<Store />} />
      </Routes>
         </Container>
    </ShoppingCartProvider>

  )
}

export default App

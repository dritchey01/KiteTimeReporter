import './styles/base/index.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header'
import AllRoutes from './Routers/routes';
import { useState } from 'react';

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <Router>
      <Header setIsAdmin={setIsAdmin} />
          <AllRoutes isAdmin={isAdmin} />
    </Router>
  )
}

export default App

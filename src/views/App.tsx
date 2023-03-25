import './App.css';
import Home from './home/Home';

import { BrowserRouter as Router, Routes, Route } from  'react-router-dom'
import Layout from '../components/layout/Layout';
import Stocks from './stocks/Stocks';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<Layout />}>
            <Route path="/acoes" element={<Stocks />} />
          </Route>
          <Route path='*' element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

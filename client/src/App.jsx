import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home'
import About from './views/About'
import Navbar from './components/navbar';



function App() {
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
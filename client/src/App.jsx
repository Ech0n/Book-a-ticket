import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home'
import About from './views/About'
import Events from './views/Events'
import Navbar from './components/navbar';
import EventsCalendar from './views/EventsCalendar';
import EventsUpcoming from './views/EventsUpcoming';



function App() {
  return (
    <div>

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/calendar" element={<EventsCalendar />} />
        <Route path="/upcoming" element={<EventsUpcoming />} />
      </Routes>
    </div>
  );
}

export default App;
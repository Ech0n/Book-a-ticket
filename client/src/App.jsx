import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home'
import About from './views/About'
import EventDetails from './views/EventDetails'
import Events from './views/Events'
import Navbar from './components/navbar';
import EventsCalendar from './views/EventsCalendar';
import EventsUpcoming from './views/EventsUpcoming';
import DataProvider from './DataProvider';



function App() {
  return (
    <div>
      <Navbar />
      <DataProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/calendar" element={<EventsCalendar />} />
          <Route path="/upcoming" element={<EventsUpcoming />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home'
import About from './views/About'
import EventDetails from './views/EventDetails'
import Events from './views/Events'
import Navbar from './components/navbar';
import EventsCalendar from './views/EventsCalendar';
import EventsUpcoming from './views/EventsUpcoming';
import DataProvider from './DataProvider';
import Login from './views/Login';
import Profile from './views/Profile';



function App() {
  return (
    <div>
      <DataProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/calendar" element={<EventsCalendar />} />
          <Route path="/upcoming" element={<EventsUpcoming />} />
          <Route path='/login' element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
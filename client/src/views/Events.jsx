import EventList from "../components/eventList";
import { events } from "../mockData";
import { Link } from "react-router-dom";

function Events() {
    return (
        <div className="p-15 text-2xl text-center flex flex-col gap-6">
            <h1>Events:</h1>
            <EventList events={events} />
            <div className="grid grid-cols-2 gap-4 justify-center">
                <Link to="/events" className="text-gray-700 hover:text-blue-600">
                    All events &gt;
                </Link>
                <Link to="/upcoming" className="text-gray-700 hover:text-blue-600">
                    Upcoming &gt;
                </Link>
            </div>
        </div>
    );
}

export default Events;
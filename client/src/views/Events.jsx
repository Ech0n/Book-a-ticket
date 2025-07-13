import EventList from "../components/eventList";
import { Link } from "react-router-dom";

function Events() {
    console.log("Events")
    return (
        <div className="p-15 text-2xl text-center flex flex-col gap-6">
            <h1>Events:</h1>
            <EventList />
            <div className="grid grid-cols-2 gap-4 justify-center">
                <Link to="/calendar" className="text-gray-700 hover:text-blue-600">
                    Calendar &gt;
                </Link>
                <Link to="/upcoming" className="text-gray-700 hover:text-blue-600">
                    Upcoming &gt;
                </Link>
            </div>
        </div>
    );
}

export default Events;
import Calendar from "@/components/Calendar"
import { events } from "../mockData"
import { Link } from "react-router-dom";

export default function EventsCalendar() {
    return (
        <div className="p-15 text-2xl text-center">
            <h2 className="my-2">Events Calendar:</h2>
            <Calendar events={events} />
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

import { Link } from "react-router-dom";
import Upcoming from "@/components/upcoming"
import DataProvider, { DataContext } from '../DataProvider';

export default function EventsUpcoming() {

    return (
        <div className="p-15 text-2xl ">
            <div className="grid grid-cols-2 gap-4">
                <Link to="/events" className="text-center text-gray-700 hover:text-blue-600">
                    All events &gt;
                </Link>
                <Link to="/calendar" className="text-center text-gray-700 hover:text-blue-600">
                    Calendar &gt;
                </Link>
            </div>
            <h2 className="my-2">Upcoming:</h2>
            <Upcoming />
        </div>
    );
}

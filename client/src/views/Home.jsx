import Featured from "../components/featured";
import { Skeleton } from "@/components/ui/Skeleton"
import { Separator } from "@/components/ui/Separator"
import { events, featuredEvents } from "../mockData"
import EventList from "../components/eventList";
import Upcoming from "../components/upcoming";
import { Link } from "react-router-dom";

function Home() {
    return <>
        <div className="p-15 text-2xl ">
            <h2 className="my-3">Featured:</h2>
            <Featured events={featuredEvents} />
            <Separator className="mt-6 mb-1" />
            <Link to="/upcoming" className="text-center text-gray-700 hover:text-blue-600">
                <h2 className="my-2">Upcoming:</h2>
            </Link>
            <Upcoming events={events} maxItems={3} />
            <Separator className="mt-6 mb-1" />
            <Link to="/events" className="text-center text-gray-700 hover:text-blue-600">
                <h2 className="my-3">Events:</h2>
            </Link>
            <EventList events={events} />
        </div>
    </>;
}

export default Home;

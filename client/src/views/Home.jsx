import Featured from "../components/featured";
import { Separator } from "@/components/ui/separator"
import EventList from "../components/eventList";
import Upcoming from "../components/upcoming";
import { Link } from "react-router-dom";

function Home() {

    return <>
        <div className="p-15 text-2xl ">
            <h2 className="my-3">Featured:</h2>
            <Featured />
            <Separator className="mt-6 mb-1" />
            <Link to="/upcoming" className="text-center text-gray-700 hover:text-blue-600">
                <h2 className="my-2">Upcoming:</h2>
            </Link>
            <Upcoming maxItems={3} />
            <Separator className="mt-6 mb-1" />
            <Link to="/events" className="text-center text-gray-700 hover:text-blue-600">
                <h2 className="my-3">Events:</h2>
            </Link>
            <EventList />
        </div>
    </>;
}

export default Home;

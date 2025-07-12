import Featured from "../components/featured";
import { Skeleton } from "@/components/ui/Skeleton"
import { Separator } from "@/components/ui/Separator"
import { events, featuredEvents } from "../mockData"
import EventList from "../components/eventList";

function Home() {
    return <>
        <div className="p-15 text-2xl ">
            <h2 className="my-3">Featured:</h2>
            <Featured events={featuredEvents} />
            <Separator className="mt-6 mb-1" />
            <h2 className="my-2">Kalendarz wydarzeń:</h2>
            {/* Place holder ⬇ */}
            <Skeleton className="h-[370px] w-full" />
            <Separator className="mt-6 mb-1" />
            <h2 className="my-3">Wydarzenia:</h2>
            <EventList events={events} />
        </div>
    </>;
}

export default Home;

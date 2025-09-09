import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { format, isToday, isTomorrow, parseISO, differenceInCalendarDays } from "date-fns";
import { enUS } from "date-fns/locale";
import { DataContext } from '../DataProvider';
import { useContext } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import EventCard from "./eventCard";

function getTime(event) {
    const dateObj = parseISO(`${event.date}T${event.time}`);
    return dateObj
}
//TODO: Limit to 3 items total not 3 groups because this can brake layout
export default function Upcoming({ maxItems }) {
    const { allEvents, loading, error } = useContext(DataContext);

    const now = new Date();

    const sortedEvents = [...allEvents]
        .filter(ev => getTime(ev) >= now)
        .sort((a, b) => (getTime(a) - getTime(b)));

    const limitedEvents = maxItems ? sortedEvents.slice(0, maxItems) : sortedEvents;
    const grouped = {};

    for (const ev of limitedEvents) {
        const daysDiff = differenceInCalendarDays(getTime(ev), now);
        let groupLabel;

        if (isToday(getTime(ev))) {
            groupLabel = "Today";
        } else if (isTomorrow(getTime(ev))) {
            groupLabel = "Tomorrow";
        } else if (daysDiff <= 6) {
            groupLabel = format(getTime(ev), "EEEE", { locale: enUS });
        } else {
            groupLabel = format(getTime(ev), "EEEE do MMMM", { locale: enUS });
        }

        if (!grouped[groupLabel]) {
            grouped[groupLabel] = [];
        }
        grouped[groupLabel].push(ev);
    }

    if (loading) {
        let size = (maxItems) ? maxItems : 12
        return (
            <div className="grid grid-cols-1 md:grid-cols-3  ">
                {Array.from({ length: size }).map((_, idx) => (
                    <div className="p-1" key={idx}>
                        <Skeleton className="h-[255px] w-full " />
                    </div>
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Error loading events.</div>;
    }


    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {Object.entries(grouped).map(([label, group]) =>
                group.map((ev, idx) => (
                    <div key={ev.id} className="flex flex-col gap-2">
                        {/* Reserve space for label, even if empty */}
                        {idx === 0 ? (

                            <h2 className="text-xl font-semibold h-[28px] my-2">{label}</h2>
                        ) : (
                            <div className="h-[32px] my-2"> </div>
                        )
                        }
                        <EventCard event={ev} />
                    </div>
                ))
            )}
        </div>
    );
}

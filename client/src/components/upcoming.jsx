import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { format, isToday, isTomorrow, parseISO, differenceInCalendarDays } from "date-fns";
import { enUS } from "date-fns/locale";
import { DataContext } from '../DataProvider';
import { useContext } from 'react';
import { Skeleton } from "@/components/ui/skeleton"
import EventCard from "./eventCard";

//TODO: Limit to 3 items total not 3 groups because this can brake layout
export default function Upcoming({ maxItems }) {
    const { allEvents, loading, error } = useContext(DataContext);

    const now = new Date();

    const sortedEvents = [...allEvents]
        .map(ev => {
            const dateTimeStr = `${ev.date}T${ev.time}`;
            return {
                ...ev,
                dateObj: parseISO(dateTimeStr)
            };
        })
        .filter(ev => ev.dateObj >= now)
        .sort((a, b) => a.dateObj - b.dateObj);

    const limitedEvents = maxItems ? sortedEvents.slice(0, maxItems) : sortedEvents;

    const grouped = {};

    for (const ev of limitedEvents) {
        const daysDiff = differenceInCalendarDays(ev.dateObj, now);
        let groupLabel;

        if (isToday(ev.dateObj)) {
            groupLabel = "Today";
        } else if (isTomorrow(ev.dateObj)) {
            groupLabel = "Tomorrow";
        } else if (daysDiff <= 6) {
            groupLabel = format(ev.dateObj, "EEEE", { locale: enUS });
        } else {
            groupLabel = format(ev.dateObj, "EEEE do MMMM", { locale: enUS });
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(grouped).map(([label, group]) => {
                return (
                    <div key={label}>
                        <div className="col-span-full">
                            <h2 className="text-xl font-semibold my-2">{label}</h2>
                        </div>

                        {group.map(ev => (
                            <EventCard event={ev} key={ev.id} />
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

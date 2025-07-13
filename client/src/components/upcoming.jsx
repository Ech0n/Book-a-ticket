import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { format, isToday, isTomorrow, parseISO, differenceInCalendarDays } from "date-fns";
import { enUS } from "date-fns/locale";

//TODO: Limit to 3 items total not 3 groups because this can brake layout
export default function Upcoming({ events, maxItems }) {
    const now = new Date();

    const sortedEvents = [...events]
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

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(grouped).map(([label, group]) => {
                return (
                    <div key={label}>
                        <div className="col-span-full">
                            <h2 className="text-xl font-semibold my-2">{label}</h2>
                        </div>

                        {group.map(ev => (
                            <Card
                                key={ev.id}
                                className="rounded-2xl shadow-sm hover:shadow-md transition"
                            >
                                <CardContent className="p-4 space-y-2">
                                    <h3 className="text-lg font-medium">{ev.name}</h3>
                                    <p className="text-sm text-muted-foreground">{ev.subtitle}</p>
                                    <p className="text-sm">{ev.description}</p>
                                    <p className="text-sm font-medium text-blue-600">
                                        {format(ev.dateObj, 'PPPpp')}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                );
            })}
        </div>
    );
}

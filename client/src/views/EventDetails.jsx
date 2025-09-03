import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from '../DataProvider';
import { Button } from "@/components/ui/button"

function EventDetails() {
    const { allEvents, loading, error } = useContext(DataContext);
    const { id } = useParams();
    console.log("Event Details for id:", id);

    const event = allEvents.find(e => e.id === 2);

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
                {event ? (
                    <>
                        <h1 className="text-6xl font-bold mb-2">{event.name}</h1>
                        {event.subtitle && (
                            <h2 className="text-lg text-muted-foreground mb-4">{event.subtitle}</h2>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <span>{event.date}</span>
                            <span>{event.time}</span>
                            <span>-</span>
                            <span>{event.endDate}</span>
                            <span>{event.endTime}</span>
                        </div>
                        {event.description && (
                            <p className="text-base leading-relaxed">{event.description}</p>
                        )}
                        <Button
                            className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                            onClick={() => alert("Ticket purchase not implemented yet.")}
                        >
                            Buy Ticket
                        </Button>
                    </>
                ) : (
                    <div className="text-center text-destructive font-semibold">
                        Event not found.
                    </div>
                )}
            </div>
        </div>
    );
}

export default EventDetails;
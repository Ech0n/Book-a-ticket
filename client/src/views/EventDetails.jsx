import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DataContext } from "../DataProvider";
import { Button } from "@/components/ui/button";
import useUser from "../hooks/useUser";

function EventDetails() {
  const { allEvents, user, loading, error, userEvents } =
    useContext(DataContext);
  const { id } = useParams();
  const { addEventToUser } = useUser();

  const event = allEvents.find((e) => e.id === Number(id));
  const now = new Date();
  const date_now = now.toISOString().split("T")[0];
  const time_now = now.toTimeString().split(" ")[0];

  let isButtonDisabled = false;
  let disabledButtonMsg = "";

  if (event) {
    if (
      event.endDate < date_now ||
      (event.endDate === date_now && event.endTime < time_now)
    ) {
      isButtonDisabled = true;
      disabledButtonMsg = "Event has ended";
    } else if (!user) {
      isButtonDisabled = true;
      disabledButtonMsg = "Please log in to buy tickets";
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-8">
        {event ? (
          <>
            <h1 className="text-6xl font-bold mb-2">{event.name} </h1>
            {event.subtitle && (
              <h2 className="text-lg text-muted-foreground mb-4">
                {event.subtitle}
              </h2>
            )}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>{event.id}</span>
              <span>{event.time}</span>
              <span>-</span>
              <span>{event.endDate}</span>
              <span>{event.endTime}</span>
            </div>
            {event.description && (
              <p className="text-base leading-relaxed">{event.description}</p>
            )}
            { userEvents.some((e) => e.id === event.id) ? <Button>Return ticket</Button> : (
              <Button
                disabled={isButtonDisabled}
                className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                onClick={() => {
                  addEventToUser(user.id, event.id)
                    .then(() => alert("Ticket purchased successfully!"))
                    .catch(() => alert("Failed to purchase ticket."));
                }}
              >
                Buy Ticket
              </Button>
            )}

            <p className="text-sm text-muted-foreground">{disabledButtonMsg}</p>
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

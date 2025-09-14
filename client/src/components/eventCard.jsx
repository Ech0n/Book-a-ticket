import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { forwardRef } from "react";
import {
  format,
  parseISO,
} from "date-fns";

const EventCard = forwardRef(({ event, isFeatured = false, ...props }, ref) => {
  return (
    <Card
      ref={ref}
      {...props}
      style={
        isFeatured
          ? { backgroundColor: "#d5e0e37a", paddingBlock: "30px" }
          : {}
      }
      className={
        "cursor-pointer hover:shadow-lg transition" +
        (isFeatured ? " items-center h-full" : "")
      }
      role="button"
      tabIndex={0}
    >
      <CardHeader
        className={
          "w-full " +
          (isFeatured
            ? " items-center justify-center text-center text-2xl md:text-3xl"
            : "")
        }
      >
        <CardTitle>{event.name}</CardTitle>
        {event.subtitle && (
          <CardDescription>{event.subtitle}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-sm">{event.description}</p>
        <p className="text-sm font-medium text-blue-600">
          {format(parseISO(`${event.date}T${event.time}`), "PPPpp")}
        </p>
      </CardContent>
    </Card>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;
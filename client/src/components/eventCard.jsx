
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { format, isToday, isTomorrow, parseISO, differenceInCalendarDays } from "date-fns";
import useUser from "../hooks/useUser";
import { useContext, useEffect } from "react";
import { DataContext } from "../DataProvider";
import { Separator } from "@/components/ui/separator";
function EventCard({ event, isFeatured = false }) {
    const { user } = useContext(DataContext);
    const { addEventToUser } = useUser();

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleClick = (e) => {
        e.stopPropagation();
        if (!isDialogOpen) {
            setIsDialogOpen(true);
            console.log("Handling click")
        }
    }

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
        }
        else if (!user) {
            isButtonDisabled = true;
            disabledButtonMsg = "Please log in to buy tickets";
        }
    }

    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Card
                    style={isFeatured ? { backgroundColor: "#d5e0e37a", paddingBlock: "30px" } : {}}
                    onClick={handleClick}
                    className={"cursor-pointer hover:shadow-lg transition" + (isFeatured ? " items-center h-full" : "")}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === "Enter" && handleClick()}>

                    <CardHeader className={"w-full " + (isFeatured ? " items-center justify-center text-center text-2xl md:text-3xl" : "")}>
                        <CardTitle >{event.name}</CardTitle>
                        {event.subtitle && <CardDescription>{event.subtitle}</CardDescription>}
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">{event.description}</p>
                        <p className="text-sm font-medium text-blue-600">
                            {format(parseISO(event.date), 'PPPpp')}
                        </p>
                    </CardContent>
                </Card>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader >
                    <DialogTitle>{event.name}</DialogTitle>
                    <DialogDescription>
                        {event.subtitle}
                    </DialogDescription>
                    <p className="text-sm text-gray-500">Starts at:</p>
                    <p className="text-sm font-medium text-blue-600">
                        {format(parseISO(event.date), 'PPPpp')}
                    </p>
                    <p className="text-sm text-gray-500">Ends at:</p>
                    <p className="text-sm font-medium text-blue-600">
                        {format(parseISO(event.endDate), 'PPPpp')}
                    </p>
                    <Separator></Separator>
                    <p className="text-l mt-5">{event.description}</p>


                </DialogHeader>
                < DialogFooter className="flex flex-col sm:flex-col" >
                    <Button
                        disabled={isButtonDisabled}
                        className="mt-6 px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                        onClick={() => {
                            addEventToUser(user.id, event.id)
                                .then(() => alert("Ticket purchased successfully!"))
                                .catch(() => alert("Failed to purchase ticket."));
                        }}
                    >
                        Book a Ticket
                    </Button>
                    <p className="text-sm text-muted-foreground text-center">{disabledButtonMsg}</p>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    )
}

export default EventCard;

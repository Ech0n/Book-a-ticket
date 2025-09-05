
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogTrigger, DialogHeader, DialogFooter } from "@/components/ui/dialog"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { format, isToday, isTomorrow, parseISO, differenceInCalendarDays } from "date-fns";

function EventCard({ event, isFeatured = false }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleClick = (e) => {
        e.stopPropagation();
        if (!isDialogOpen) {
            setIsDialogOpen(true);
            console.log("Handling click")
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
                        <p className="text-sm">{event.description}</p>
                        <p className="text-sm font-medium text-blue-600">
                            {format(parseISO(event.date), 'PPPpp')}
                        </p>
                    </DialogDescription>
                </DialogHeader>
                < DialogFooter >
                    <Button onClick={() => alert("IMPLEMENT TICKET BUYING HERE")}>BOOK A TICKET</Button>
                </DialogFooter>
            </DialogContent >
        </Dialog >
    )
}

export default EventCard;

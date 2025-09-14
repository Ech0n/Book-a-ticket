import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
    DialogHeader,
    DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import {
    format,
    parseISO,
} from "date-fns";
import useUser from "../hooks/useUser";
import { useContext } from "react";
import { DataContext } from "../DataProvider";
import { Separator } from "@/components/ui/separator";

function EventDialog({
    event,
    children,
    isOpen: externalIsOpen,
    onOpenChange: externalOnOpenChange
}) {
    const { user, userEvents } = useContext(DataContext);
    const { addEventToUser, removeEventFromUser } = useUser();
    const [confirmAction, setConfirmAction] = useState(null);

    const [internalIsOpen, setInternalIsOpen] = useState(false);
    const isDialogOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
    const setIsDialogOpen = externalOnOpenChange !== undefined ? externalOnOpenChange : setInternalIsOpen;

    const handleClick = (e) => {
        e.stopPropagation();
        if (!isDialogOpen) {
            setIsDialogOpen(true);
            console.log("Handling click");
        }
    };

    const handleConfirm = async () => {
        try {
            if (confirmAction == 'buy') {
                await addEventToUser(user.id, event.id);
                alert("Ticket purchased successfully!");
            } else if (confirmAction == 'return') {
                await removeEventFromUser(user.id, event.id);
                alert("Ticket returned successfully!");
            }
        }
        catch (err) {
            alert(`Action failed. ${err}`);
        }
        finally {
            setConfirmAction(null);
        }
    }

    const handleDialogClose = () => {
        setConfirmAction(null);
        setIsDialogOpen(false);
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
        } else if (!user) {
            isButtonDisabled = true;
            disabledButtonMsg = "Please log in to buy tickets";
        }
    }

    if (confirmAction) {
        return (
            <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {confirmAction === "buy"
                                ? "Confirm Ticket Purchase"
                                : "Confirm Ticket Return"}
                        </DialogTitle>
                        <DialogDescription>
                            {confirmAction === "buy"
                                ? `Are you sure you want to buy a ticket for "${event.name}"?`
                                : `Are you sure you want to return your ticket for "${event.name}"?`}
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex justify-end gap-4">
                        <Button
                            variant="outline"
                            onClick={() => setConfirmAction(null)}
                        >
                            Cancel
                        </Button>
                        <Button onClick={handleConfirm}>Confirm</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={externalIsOpen !== undefined ? isDialogOpen : undefined} onOpenChange={externalIsOpen !== undefined ? handleDialogClose : undefined} >

            {
                (externalIsOpen == undefined) ?
                    <DialogTrigger asChild>
                        {children}
                    </DialogTrigger> : null
            }
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{event.name}</DialogTitle>
                    <DialogDescription>{event.subtitle}</DialogDescription>
                    <p className="text-sm text-gray-500">Starts at:</p>
                    <p className="text-sm font-medium text-blue-600">
                        {format(parseISO(event.date), "PPPpp")}
                    </p>
                    <p className="text-sm text-gray-500">Ends at:</p>
                    <p className="text-sm font-medium text-blue-600">
                        {format(parseISO(event.endDate), "PPPpp")}
                    </p>
                    <Separator></Separator>
                    <p className="text-l mt-5">{event.description}</p>
                </DialogHeader>
                <DialogFooter className="flex flex-col sm:flex-col">
                    {userEvents.some((e) => e.id === event.id) ? (
                        <Button
                            disabled={isButtonDisabled}
                            onClick={() => setConfirmAction("return")}
                            className="mt-6 px-6 py-3 cursor-pointer bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                        >
                            Return ticket
                        </Button>
                    ) : (
                        <Button
                            disabled={isButtonDisabled}
                            className="mt-6 px-6 py-3 cursor-pointer bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                            onClick={() => setConfirmAction("buy")}
                        >
                            Buy Ticket
                        </Button>
                    )}
                    <p className="text-sm text-muted-foreground text-center">
                        {disabledButtonMsg}
                    </p>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}

export default EventDialog;

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
function Featured({ events }) {
    console.log(events)
    return <>
        <Carousel>
            <CarouselContent>
                {events.map((event) => (
                    <CarouselItem key={event.id} className="basis-1/1">
                        <Card>
                            <CardHeader>
                                <CardTitle>{event.name}</CardTitle>
                                {event.subtitle && <CardDescription>{event.subtitle}</CardDescription>}
                                <div className="text-sm text-muted-foreground">
                                    {event.date && <span>Kiedy: {event.date}</span>}
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p>{event.description}</p>
                            </CardContent>
                            <CardFooter>
                                <Button asChild>
                                    <Link href={`/events/${event.id}`}>View Details</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </>
}

export default Featured;
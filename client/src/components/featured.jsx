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
import Autoplay from "embla-carousel-autoplay"
import DataProvider, { DataContext } from '../DataProvider';
import React, { useContext } from 'react';
import { Skeleton } from "@/components/ui/Skeleton"


function Featured() {

    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    )
    const { featuredEvents, loading, error } = useContext(DataContext);
    if (loading) {
        return (
            <div className="p-1" >
                <Skeleton className="h-[255px] w-full " />
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500">Error loading events.</div>;
    }

    return <>
        <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.play}>
            <CarouselContent>
                {featuredEvents.map((event) => (
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
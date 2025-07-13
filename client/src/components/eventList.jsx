
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { DataContext } from '../DataProvider';
import { useContext } from 'react';
import { Skeleton } from "@/components/ui/Skeleton"

function EventList() {
    const { allEvents, loading, error } = useContext(DataContext);

    const ITEMS_PER_PAGE = 6;
    const [page, setPage] = useState(1);

    const totalPages = Math.ceil(allEvents.length / ITEMS_PER_PAGE);
    const paginatedEvents = allEvents.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3  ">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
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
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paginatedEvents.map((event) => (
                    <Card key={event.id}>
                        <CardHeader>
                            <CardTitle>{event.name}</CardTitle>
                            {event.subtitle && <CardDescription>{event.subtitle}</CardDescription>}
                            <div className="text-muted-foreground text-sm">
                                {event.date && <span>Kiedy: {event.date}</span>}
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{event.description}</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild>
                                <Link to={`/events/${event.id}`}>View Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious
                            onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                        />
                    </PaginationItem>
                    {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                            <PaginationLink
                                isActive={page === i + 1}
                                onClick={() => setPage(i + 1)}
                            >
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                            disabled={page === totalPages}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

export default EventList;
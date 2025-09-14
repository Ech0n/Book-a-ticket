import { useState } from "react";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { DataContext } from '../DataProvider';
import { useContext } from 'react';
import EventCard from "@/components/eventCard";
import { Skeleton } from "@/components/ui/skeleton"
import EventDialog from "./eventDialog";

function EventList({ rows = "2" }) {
    const { allEvents, loading, error } = useContext(DataContext);

    const PAGE_NUMBERS_TO_SHOW = 5;
    rows = parseInt(rows);
    const ITEMS_PER_PAGE = rows * 3;
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
        return <div className="text-red-500">Error loading events.<p> {error}</p></div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                {paginatedEvents.map((event) => (
                    <EventDialog key={event.id} event={event} >
                        <EventCard event={event} isFeatured={false} />
                    </EventDialog>
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
                    {[...Array(totalPages)].slice(0, PAGE_NUMBERS_TO_SHOW).map((_, i) => (
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
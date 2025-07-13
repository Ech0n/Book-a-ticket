import React from 'react';
import { Calendar as RBC, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useState } from 'react';

const locales = {
    'en-US': enUS,
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

export default function Calendar(props) {
    const { events, toolbar } = props;
    const mappedEvents = events.map(ev => {
        const [year, month, day] = ev.date.split('-').map(Number);
        const [hours, minutes] = ev.time.split(':').map(Number);

        const start = new Date(year, month - 1, day, hours, minutes);

        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

        return {
            id: ev.id,
            title: ev.name,
            start,
            end,
            subtitle: ev.subtitle,
            description: ev.description,
        };
    });
    const isToolbarVisible = (toolbar == undefined) ? true : toolbar
    const [date, setDate] = useState(new Date());
    return (
        <div style={{ height: 600, margin: '20px' }}>
            <RBC
                localizer={localizer}
                events={mappedEvents}
                defaultView="month"
                views={['month']}
                startAccessor="start"
                date={date}
                endAccessor="end"
                toolbar={isToolbarVisible}
                style={{ height: '100%' }}
                onNavigate={(date, view) => {
                    setDate(new Date(date));
                }}
            />
        </div>
    );
}

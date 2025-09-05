import React, { createContext } from 'react';

export const DataContext = createContext();

export default class DataProvider extends React.Component {
    state = {
        allEvents: [],
        featuredEvents: [],
        loading: true,
        error: null,
        user: null,
    };

    componentDidMount() {
        this.fetchData();
        this.fetchUser();
    }

    async fetchUser() {
        this.setState({ loading: true, error: null });

        try {
            const res = await fetch('/api/users/me', {
                credentials: 'include' });
            if (res.status === 401) {
                this.setState({ user: null, loading: false });
                return;
            }
            if (!res.ok) {
                throw new Error('Failed to fetch user');
            }
            const user = await res.json();
            this.setState({ user, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }

    async fetchData() {
        this.setState({ loading: true, error: null });

        try {
            const [allRes, featuredRes] = await Promise.all([
                fetch('/api/events'),
                fetch('/api/events/featured'),
            ]);

            if (!allRes.ok || !featuredRes.ok) {
                throw new Error('Failed to fetch data');
            }

            const [allEvents, featuredEventsRaw] = await Promise.all([
                allRes.json(),
                featuredRes.json(),
            ]);

            const featuredEvents = featuredEventsRaw.map(data => data["event"])

            this.setState({ allEvents, featuredEvents, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }

    async fetchEventById(eventId) {
        // TODO CHECK ID DATA ABOUT EVENT IS LOADED ALREADY IF IT IS NOT LOAD IT THAN
        this.setState({ loading: true, error: null });
        try {
            const res = await fetch(`/api/events/${eventId}`);
            if (!res.ok) {
                throw new Error('Failed to fetch event');
            }
            const event = await res.json();
            this.setState({ loading: false });
            return event;
        } catch (error) {
            this.setState({ error: error.message, loading: false });
            return null;
        }
    }

    render() {
        const { children } = this.props;
        return (
            <DataContext.Provider value={{ ...this.state, setUser: (user) => this.setState({ user }) }}>
                {children}
            </DataContext.Provider>
        );
    }
}
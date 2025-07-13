import React, { createContext } from 'react';

export const DataContext = createContext();

export default class DataProvider extends React.Component {
    state = {
        allEvents: [],
        featuredEvents: [],
        loading: true,
        error: null,
    };

    componentDidMount() {
        this.fetchData();
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

            const [allEvents, featuredEvents] = await Promise.all([
                allRes.json(),
                featuredRes.json(),
            ]);

            this.setState({ allEvents, featuredEvents, loading: false });
        } catch (error) {
            this.setState({ error: error.message, loading: false });
        }
    }

    render() {
        const { children } = this.props;
        return (
            <DataContext.Provider value={this.state}>
                {children}
            </DataContext.Provider>
        );
    }
}
import { defineStore } from 'pinia'
import { getTickets } from '../api/apiTickets';

export const useTicketsStore = defineStore('tickets', {
    state: () => ({
        tickets: [],
        filterAirportsOrigin: [],
        filterAirportsDestination: [],
        filterAirlines: [],
        filterMinPrice: null,
        filterMaxPrice: null
    }),
    getters: {
        getTicketsAll(state) {
            return state.tickets;
        },
        getTicketsFiltered(state) {
            return () => {
                let tickets = state.tickets;
                if (state.filterAirportsOrigin.length > 0) {
                    tickets = tickets.filter(ticket => {
                        return state.filterAirportsOrigin.some(airport => airport === ticket.origin_airport);
                    });
                }
                if (state.filterAirportsDestination.length > 0) {
                    tickets = tickets.filter(ticket => {
                        return state.filterAirportsDestination.some(airport => airport === ticket.destination_airport);
                    });
                }
                if (state.filterAirlines.length > 0) {
                    tickets = tickets.filter(ticket => {
                        return state.filterAirlines.some(airport => airport === ticket.airline);
                    });
                }
                if (state.filterMinPrice) {
                    tickets = tickets.filter(ticket => ticket.price >= state.filterMinPrice);
                }
                if (state.filterMaxPrice) {
                    tickets = tickets.filter(ticket => ticket.price <= state.filterMaxPrice);
                }
                return tickets;
            }
        },
        getAirportsByOrigin(state) {
            return () => {
                const airports = new Set();
                state.tickets.forEach(ticket => airports.add(ticket.origin_airport));
                return Array.from(airports);
            }
        },
        getAirportsByDestination(state) {
            return () => {
                const airports = new Set();
                state.tickets.forEach(ticket => airports.add(ticket.destination_airport));
                return Array.from(airports);
            }
        },
        getAirlinesFromTickets(state) {
            return () => {
                const airlines = new Set();
                state.tickets.forEach(ticket => airlines.add(ticket.airline));
                return Array.from(airlines);
            }
        },
        getMaxPriceTickets(state) {
            return () => {
                let maxPrice = 0;
                state.tickets.forEach(ticket => {
                    if (ticket.price > maxPrice) {
                        maxPrice = ticket.price;
                    }
                })
                return maxPrice
            }
        },
        getMinPriceTickets(state) {
            return () => {
                let minPrice = 1000000000000;
                state.tickets.forEach(ticket => {
                    if (ticket.price < minPrice) {
                        minPrice = ticket.price;
                    }
                })
                return minPrice
            }
        }
    },
    actions: {
        setFilterAirportsOrigin(payload) {
            this.filterAirportsOrigin = payload;
        },
        setFilterAirportsDestination(payload) {
            this.filterAirportsDestination = payload;
        },
        setFilterAirlines(payload) {
            this.filterAirlines = payload;
        },
        setFilterMinPrice(value) {
            this.filterMinPrice = value
        },
        setFilterMaxPrice(value) {
            this.filterMaxPrice = value
        },
        async getTicketsFromApi(payload) {
            if (!payload || typeof payload !== 'object') {
                throw new Error('Неверно переданные данные');
            }

            const { token, origin, destination, oneWay } = payload;

            if (!token || !origin || !destination) {
                throw new Error('Выберите города из выпадающего списка');
            }

            const data = await getTickets({ token, origin, destination, oneWay });
            this.tickets = data;
        }
    }
})
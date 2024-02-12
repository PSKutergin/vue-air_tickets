import { defineStore } from 'pinia'
import { getAirports } from '../api/apiTickets';

export const useAirportsStore = defineStore('airports', {
    state: () => ({
        airports: []
    }),
    getters: {
        getAirportsAll(state) {
            return state.airports;
        },
        getAirportByCode(state) {
            return (code) => state.airports.find(airport => airport.code === code).name;
        }
    },
    actions: {
        async getAirportsFromApi() {
            const data = await getAirports();
            this.airports = data.map((airport, index) => ({
                id: index,
                name: airport.name,
                code: airport.code
            }));
        }
    }
})
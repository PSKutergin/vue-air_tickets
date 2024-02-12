import { defineStore } from 'pinia'
import { getAirlines } from '../api/apiTickets';

export const useAirlinesStore = defineStore('airlines', {
    state: () => ({
        airlines: []
    }),
    getters: {
        getAirlinesAll(state) {
            return state.airlines;
        },
        getAirlineByCode(state) {
            return (code) => state.airlines.find(airline => airline.code === code).name;
        }
    },
    actions: {
        async getAirlinesFromApi() {
            const data = await getAirlines();
            this.airlines = data.map((airline, index) => ({
                id: index,
                name: airline.name,
                code: airline.code
            }));
        }
    }
})
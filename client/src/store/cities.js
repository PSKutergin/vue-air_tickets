import { defineStore } from 'pinia'
import { getCities } from '../api/apiTickets';

export const useCitiesStore = defineStore('cities', {
    state: () => ({
        cities: []
    }),
    getters: {
        getCitiesAll(state) {
            return state.cities;
        },
        getCityByCode(state) {
            return (code) => state.cities.find(city => city.code === code).name;
        }
    },
    actions: {
        async getCitiesFromApi() {
            const data = await getCities();
            this.cities = data.map((city, index) => ({
                id: index,
                name: city.name,
                code: city.code
            }));
        }
    }
})
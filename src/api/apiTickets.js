import axios from "axios"

const BASE_URL = import.meta.env.VITE_BASE_API_URL
const API_KEY = import.meta.env.VITE_API_KEY

export const getTickets = async () => {
    try {
        const response = await fetch(`${BASE_URL}`, {
            method: 'GET',
            headers: {
                'X-Access-Token': API_KEY
            }
        })

        console.log(response.data);
    } catch (error) {
        console.log(error)
    }
}
export const getTickets = async ({ token, origin, destination, oneWay }) => {
    try {
        const url = new URL(`http://localhost:3000/api/tickets`);
        url.searchParams.append('origin', origin);
        url.searchParams.append('destination', destination);
        url.searchParams.append('one_way', oneWay);
        url.searchParams.append('token', token);

        const res = await fetch(url.toString());
        const data = await res.json();

        return data.data;
    } catch (error) {
        console.error(error);
    }
}

export const getCities = async () => {
    try {
        const url = new URL(`http://localhost:3000/api/cities`);
        const res = await fetch(url);
        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getAirports = async () => {
    try {
        const url = new URL(`http://localhost:3000/api/airports`);
        const res = await fetch(url);
        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}

export const getAirlines = async () => {
    try {
        const url = new URL(`http://localhost:3000/api/airlines`);
        const res = await fetch(url);
        const data = await res.json();

        return data;
    } catch (error) {
        console.error(error);
    }
}
export class ApiHelper {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }

    async post(endpoint, data) {
        const url = `${this.baseURL}${endpoint}`;
        const options = {
            mode:  'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch(url, options);
            if (response.status === 401) {
                logout();
            }
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation');
        }
    }

    async get(endpoint) {
        const url = `${this.baseURL}${endpoint}`;
        const options = {
            mode:  'cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${sessionStorage.getItem("id_token")}`
            }
        }

        try {
            const response = await fetch(url, options);
            if (response.status === 401) {
                logout();
            }
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('There was a problem with the fetch operation');
        }
    }

}
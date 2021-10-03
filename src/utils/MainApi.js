class MainApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    async register(name, email, password) {
        const res = await fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        });

        return this._getResponse(res);
    }

    async login(email, password) {
        const res = await fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        });

        return this._getResponse(res);
    }

    async logout() {
        const res = await fetch(`${this._baseUrl}/signout`, {
            method: 'DELETE',
            credentials: 'include',
        });

        return this._getResponse(res);
    }

    async getUser() {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
        });

        return this._getResponse(res);
    }

    async changeUserInfo(email, name) {
        const res = await fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                name
            }),
        });

        return this._getResponse(res);
    }

    async getSavedMovies() {
        const res = await fetch(`${this._baseUrl}/movies`, {
            credentials: 'include',
        });

        return this._getResponse(res);
    }

    async createMovie(
        country,
        description,
        director,
        duration,
        movieId,
        image,
        nameEN,
        nameRU,
        trailer,
        year,
        thumbnail,
    ) {
        const res = await fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country,
                description,
                director,
                duration,
                movieId,
                image,
                nameEN,
                nameRU,
                trailer,
                year,
                thumbnail,
            }),
        });

        return this._getResponse(res);
    }

    async deleteMovie(movieId) {
        const res = await fetch(`${this._baseUrl}/movies/${movieId}`, {
            method: 'DELETE',
            credentials: 'include',
        });

        return this._getResponse(res);
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res);
    }
}

const mainApi = new MainApi('https://api.domain404.nomoredomains.club');
// const mainApi = new MainApi('http://localhost:8000');

export default mainApi;

class MovieApi {
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    async getMovies() {
        const res = await fetch(`${this._baseUrl}`);

        return this._getResponse(res);
    }

    _getResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res.status}`);
    }
}

const movieApi = new MovieApi(
    'https://api.nomoreparties.co/beatfilm-movies'
);

export default movieApi;

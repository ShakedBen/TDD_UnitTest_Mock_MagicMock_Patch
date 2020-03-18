const fetch = require('node-fetch')

export class DovMusic {
    constructor(apiKey) {
        this.apiKey = apiKey
    }

    async fetchData(method, artist) {
        const baseUrl  = 'https://ws.audioscrobbler.com/2.0/?format=json'
        const apiUrl   = `api_key=${this.apiKey}`
        let result
        const response = await fetch(`${baseUrl}&method=${method}&artist=${artist}&${apiUrl}`)
        result         = await response.json()
        return result.error ? undefined : result
    }

    async getArtistInfo(artist) {
        //Returns an object with the artist data from the db
        let result = await this.fetchData('artist.getinfo', artist)
        return result[artist]
    }

    async getTopArtists() {
        //Returns an array of the current top artists from the db
        let result     = await this.fetchData('chart.getTopArtists')
        let topArtists = []
        result.artists.artist.forEach(curArtist => {
            topArtists.push(curArtist.name)
        })
        return topArtists
    }

    async getTopTracks(artist) {
        //Return an array of top tracks of the artist from the db
        let result     = await this.fetchData('artist.getTopTracks', artist)
        let trackNames = []
        if (result) {
            result.toptracks.track.forEach(song => {
                trackNames.push(song.name)
            })
            return trackNames
        }
        return undefined
    }

    async getSimilar(artist) {
        //Returns an object with the similar artists from the db
        let result = await this.fetchData('artist.getSimilar', artist)
        return result ? result.similarartists.artist : undefined
    }

    async commonSongNames(artist) {
        //Returns an array containing songs with the same name of the artist and similar artists
        const artistTopTracks = await this.getTopTracks(artist)
        const similarArtists  = await this.getSimilar(artist)
        if (similarArtists === undefined) {
            return undefined
        }
        let similarDB = []

        for (const curArtist of similarArtists) {
            const curTopTracks = await this.getTopTracks(curArtist.name)
            for (const curTrack of curTopTracks) {
                if (artistTopTracks.includes(curTrack)) {
                    similarDB.push({
                        song:   curTrack,
                        artist: curArtist.name,
                    })
                }
            }
        }
        return similarDB
    }

    async artistInChart(artist) {
        //Returns a boolean if the artist is in the current top artists
        let curTopArtists = await this.getTopArtists()
        return !!curTopArtists.includes(artist)
    }
}


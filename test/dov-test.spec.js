import {DovMusic} from '../src/DovMusic'
import {expect}   from 'chai'

const dbStub = {
    'artist.getinfo':      {
        'artist': {
            'muse': {
                'url':       'https://www.last.fm/music/Muse',
                'summary':   'Muse are an alternative rock band from Teignmouth, England, United Kingdom.',
                'similar':   'radiohead',
                'toptracks': ['track1', 'track2', 'track3'],
            },
        },
    },
    'chart.getTopArtists': {
        artists: {
            artist: [
                {
                    name: 'radiohead',
                },
                {
                    name: 'muse',
                },
                {
                    name: 'beyonce',
                },
            ],
        },
    },
    'artist.getSimilar':   {
        'muse':    {
            similarartists: {
                artist: [
                    {
                        name: 'radiohead',
                    },
                ],
            },
        },
        'beyonce': {
            similarartists: {
                artist: [
                    {
                        name: 'radiohead',
                    }, {
                        name: 'muse',
                    },
                ],
            },
        },
    },
    'artist.getTopTracks': {
        'muse':      {
            'toptracks': {
                'track': [
                    {
                        name: 'creep',
                    },
                    {
                        name: 'starlight',
                    },
                ],
            },
        },
        'radiohead': {
            'toptracks': {
                'track': [
                    {
                        name: 'creep',
                    },
                ],
            },
        },
        'beyonce':   {
            'toptracks': {
                'track': [
                    {
                        name: 'girls',
                    },
                    {
                        name: 'jay-z',
                    },
                ],
            },
        },
    },
}

class DovMusicMock extends DovMusic {

    async superFetchData(method, artist = false) {
        return super.fetchData(method, artist = false)
    }

    async fetchData(method, artist = false) {
        //Returns a promise of the ajax request to the data base
        if (artist) {
            return new Promise((res) => {
                if (method === 'artist.getSimilar' || method === 'artist.getTopTracks') {
                    res(dbStub[method][artist])
                } else {
                    res(dbStub[method]['artist'])
                }
            })
        }
        return new Promise((res) => {
            res(dbStub[method])
        })
    }
}

let mock
beforeEach(() => {
    mock = new DovMusicMock('123')
})

describe('Dov Music', () => {
    describe('Unit Level', () => {
        describe('#fetchData', function () {
            it('can fetch data by kind of data and a valid input', async () => {
                expect(await mock.fetchData('artist.getinfo', 'muse')).to.be.eql(dbStub['artist.getinfo']['artist'])
            })

            it('returns undefined when kind of data is not found', async () => {
                expect(await mock.fetchData('nonExistent')).to.be.undefined
            })

            it('returns object when kind of data exists but the input is not', async () => {
                expect(await mock.fetchData('artist.getinfo', 'nonExistent')).to.be.an('object')
            })

            it('gets response when making a real request to the api', async () => {
                expect(await mock.superFetchData('nonExistent')).to.be.undefined
            })
        })

        describe('#getArtistInfo', function () {
            it('retrieves information about an artist that exists', async () => {
                expect(await mock.getArtistInfo('muse')).to.be.eql(dbStub['artist.getinfo']['artist'].muse)
            })

            it('returns undefined for an artist that doesn\'nt exist', async () => {
                expect(await mock.getArtistInfo('null')).to.be.undefined
            })
        })

        describe('#getTopArtists', function () {
            it('returns the current artists in the top chart', async () => {
                expect(await mock.getTopArtists()).to.be.eql(['radiohead', 'muse', 'beyonce'])
            })
        })

        describe('#getTopTracks', function () {
            it('returns top tracks of artist', async () => {
                expect(await mock.getTopTracks('muse')).to.be.eql(['creep', 'starlight'])
            })

            it('returns undefined for artists that dont exist', async () => {
                expect(await mock.getTopTracks('nonExistent')).to.be.undefined
            })
        })

        describe('#getSimilar', function () {
            it('returns similar artists of artist', async () => {
                expect(await mock.getSimilar('muse')).to.be.eql([{name: 'radiohead'}])
            })

            it('returns undefined for artist that doesn\'nt exist', async () => {
                expect(await mock.getSimilar('nonExistent')).to.be.undefined
            })
        })
    })

    describe('Feature Level', () => {
        describe('#commonSongNames', () => {
            it('returns an array of song names that other artists share', async () => {
                expect(await mock.commonSongNames('muse')).to.be.eql([{song: 'creep', artist: 'radiohead'}])
            })

            it('returns an empty array when artist doen\'nt exist', async () => {
                expect(await mock.commonSongNames('nonExistent')).to.be.undefined
            })
        })

        describe('#artistInChart', () => {
            it('returns true when artist is in top charts', async () => {
                expect(await mock.artistInChart('radiohead')).to.be.true
            })

            it('returns false when artist is not in top charts', async () => {
                expect(await mock.artistInChart('kanye west')).to.be.false
            })
        })
    })
})

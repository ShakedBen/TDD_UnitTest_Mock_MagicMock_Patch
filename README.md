#### [Coverage](coverage)

### Install all dependencies 
npm install
### Run tests
npm run test
### Build - transpile the src files to dist folder 
npm run build
### Start - runs the files in the dist folder
npm run start 
## Coverage - show test coverage report 
npm run coverage
### Readme convert - convert the markdown reade file to html
npm run MDhtml

## Once pushed TraviCI runs tests, coverage report and the linter configuration.

# DovMusic:
Allows the user to get the current top artists, get info about an artist, get artist top tracks and more.
Implements last.fm api to acquire and manipulate data from the last.fm database using AJAX calls.

## Features and methods:

## getArtistInfo:
 allows to enter an artist’s name and shows the artist’s info from the data base. Includes biography , top tracks, similar artists and more.

## getSimilar: 
allows to enter an artist’s name and shows all the  similar artists.

## getTopTracks: 
allows to enter an artist’s name and get the top tracks by an artist on Last.fm, orderd by popularity.

## getTopArtists: 
showing the top artists currently in the chart.

## commonSongsName: 
allows to enter an artist’s name and find similar artists and their songs that have the same name as a song of the given artist. 

## artistInChart: 
allows to enter and artist’s name and shows if the artist is in the top chart or not .

## Description of the features and the API used :
## Last.fm API:
The Last.fm API allows anyone to build their own programs using Last.fm data, whether they are on the web, the desktop or mobile devices.
The Last.fm API allows you to call methods that respond in REST style xml.
The API root URL is located at: http://ws.audioscrobbler.com/2.0/ 
We will send a method parameter expressed as 'package.method' along with method specific arguments to the root URL.
The API supports multiple transport formats but will respond in Last. fm idiom xml by default.

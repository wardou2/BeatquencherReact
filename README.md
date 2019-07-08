# Beatquencher
![Example of sequencer](https://raw.githubusercontent.com/wardou2/BeatquencherReact/master/public/images/sequencer-example.png)

Welcome to the Beatquencher React JS front end. This contains the web facing components supplied by [this](https://github.com/wardou2/BeatquencherRails "Beatquencher Rails") repo, the Ruby on Rails back end for this project. Set up the Rails repo before continuing here.

This was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview
Beatquencher is a music sequencer featuring fully functional sound synthesis, courtesy of the Tone JS package. It includes the ability to create and manage projects with multiple *scenes*, or subsections of a project. For example, a project might have a verse scene and a chorus scene. Each instrument in a project has a laundry list of settings that can be tweaked and modded to your heart's desire.

## Getting Started
* First, follow the Readme for the [back end](https://github.com/wardou2/BeatquencherRails "Beatquencher Rails")
* Clone this repo and run `npm install`
* Open `api_url.js` and change the const BASE_URL to the url of your Rails backend. By default this will be `http://localhost:3000/api/v1/`
* Make sure your Rails backend server is running. If it isn't, navigate to that directory in another terminal window and run `rails s`.
* Run `npm start` to load up the server
* You should be rerouted to the '/login' route. Log in with your Google account.
* That should do it! You're ready to start making music. 

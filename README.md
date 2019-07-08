# Beatquencher
![Example of sequencer](https://raw.githubusercontent.com/wardou2/BeatquencherReact/master/public/images/sequencer-example.png)

Welcome to the Beatquencher React JS front end. This contains the web facing components supplied by [this](https://github.com/wardou2/BeatquencherRails "Beatquencher Rails") repo, the Ruby on Rails back end for this project. Set up the Rails repo before continuing here.

This was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Overview
Beatquencher is a music sequencer featuring fully functional sound synthesis, courtesy of the Tone JS package. It includes the ability to create and manage projects with multiple *scenes*, or subsections of a project. For example, a project might have a verse scene and a chorus scene. Each instrument in a project has a laundry list of settings that can be tweaked and modded to your heart's desire.

## Installation
* First, follow the Readme for the [back end](https://github.com/wardou2/BeatquencherRails "Beatquencher Rails")
* Clone this repo and run `npm install`
* Open `api_url.js` and change the const BASE_URL to the url of your Rails backend. By default this will be `http://localhost:3000/api/v1/`
* Make sure your Rails backend server is running. If it isn't, navigate to that directory in another terminal window and run `rails s`.
* Run `npm start` to load up the server
* You should be rerouted to the '/login' route. Log in with your Google account.
* That should do it! You're ready to start making music.

## Using the App
This app is organized around Projects. A User can have many Projects, and each project can contain many Scenes. A Scene is like a section of a song, for example a chorus or a verse. Once you have created a project and have selected a scene to work on, you'll enter the Sequencer page of the app. This is where the music gets made:
![Marked Up Sequencer](https://raw.githubusercontent.com/wardou2/BeatquencherReact/master/public/images/sequencer-markedup.png)
1. Instrument Track: This section denotes the instrument track. In this example, the box highlights the Bass Drum track. Clicking on the name of the instrument pulls up a control panel for this instrument on the bottom of the page. More on that later.
2. Sequencer: This section contains the 16-note grid that will be played. The app loops over this section from left to right. If a cell is selected, that instrument is played when the loop passes over it.
3. An individual cell. For the drum instruments, simply click on these to toggle them on and off. For melodic instruments, clicking on the cell loads a modal that lets the user select which note(s) to play.

When an instrument is selected, its control panel is rendered at the bottom of the page:
![Control Panel Example](https://raw.githubusercontent.com/wardou2/BeatquencherReact/master/public/images/controls-example.png)
In this example, we know the Polysynth is selected by the highlight on the Instrument Track. Each instrument has unique controls which allow the user maximum creative flexibility. 

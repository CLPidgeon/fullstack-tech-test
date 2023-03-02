Last updated 02/03/2022

# Full Stack Tech Test

## Overview

- A simple API with two endpoints:
  1. /time - this gets the time in epoch format
  2. /metrics - this get the Prometheus metrics
- A front end to display the data from the two endpoints
- Each endpoint is called every 30 seconds
- There is also a counter display showing the difference between the current time and server time
- If there is a delay in loading the data a Loading... screen appears
- If there is an issue with the API then an error message is displayed, e.g. 403 You need to be authorized to use this API

### Prerequisites

You have npm and node installed

### Quick Start Guide

- Clone the GitHub repo - the easiest way is to click the green Code button and selecting `Download ZIP`
- Unzip the folder and open the command line in the root folder by typing `cmd` in the address bar (or press Alt+D) and pressing enter
- To install the dependencies for both api and app by cd'ing into each folder and runing the command `npm install`
- To run type the command `npm start` in each folder
- api will run on port `8080`
- app will run on port `3000`
- http://localhost:3000/ should open in your browser automatically, if not navigate to the page

## Installing NPM and Node

[NPM docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

[Node docs](https://nodejs.org/en/#home-downloadhead)

## Future Improvements

- Testing
- Adding hours / minutes / seconds to the counter
- Styling the metrics to be more user friendly

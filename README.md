# ABODE
## Fall 2019 CIS 550 Final Project

### Project Group Members

| Name          | PennKey  | GitHub        |
| ------------- | -------- | ------------- |
| Josh Doman    | joshdo   | @joshdoman    |
| Arnav Jagasia | jagasiaa | @arnavjagasia |
| Jake Goldman  | goja     | @jakepgoldman |
| James Xue     | jamesxue | @jameskxue    |
TA: Shilpi Bose

## Overview of the CIS550Project
__Project Description__

At Penn, it is common for students to move to two places after
graduation: New York City or San Francisco. We set out on a mission
to prove there are many other places in the United States for you to live.

`Abode` lets a user determine which locations in the United States best fit one's
preferences. Currently, `Abode` allows for searches based on housing, employment,
poverty, crime, and education data at a variety of geographical levels.

The home-page "simple search" lets the user run searches based on predefined
traits. The "advanced search" lets the user use a series of sliders to indicate
their relative preferences and incorporate four years of housing data. Depending
on the geographical level indicated, `Abode` will either return the top three
matches across the nation or return the best match in each state (where data for
the selected attribute(s) is available).

__Tech Stack__
* Database: SQL (Oracle on AWS)
* Backend Server: Python, Flask
* Frontend: ReactJS
  * Open-Source Components: Leaflet, Reactstrap, MaterialUI
* Package Manager: npm

* Web-App and Package structure initialized with Facebook's `Create-React-App`

## Repository Structure
### Directories
* `clean_data`: Clean data files that are in the oracle database
* `my-app`: Source code for the web-app
  * `app`: backend-server
  * `src`: front-end code
* `node-modules`: Packages for the web-app

### Files
* `BasicQueries.sql`: SQL Queries submitted for Milestone 2
* `package-lock.json` and `package.json`: Dependencies for web-app
* `requirements.txt`: Dependencies for python Flask server
* `server.py`: Python Flask Server


## Instructions to Run
* To run the backend end sever, make sure you have the Oracle Client installed.
  Start the server by running `python connect_todb.py run server` in `my-app/app`
* To run the front end server, run `npm start` in `my-app`

## Extra Credit Accomplished
* Use of AWS for hosting the Oracle Database
* Sophisticated web database technology (React + Node + Flask Server + Oracle)
* Map-based data visualization using Leaflet and React (housing filters data)

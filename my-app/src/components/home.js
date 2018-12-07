import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "./navigation";
import Predefined from "./predefined"
import SearchCard from "./homeComponents/searchCard";
import "../styles/home.css";
// import route from react router

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="search-card-container">
            <SearchCard />
        </div>
        {/*<div className="home-caption text-center">
          <h1 align="center"> Abode </h1>
          <h4 align="center"> Arnav Jagasia, Jake Goldman, James Xue, Josh Doman </h4>
          <p>
            At Penn, it is common for students to move to two places after
            graduation: New York City or San Francisco. We set out on a mission
            to prove there are many other places in the United States for you to live.
          </p>
        </div> */}
      </div>
    );
  }
}

export default Home;

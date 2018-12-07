import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import Navigation from "./navigation";
import Predefined from "./predefined"
import SearchCard from "./homeComponents/searchCard";
import About from "./homeComponents/about";
import "../styles/home.css";
// import route from react router

class Home extends Component {
  render() {
    return (
      <div>
        <div className="home">
          <div className="search-card-container">
              <SearchCard />
          </div>
        </div>
        <div className="about">
                <About />
        </div>
      </div>
    );
  }
}

export default Home;

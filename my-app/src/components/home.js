import React, { Component } from "react";
import SearchCard from "./homeComponents/searchCard";
import About from "./homeComponents/about";
import Navigation from "./navigation";
import "../styles/home.css";
// import route from react router

class Home extends Component {
  render() {
    return (
      <div className="scroll">
        <div className="page">
          <Navigation />
          <div className="home">
            <div className="search-card-container">
              <SearchCard />
            </div>
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

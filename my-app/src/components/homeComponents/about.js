import React from 'react';
import { Jumbotron } from 'reactstrap';
import '../../styles/home.css'

class About extends React.Component {
  render() {
    return (
      <div className="text-center">
        <Jumbotron className="about-jumbo">
          <h1 className="display-3">Abode</h1>
          <p className="lead">Arnav Jagasia, Jake Goldman, James Xue, Josh Doman</p>
          <hr className="my-2" />
          <p>At Penn, it is common for students to move to two places after
          graduation: New York City or San Francisco. We set out on a mission
          to prove there are many other places in the United States for you to live.</p>
        </Jumbotron>
      </div>
    );
  }
}

export default About;

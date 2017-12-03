import React, { Component } from 'react';

export default class HomePage extends Component{
  constructor() {
    super();
    this.state = {
      image: 'paris.jpg'
    };
    this.carousel;
  }

  componentDidMount(){
    const theHP = this;
    const images = ['paris.jpg', 'iceland.jpg', 'hiking.jpg', 'nyc.jpg'];
    let counter = 0;

    this.carousel = setInterval(() => {
      counter = (counter + 1) % (images.length);
      theHP.setState({
        image: images[counter]
      });
    }, 5000);
  }

  componentWillUnmount(){
    clearInterval(this.carousel)
  }

  render(){
    return (
      <div className="whole-homepage">
        <div className="carousel-container">
            <div id="carousel-text">
              <h1 className="hp-header"><strong>tripHub</strong></h1>
              <button className="btn login-btn black" onClick={this.props.login}>Log In</button>
            </div>
            <img className="carousel-image" src={this.state.image} />
        </div>
        <div className="triphub-intro">
          <h3><i>Welcome to rote</i></h3>
          <p> rote is a web app that facilitates repetitive learning for more efficient studying. 
            
          </p>

          
          <div className="feature-desc">
            <h4>Chat</h4>
            <p>Take advantage of the real-time chat to plan with your friends and Buddy Bot, who can help by searching for places and things to do, pinning ideas, and adding events to your itinerary.</p>
            <img src="chat.png" />
          </div>
          <div className="feature-desc">
            <h4>Pins</h4>
            <p>Use the pin board to keep everyone in the trip up to speed on potential ideas. The 'liking' functionality allows you to see which options are most popular with ease.</p>
            <img src="pinboard.png" />
          </div>
          <div className="feature-desc">
            <h4>Itinerary</h4>
            <p>Everyone in a group can add to the itinerary using a simple form. Feeling lazy? Tell Buddy Bot what you want to do and see the plans being built in real-time.</p>
            <img src="itinerary.png" />
          </div>
        </div>
        <footer className="homepage-footer">
          <div className="footer-names">
              <p>Annelise Thorsen</p>
              <p>April Rueb</p>
              <p>Caryn McCarthy</p>
              <p>Ella Pitassi</p>
          </div>
          <a href="https://github.com/aprilrueb/triphub">GitHub</a>
        </footer>
      </div>
    );
  }
}
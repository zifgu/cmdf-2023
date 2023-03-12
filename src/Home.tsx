import React, {useState} from 'react';
import Spline from "@splinetool/react-spline";
import './Home.css';

export function Home() {
    return (
        <div className='Home'>
            <head>
                <h1>Home</h1>
                <link rel="Home" href='Home.css'/>
            </head>
            <div className='intro'>
                <h1>HOME</h1>
                &nbsp;
                <p>Hi there! Welcome to our home page! You are welcome to navigate through 3 islands and participate in conversations
                    with an AI in each of the island that gives personalized affirmations based on your problems!
                </p>
            </div>
            <div className='island'>
                <h3>Beach</h3>
                <h3>Forest</h3>
                <h3>Ubc</h3>
            </div>

        </div>
    );
}

export default Home;
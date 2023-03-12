import React, {useState} from 'react';
import Spline from "@splinetool/react-spline";
import './Home.css';
//import img from './img.png';

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
                <p>Hi there, welcome to our home page! You are welcome to navigate the island and participate in conversations
                    with an AI in each of the island that gives personalized affirmations based on your problems!
                </p>
                &nbsp;
                <p>Island Description</p>
                &nbsp;
                <p>
                    If you are ready, click the button below and start your game!
                </p>
                <div className='item'>
                    <a href='/game'>
                        <button>Start Game</button>
                    </a>
                    &nbsp;
                    <img id="pig" src="img.png" width="100" height="100" />
                </div>
                
            </div>
            
            {/* <div className='island'>
                <h3>Beach</h3>
                <h3>Forest</h3>
                <h3>Ubc</h3>
            </div> */}

        </div>
    );
}

export default Home;
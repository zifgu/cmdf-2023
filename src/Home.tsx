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
                <h1>
                    <span className="u-text-uppercase u-text-color-md-green-900 u-font-weight-900">Z</span>
                    <span className="u-text-lowercase u-text-color-md-white-800 u-font-weight-900">en</span>
                    <span className="u-text-uppercase u-text-color-md-green-900 u-font-weight-900">Z</span>
                    <span className="u-text-lowercase u-text-color-md-white-800 u-font-weight-900">one</span>
                    <span className="u-text-lowercase u-text-color-md-white-800 u-font-weight-900"> 3D</span>
                    <img src="happy_face.png" width="90" height="60"/>
                </h1>
                <p>What you need to hear</p>
                <div className='vertical-center'>
                    <a href='/game'>
                            <button>Play</button>
                    </a>
                    <a href='/game'>
                            <button>Option</button>
                    </a>
                    <a href='/game'>
                            <button>Credits</button>
                    </a>
                </div>
                
                
                <img id="left-tree" src="trees.png" width="400" height="300"/>
                

                {/* <div className='item'> */}
                    <img id="pig" src="img.png" width="100" height="100" />
                {/* </div> */}
                
            </div>

        </div>
    );
}

export default Home;
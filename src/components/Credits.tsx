import React, {useState} from 'react';
import Spline from "@splinetool/react-spline";


export function Credits(){
    return (
        
        <div className='intro'>
            <h1>
                <span className="u-text-uppercase u-text-color-md-green-900 u-font-weight-900">Z</span>
                <span className="u-text-lowercase u-text-color-md-white-800 u-font-weight-900">en</span>
                <span className="u-text-uppercase u-text-color-md-green-900 u-font-weight-900">Z</span>
                <span className="u-text-lowercase u-text-color-md-white-800 u-font-weight-900">one</span>
                <span className="u-text-lowercase u-text-color-md-white-800 u-font-weight-900"> 3D was created by:</span>
                <img src="happy_face.png" width="90" height="60"/>
            </h1>
            &nbsp; 
            <div className='vertical-center'>
                <a href='/credits'>
                        <button className='credits-button'>Floria</button>
                </a>
                <a href='/credits'>
                        <button className='credits-button'>Tiffany</button>
                </a>
                <a href='/credits'>
                        <button className='credits-button'>Yirui</button>
                </a>
                <a href='/credits'>
                        <button className='credits-button'>Zelalem</button>
                </a>
            </div>
            
            
            <img id="left-tree" src="trees.png" width="400" height="300"/>
            

            {/* <div className='item'> */}
                <img id="pig" src="img.png" width="100" height="100" />
            {/* </div> */}
            
        </div>

    );
}

export default Credits;
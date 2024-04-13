import React, { useEffect, useState } from 'react'
import gsap from 'gsap'

import { useNavigate } from 'react-router-dom';
const Header = () => {

    const [isSearch, setSearchBoolean] = useState(true)

    const [isPopUp, setPop] = useState(false)

    const showPopUp = () => {
        setPop(prevPop => !prevPop)
        gsap.to('.popUp', {
            right: '0%'
        })
    }
    const removePopUp = () => {
        setPop(prevPop => !prevPop)
        gsap.to('.popUp', {
            right: '-100px'
        })
    }


    const [query, setQuer] = useState('')
    const nav = useNavigate()
    return (
        <header className='Headers'>
            <div className="firstLeftBtn" onClick={() => { nav('/') }}>
                Home
            </div>
            <div className="firstRightBtn">
                Genre
            </div>
            <div className="Logo">
                <span>DEVAN</span><span>CINEMA</span>
            </div>

            <div className="firstRightBtn">
                About
            </div>
            <div className="lastBtn">
                <div className="searchContent">
                    {isSearch === true ? (
                        <ion-icon name="search-outline" onClick={() => { setSearchBoolean(prevClic => !prevClic) }}></ion-icon>
                    ) : (
                        <div className="inputCon">
                            <input type="text" placeholder='🔍 Movies, TV Shows' onChange={(e) => { setQuer(e.target.value) }} />
                            <div className="close" onClick={() => { setSearchBoolean(prevClic => !prevClic) }}>
                                <ion-icon name="close-outline"></ion-icon>
                            </div>
                        </div>
                    )}
                </div>
                <div className="menu" onClick={() => {
                    if (!isPopUp) {
                        showPopUp();
                    } else {
                        removePopUp();
                    }
                }}>

                    <div className="lines"></div>
                    <div className="lines"></div>
                    <div className="lines"></div>
                </div>
            </div>
            <div className="popUp">
                <div className="popUpBtn">
                    Home
                </div>
                <div className="popUpBtn">
                    Movies
                </div>
                <div className="popUpBtn">
                    TV Shows
                </div>
                <div className="popUpBtn">
                    Genre
                </div>
                <div className="popUpBtn">
                    About
                </div>
            </div>
        </header>
    )
}

export default Header

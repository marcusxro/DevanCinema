import React, { useEffect, useState } from 'react';
import axios from 'axios';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';
import Loading from '../comps/Loading';



const Contact = () => {
    const [isSearch, setSearchBoolean] = useState(true)
    const nav = useNavigate()
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
            right: '-300px'
        })
    }


    const [query, setQuer] = useState('')




    const searchMovie = (e) => {
        e.preventDefault()
        nav(`/Query/${query}`)
    }
    return (
        <div className='Contact'>
            <header className='Headers'>
                <div className="Logo">
                    <span>DEVAN</span><span>CINEMA</span>
                </div>
                <div className="firstLeftBtn" onClick={() => { nav('/') }}>
                    Home
                </div>
                <div className="firstRightBtn" onClick={() => { nav('/Genre') }}>
                    Genre
                </div>
                <div className="firstLeftBtn" onClick={() => { nav('/TopRated') }}>
                    Top <br />
                    Rated
                </div>


                <div className="firstRightBtn" onClick={() => { nav('/About') }}>
                    About
                </div>
                <div className="lastBtn">
                    <div className="searchContent">
                        {isSearch === true ? (
                            <ion-icon name="search-outline" onClick={() => { setSearchBoolean(prevClic => !prevClic) }}></ion-icon>
                        ) : (
                            <div className="inputCon">
                                <form action="submit" onSubmit={searchMovie}>
                                    <input type="text" placeholder='🔍 Movies, TV Shows' onChange={(e) => { setQuer(e.target.value) }} />
                                </form>
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
                    <div className="Logo">
                        <span>DEVAN</span><span>CINEMA</span>
                    </div>
                    <div className="popUpBtn" onClick={() => { nav('/') }}>
                        Home
                    </div>
                    <div className="popUpBtn" onClick={() => { nav('/TopRated') }}>
                        Top <br />
                        Rated
                    </div>
                    <div className="popUpBtn" onClick={() => { nav('/Genre') }}>
                        Genre
                    </div>
                    <div className="popUpBtn" onClick={() => { nav('/About') }}>
                        About
                    </div>
                </div>
            </header>
            <div className="contactCon">
                <div className="contentForAbout">
                    <h1>Devan Cinema is a non-profit movie streaming platform founded and developed by <span>Marcus Salopaso</span>, dedicated to providing quality film entertainment. </h1>


                    <div className="socialText">
                        Follow me on:
                    </div>
                    <div className="socialCon">
                        <div className="socialItem"  onClick={() => { window.open(`https://www.facebook.com/marcuss09`, '_blank') }}>
                            <ion-icon name="logo-facebook"></ion-icon>
                        </div>
                        <div className="socialItem" onClick={() => { window.open(`https://www.instagram.com/mrcsxro/`, '_blank') }}>
                            <ion-icon name="logo-instagram"></ion-icon>
                        </div>
                        <div className="socialItem" onClick={() => { window.open(`https://www.tiktok.com/@marcuxro`, '_blank') }}>
                            <ion-icon name="logo-tiktok"></ion-icon>
                        </div>
                    </div>
                    <div className="socialTexts">
                        or
                    </div>
                    <button onClick={() => { window.open(`https://marcusxro.github.io/`, '_blank') }} >Visit Porfolio</button>

                </div>
            </div>
        </div>
    )
}

export default Contact

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../comps/Header';
import axios from 'axios';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const SearchedMovie = () => {
    const { id } = useParams();
    const [popular, setPopu] = useState([])
    useEffect(() => {
        axios.get(`https://movieapp-zyqr.onrender.com/api/v1/movie_name/${id}`)
            .then((res) => {
                setPopu(res.data)
                if (res.data > 0) {
                    console.log("no items")
                }
            }).catch((err) => {
                console.log(err)
            })
    }, [popular])

    useEffect(() => {
        console.log(id)
    }, [id])


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
        <div className='Searched'>
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
            <div className="SearchedCon">
                <div className="popularItemCon">
                    <div className="popularText">
                        Results of <span>"{id}"</span>
                    </div>
                    <div className="popularCon">
                        {popular && popular.map((itm) => (
                            <div className="popularMovies" key={itm.id} onClick={() => { window.open(`/Movie/${itm.id}`, '_blank') }} >
                                <div className="popularMoviesImg">
                                    <img src={itm.profile_picture_url} alt="" />
                                </div>
                                <div className="popularInfo">
                                    <div className="popularMoviesTitle">
                                        {itm.original_title}
                                    </div>
                                    <div className="popularMoviesDate">
                                        {itm.release_date} | <span> {itm.original_language}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SearchedMovie

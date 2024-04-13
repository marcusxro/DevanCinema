import React, { useEffect, useState } from 'react'
import Header from '../comps/Header'
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap'
import axios from 'axios'
import Loading from '../comps/Loading';

const Genres = () => {
    const [movieList, setChosenGenre] = useState([])
    const [loading, setLoading] = useState(false)
    const [ChosenGenre, setChosen] = useState('12')
    const [genreTitle, setGenreTitle] = useState('Adventure')

    const handleGenreClick = (genreId, genreTitle) => {
        setChosen(genreId.toString());
        setGenreTitle(genreTitle)
    };
    useEffect(() => {
        axios.get(` https://movieapp-zyqr.onrender.com/api/v1/genre/${parseInt(ChosenGenre)}`)
            .then((res) => {
                setChosenGenre(res.data)
                setLoading(true)
            }).catch((err) => {
                console.log(err)
            })
    }, [movieList])

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
        <div className='Genres'>
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

            <div className="genrePicker">
                <button className={genreTitle === 'Adventure' ? 'activate' : ''} onClick={() => handleGenreClick('12', 'Adventure')}>Adventure</button>
                <button className={genreTitle === 'Action' ? 'activate' : ''} onClick={() => handleGenreClick('28', 'Action')}>Action</button>
                <button className={genreTitle === 'Animation' ? 'activate' : ''} onClick={() => handleGenreClick('16', 'Animation')}>Animation</button>
                <button className={genreTitle === 'Comedy' ? 'activate' : ''} onClick={() => handleGenreClick('35', 'Comedy')}>Comedy</button>
                <button className={genreTitle === 'Crime' ? 'activate' : ''} onClick={() => handleGenreClick('80', 'Crime')}>Crime</button>
                <button className={genreTitle === 'Documentary' ? 'activate' : ''} onClick={() => handleGenreClick('99', 'Documentary')}>Documentary</button>
                <button className={genreTitle === 'Drama' ? 'activate' : ''} onClick={() => handleGenreClick('18', 'Drama')}>Drama</button>
                <button className={genreTitle === 'Family' ? 'activate' : ''} onClick={() => handleGenreClick('10751', 'Family')}>Family</button>
                <button className={genreTitle === 'Fantasy' ? 'activate' : ''} onClick={() => handleGenreClick('14', 'Fantasy')}>Fantasy</button>
                <button className={genreTitle === 'History' ? 'activate' : ''} onClick={() => handleGenreClick('36', 'History')}>History</button>
                <button className={genreTitle === 'Horror' ? 'activate' : ''} onClick={() => handleGenreClick('27', 'Horror')}>Horror</button>
                <button className={genreTitle === 'Music' ? 'activate' : ''} onClick={() => handleGenreClick('10402', 'Music')}>Music</button>
                <button className={genreTitle === 'Mystery' ? 'activate' : ''} onClick={() => handleGenreClick('9648', 'Mystery')}>Mystery</button>
                <button className={genreTitle === 'Romance' ? 'activate' : ''} onClick={() => handleGenreClick('10749', 'Romance')}>Romance</button>
                <button className={genreTitle === 'Science Fiction' ? 'activate' : ''} onClick={() => handleGenreClick('878', 'Science Fiction')}>Science Fiction</button>
                <button className={genreTitle === 'TV Movie' ? 'activate' : ''} onClick={() => handleGenreClick('10770', 'TV Movie')}>TV Movie</button>
                <button className={genreTitle === 'Thriller' ? 'activate' : ''} onClick={() => handleGenreClick('53', 'Thriller')}>Thriller</button>
                <button className={genreTitle === 'War' ? 'activate' : ''} onClick={() => handleGenreClick('10752', 'War')}>War</button>
                <button className={genreTitle === 'Western' ? 'activate' : ''} onClick={() => handleGenreClick('37', 'Western')}>Western</button>
            </div>
            {loading === true ? (
                <div className="popularItemCon">
                    <div className="popularText">
                        results on <span>"{genreTitle}"</span>
                    </div>
                    <div className="popularCon">
                        {movieList && movieList.map((itm) => (
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
            ) : (<Loading />)}
        </div>
    )
}

export default Genres

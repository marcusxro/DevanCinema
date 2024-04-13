import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../comps/Header';
import axios from 'axios';
import gsap from 'gsap/gsap-core';
import { useNavigate } from 'react-router-dom';
const Movie = () => {
    // Accessing the id parameter from the URL
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [selectedUrl, setSelectedUrl] = useState('');
    const [liked, setLiked] = useState('')
    useEffect(() => {
        axios.get(`https://movieapp-zyqr.onrender.com/api/v1/details/${id}`)
            .then((res) => {
                setMovie(res.data);
                // Initially set the selected URL to fullmovieurl_1
                setSelectedUrl(res.data.fullmovieurl_1);
                if (movie.genres.length > 0) {
                    setLiked(movie.genres[0].id);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);


    const [similar, setSimilar] = useState([])


    useEffect(() => {
        if (movie.genres && movie.genres.length > 0) {
            axios.get(`https://movieapp-zyqr.onrender.com/api/v1/genre/${parseInt(movie.genres[0].id)}`)
                .then((res) => {
                    console.log(res.data);
                    setSimilar(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [movie]);

    const handleUrlChange = (url) => {
        setSelectedUrl(url);
    };
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
        <div className='Movie'>
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
            <div className="moviePage">
                {/* Embed the video player */}
                <div className="absoImgs">
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                </div>
                <iframe src={selectedUrl} frameborder="0"
                    title="fullmoovies video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"></iframe>

                <div className="movieInfoContent">

                    <div className="moviePosterItem">
                        <img src={movie.profile_pictureURL} alt={movie.profile_pictureURL} />
                    </div>
                    <div className="movieDetailsItem">
                        <div className="movieTitle">
                            {movie.title} | <span>{movie.original_language}</span>
                        </div>
                        <div className="tagLine">
                            {movie.tagline}
                        </div>
                        <p>{movie.overview}</p>
                        <div className="releaseDate">
                            Release Date: <span>{movie.release_date}</span>
                        </div>
                        <div className="imdb">
                            IMDB: {movie.vote_average}/10
                        </div>
                        <div className="genres">
                            <p>Genres:</p>
                            <ul>
                                {movie.genres && movie.genres.map(genre => (
                                    <li key={genre.id}>{genre.name}</li>
                                ))}
                            </ul>
                        </div>

                        <div className='urlChanges'>
                            <button onClick={() => handleUrlChange(movie.fullmovieurl)}>URL 1</button>
                            <button onClick={() => handleUrlChange(movie.fullmovieurl_1)}>URL 2</button>
                        </div>
                    </div>
                </div>


            </div>
            {similar.length === 0 ? <></> : (
                <div className="popularItemCon">
                    <div className="popularText">
                        You might wanna like
                    </div>
                    <div className="popularCon">
                        {similar && similar.map((itm) => (
                            <div className="popularMovies" key={itm.id} onClick={() => { window.open(`/Movie/${itm.id}`) }} >
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
                    <div className="moreBtn">
                        <button onClick={() => { window.open('/Popular', '_blank') }}>
                            More
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Movie;

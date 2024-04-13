import React, { useEffect, useState } from 'react'
import Header from '../comps/Header'
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap'
import axios from 'axios'
import Loading from '../comps/Loading';

const Home = () => {
    const [firstIndex, setFirstIndex] = useState({})
    const nav = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        axios.get('https://movieapp-zyqr.onrender.com/api/v1/nowplayingmovies')
            .then((res) => {
                setFirstIndex(res.data[0])
                setLoading(true)
            }).catch((err) => {
                console.log(err)
            })
    }, [firstIndex])

    const [popular, setPopu] = useState([])
    useEffect(() => {
        axios.get('https://movieapp-zyqr.onrender.com/api/v1/popular')
            .then((res) => {
                const slicedData = res.data.slice(0, 10)
                setPopu(slicedData)
                setLoading(true)
            }).catch((err) => {
                console.log(err)
            })
    }, [popular])

    const [action, setAction] = useState([])

    useEffect(() => {
        axios.get(`https://movieapp-zyqr.onrender.com/api/v1/genre/16`)
            .then((res) => {
                const slicedData = res.data.slice(0, 10)
                setAction(slicedData)
                setLoading(true)
            }).catch((err) => {
                console.log(err)
            })
    }, [action])

    const [tvSer, setTvSer] = useState([])

    useEffect(() => {
        axios.get(`https://movieapp-zyqr.onrender.com/api/v2/tvshows`)
            .then((res) => {
                const slicedData = res.data.slice(0, 10)
                setTvSer(slicedData)
                setLoading(true)
            }).catch((err) => {
                console.log(err)
            })
    }, [tvSer])

    const [adventure, setadventure] = useState([])

    useEffect(() => {
        axios.get(`https://movieapp-zyqr.onrender.com/api/v1/genre/12`)
            .then((res) => {
                const slicedData = res.data.slice(0, 10)
                setadventure(slicedData)
                setLoading(true)
            }).catch((err) => {
                console.log(err)
            })
    }, [adventure])


    const [crime, setCrime] = useState([])

    useEffect(() => {
        axios.get(`https://movieapp-zyqr.onrender.com/api/v1/genre/80`)
            .then((res) => {
                const slicedData = res.data.slice(0, 10)
                setCrime(slicedData)
                setLoading(true)
            }).catch((err) => {
                console.log(err)
            })
    }, [crime])



    const [science, setScience] = useState([])

    useEffect(() => {
        axios.get(`https://movieapp-zyqr.onrender.com/api/v1/genre/878`)
            .then((res) => {
                const slicedData = res.data.slice(0, 10)
                setScience(slicedData)
                setLoading(true)
            }).catch((err) => {
                console.log(err)
            })
    }, [science])


    useEffect(() => {
        console.log(loading)
    }, [loading])


    function getGenreNameById(id) {
        switch (id) {
            case 28:
                return "Action";
            case 12:
                return "Adventure";
            case 16:
                return "Animation";
            case 35:
                return "Comedy";
            case 80:
                return "Crime";
            case 99:
                return "Documentary";
            case 18:
                return "Drama";
            case 10751:
                return "Family";
            case 14:
                return "Fantasy";
            case 36:
                return "History";
            case 27:
                return "Horror";
            case 10402:
                return "Music";
            case 9648:
                return "Mystery";
            case 10749:
                return "Romance";
            case 878:
                return "Science Fiction";
            case 10770:
                return "TV Movie";
            case 53:
                return "Thriller";
            case 10752:
                return "War";
            case 37:
                return "Western";
            default:
                return "Unknown";
        }
    }
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
            right: '-300px'
        })
    }


    const [query, setQuer] = useState('')




    const searchMovie = (e) => {
        e.preventDefault()
        nav(`/Query/${query}`)
    }
    return (
        <div className='Home'>
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
            {loading === true ? (
                <div className="HomeContent">
                    <div className="FirstIndexMovie">
                        <div className="absoIMg">
                            <img src={`https://image.tmdb.org/t/p/w500/${firstIndex.backdrop_path}`} alt="" />
                        </div>
                        <div className="FirstImg">
                            <img src={`https://image.tmdb.org/t/p/w500/${firstIndex.poster_path ? firstIndex.poster_path : firstIndex.backdrop_path}`} alt="" />
                        </div>
                        <div className="FirstIndexInfo">
                            <div className="firstIndexTitle">
                                {firstIndex.original_title}
                            </div>
                            <div className="firstIndexDesc">
                                {firstIndex.overview}
                            </div>
                            <div className="firstIndexGenre">
                                {firstIndex && firstIndex.genre_ids && firstIndex.genre_ids.map((id) => (
                                    <div className="genreItem" key={id}>
                                        {getGenreNameById(id)}
                                    </div>
                                ))}
                            </div>

                            {firstIndex && (
                                <div className="firstIndexPlay" onClick={() => { {firstIndex.id != undefined ? window.open(`/Movie/${firstIndex.id}`, '_blank') : (<></>)} }}>
                                    <ion-icon name="play-outline"></ion-icon>  Play
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="popularItemCon">
                        <div className="popularText">
                            Popular this week
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
                        <div className="moreBtn">
                            <button onClick={() => { window.open('/Popular', '_blank') }}>
                                More
                            </button>
                        </div>
                    </div>


                    <div className="popularItemCon">
                        <div className="popularText">
                            TV Series <span>(Under Development)</span>
                        </div>
                        <div className="popularCon">
                            {tvSer && tvSer.map((itm) => (
                                <div className="popularMovies" key={itm.id} onClick={() => { window.open(`/Series/${itm.id}`, '_blank') }} >
                                    <div className="popularMoviesImg">
                                        <img src={itm.profile_picture_url} alt="" />
                                    </div>
                                    <div className="popularInfo">
                                        <div className="popularMoviesTitle">
                                            {itm.original_name}
                                        </div>
                                        <div className="popularMoviesDate">
                                            {itm.first_air_date} | <span> {itm.original_language}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="moreBtn">
                            <button>
                                More
                            </button>
                        </div>
                    </div>


                    <div className="popularItemCon">
                        <div className="popularText">
                            Animation
                        </div>
                        <div className="popularCon">
                            {action && action.map((itm) => (
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
                        <div className="moreBtn">
                            <button onClick={() => { window.open('/Animation', '_blank') }}>
                                More
                            </button>
                        </div>
                    </div>

                    <div className="popularItemCon">
                        <div className="popularText">
                            Adventure
                        </div>
                        <div className="popularCon">
                            {adventure && adventure.map((itm) => (
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
                        <div className="moreBtn">
                            <button onClick={() => { window.open('/Adventure', '_blank') }}>
                                More
                            </button>
                        </div>
                    </div>


                    <div className="popularItemCon">
                        <div className="popularText">
                            Crime
                        </div>
                        <div className="popularCon">
                            {crime && crime.map((itm) => (
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
                        <div className="moreBtn">
                            <button onClick={() => { window.open('/Crime', '_blank') }}>
                                More
                            </button>
                        </div>
                    </div>



                    <div className="popularItemCon">
                        <div className="popularText">
                            Science Fiction
                        </div>
                        <div className="popularCon">
                            {science && science.map((itm) => (
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
                        <div className="moreBtn">
                            <button onClick={() => { window.open('/Science', '_blank') }}>
                                More
                            </button>
                        </div>
                    </div>


                </div>
            ) : (
                <Loading />
            )}
        </div>
    )
}

export default Home

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../comps/Header';
import axios from 'axios';
import ReactPlayer from 'react-player';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const Series = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState({});
    const [selectedUrl, setSelectedUrl] = useState('');
    const [liked, setLiked] = useState('');
    const [selectedSeason, setSelectedSeason] = useState(1); // Default to season 1
    const [selectedEpisode, setSelectedEpisode] = useState(1); // Default to episode 1
    const nav = useNavigate()
    useEffect(() => {
        axios.get(`https://movieapp-zyqr.onrender.com/api/v2/tvshows_overview/${id}`)
            .then((res) => {
                setMovie(res.data);
                setSelectedUrl(res.data.seasons[0].episodes[0].tvplayer_url); // Default to first episode of first season
                if (res.data.genres && res.data.genres.length > 0) {
                    setLiked(res.data.genres[0].id);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleSeasonChange = (e) => {
        const selectedSeasonNumber = parseInt(e.target.value);
        setSelectedSeason(selectedSeasonNumber);
        setSelectedEpisode(1); // Reset episode to 1 when season changes
        const selectedEpisodeUrl = movie.seasons.find(season => season.season_number === selectedSeasonNumber).episodes[0].tvplayer_url;
        setSelectedUrl(selectedEpisodeUrl);
    };

    const handleEpisodeChange = (e) => {
        const selectedEpisodeNumber = parseInt(e.target.value);
        setSelectedEpisode(selectedEpisodeNumber);
        const selectedEpisodeUrl = movie.seasons.find(season => season.season_number === selectedSeason).episodes.find(episode => episode.episode === selectedEpisodeNumber).tvplayer_url;
        setSelectedUrl(selectedEpisodeUrl);
    };

    const handlePlayerError = (error) => {
        console.error('ReactPlayer error:', error);
    };

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
                <video controls>
                    <source src={selectedUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>


                <div className="movieInfoContent">
                    <div className="moviePosterItem">
                        <img src={movie.poster_path} alt={movie.original_name} />
                    </div>
                    <div className="movieDetailsItem">
                        <div className="movieTitle">
                            {movie.original_name}
                        </div>
                        <p>{movie.overview}</p>
                        <div className="releaseDate">
                            Number of Seasons: <span>{movie.number_of_seasons}</span>
                        </div>
                        <div className="genres">
                            <p>Genres:</p>
                            <ul>
                                {movie.genres && movie.genres.map((genre, index) => (
                                    <li key={index}>{genre}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="seasonCon">
                            <label htmlFor="seasonSelect">Select Season:</label>
                            <select id="seasonSelect" value={selectedSeason} onChange={handleSeasonChange}>
                                {movie.seasons && movie.seasons.map((season) => (
                                    <option key={season.season_number} value={season.season_number}>{season.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="episodeCon">
                            <label htmlFor="episodeSelect">Select Episode:</label>
                            <select id="episodeSelect" value={selectedEpisode} onChange={handleEpisodeChange}>
                                {movie.seasons && movie.seasons.find(season => season.season_number === selectedSeason).episodes.map((episode) => (
                                    <option key={episode.episode} value={episode.episode}>{`Episode ${episode.episode}`}</option>
                                ))}
                            </select>
                        </div>
                        <div className="notWorking" onClick={() => { window.open(selectedUrl, '_blank') }}>
                            not working? kindly click this <span>link</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Series;

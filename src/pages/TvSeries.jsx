import React, { useState, useEffect } from 'react'
import Header from '../comps/Header'
import axios  from 'axios'


const TvSeries = () => {
    
    const [tvSer, setTvSer] = useState([])

    useEffect(() => {
        axios.get(`https://movieapp-zyqr.onrender.com/api/v1/genre/10770`)
            .then((res) => {
                setTvSer(res.data)
            }).catch((err) => {
                console.log(err)
            })
    }, [tvSer])
  return (
    <div className='tvSer'>
    <Header />

    <div className="popularItemCon">
                    <div className="popularText">
                        TV Series
                    </div>
                    <div className="popularCon">
                        {tvSer && tvSer.map((itm) => (
                            <div className="popularMovies" key={itm.id}>
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
  )
}

export default TvSeries

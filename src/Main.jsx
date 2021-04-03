import React, { useState , useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import Spot from './Components/Spot'
import DropDown from './Components/DropDown'
import Cities from './Cities'
import axios from 'axios'


function Main({City}) {

    const [ spots, setSpots ] = useState([])
    const [ skip, setSkip ] = useState(0)
    const [ hasMore , setHasMore] = useState(true)
    const [ loading , setLoading] = useState(true)

    const observer = useRef()
    const lastSpot = useCallback((node)=>{
        if(loading) return 
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver((entries)=>{
            if(entries[0].isIntersecting && hasMore){
                setSkip(skip => skip+30)
            }
        })
        if(node) observer.current.observe(node)
    })

    useEffect(()=>{
        setSpots([])
        setSkip(0)
    },[City])

    const fetchSpot = ()=>{
        console.log('send a request')

        setLoading(true)

        if(!City){
            axios({
                method:'GET',
                url:'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot',
                params: {$top:30,$skip:skip,$format:'JSON'}
            }).then(response =>{
                console.log(response)
                setHasMore(response.data.length>0)
                setSpots(spots => spots.concat(response.data))
                setLoading(false)
            }).catch((e)=>{
                console.log(e.response.status)
            })
        }
        else{
            axios({
                method:'GET',
                url:`https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/${City}`,
                params:{$top:30,$skip:skip,$format:'JSON'}
            }).then(response =>{
                console.log(response)
                if(response.data.length===0)
                    setHasMore(false)
                setSpots(spots => spots.concat(response.data))
                setLoading(false)
            }).catch((e)=>{
                console.log(e.response.status)
            })
        }

    }
    

    useEffect(fetchSpot,[City,skip])


    return (
        <>
            <header>
                <div className="title">景點查詢</div>
                <div className="switchs">
                    <Link to={"/scenicSpot"}><button>All</button></Link>
                    <DropDown options={Cities} />
                </div>
            </header>
            <div>
            {
                spots.map((s,index)=>{
                    if(spots.length === index + 1 )
                        return <Spot refFunction={lastSpot} key={s.ID} data={s}/>
                    else
                        return <Spot key={s.ID} data={s} />
                })
            }
            </div>
            {
                loading?<div>Loading!</div>:null
            }
        </>
    )
}

export default Main

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function DropDown(props) {

    const [ on , setOn ] = useState(false)

    const handleOpen = (e)=>{
        setOn(!on)
    }

    return (
        <div>
            <button onClick={handleOpen}>
                選擇城市
            </button>
            <ul className={on?"options-container":"options-container hidden"}>
                {
                    props.options.map((o,k)=>{
                        return <Link key={k} to={"/scenicSpot/"+o}><li>{o}</li></Link>
                    })
                }
            </ul>
        </div>
    )

}

export default DropDown 
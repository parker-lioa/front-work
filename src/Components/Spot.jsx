import React from 'react'

function Spot({data , refFunction}) {
    return (
        <div ref={refFunction} className="spot">
            <div className="spot-name">{data.Name}</div>
            <div className="spot-address">{data.Address}</div>
            <div className="spot-description">{data.Description}</div>
        </div>
    )
}

export default Spot 
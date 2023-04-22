import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { setTimers } from '../functions/helpers';
import { Time } from '../globalTypes/types';
import moment from 'moment-timezone';
type TimeCardsProps = {
    setTime: Dispatch<SetStateAction<Time[]>>
    time: Time[]
    setCustomTime: Dispatch<SetStateAction<Time>>
    customTime: Time
}
const TimeCards : React.FC<TimeCardsProps> = ({setTime, time, customTime})  => {
    const [currentTime, setCurrentTime] = useState("")
    const timerId = setInterval(() => {
        if(!currentTime){
            setCurrentTime(moment().format("hh:mm"))
            return
        }
        if(currentTime !== moment().format("hh:mm")){
            setTimers({ setTime, customTime })
            setCurrentTime("")
        }
    }, 1000)

    const cardInfo: JSX.Element[] = time.map((info, index) => {
        return <div key={`card-info-${index}`} className={`card bg-primary pt-0 pb-0 ${!index ? null : 'mt-2'}`}>
            <div className="card-body p-0" style={{color: info.color}}>
                <span className="h2 d-block">{info.zone}</span>
                <span className="h2 d-block">{info.time}</span>
            </div>
        </div>
    })

    useEffect(() => {
        return () => clearInterval(timerId)
    })

    return (
        <div className="d-flex justify-content-center flex-wrap">
            <div className="flex-fill max-width">
                <div className="d-flex flex-column mt-3 w-100 text-center">
                    {cardInfo}
                </div>
            </div>
            {/* <div className="mt-3 text-right ms-3">
                <img className="img-fluid" src="https://www.timetemperature.com/tzus/united-states-time-zone-map.gif" style={{ height: "300px" }} />
            </div> */}
        </div>
    )
}

export default TimeCards
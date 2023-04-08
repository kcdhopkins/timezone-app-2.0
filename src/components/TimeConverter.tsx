import React, { Dispatch, FormEvent, SetStateAction, useEffect, useState } from 'react'
import './timeConverter.css'
import { TIMEZONES } from './constants/timezones'
import moment from 'moment-timezone'
import spacetime from 'spacetime'
import { Time } from '../globalTypes/types'
import { setTimers } from '../functions/helpers'

type TimeConverterProps = {
    setTime: Dispatch<SetStateAction<Time[]>>,
    time: Time[],
    setCustomTime: Dispatch<SetStateAction<Time>>
    customTime: Time
}

type DropDownParamTypes = {
    setValue: Dispatch<SetStateAction<string>>
    setShow: Dispatch<SetStateAction<boolean>>
}

interface ZoneInterface {
    [key: string] : string
}

const TimeConverter : React.FC<TimeConverterProps> = ({setTime, setCustomTime, customTime}) => {
    const [showDropdownFrom, setShowDropdownFrom] = useState(false)
    const [showDropdownTo, setShowDropdownTo] = useState(false)
    const [dropDownFromValue, setDropdownFromValue] = useState("")
    const [dropDownToValue, setDropdownToValue] = useState("")
    const [componentTime, setComponentTime] = useState("08:00")

    const dropdownItems = ({setValue, setShow} : DropDownParamTypes) => Object.entries(TIMEZONES.zoneTitles).map((zoneInfo, index)=>{
        const handleButtonClick = ()=>{
            setValue(zoneInfo[1])
            setShow(false)
        }
        return <button key={`button-zonetitle-${index}`} className="dropdown-item" type="button" onClick={handleButtonClick}>{zoneInfo[1]}</button>
    })

    const handleSubmit = (e : FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const date = moment().format("MM/DD/YYYY")
        const currentInputZoneDate = spacetime(date, (TIMEZONES.zoneKeys as ZoneInterface)[dropDownFromValue])
        const currentInputZoneDateTime = currentInputZoneDate.time(componentTime)
        const convertedTime = currentInputZoneDateTime.goto((TIMEZONES.zoneKeys as ZoneInterface)[dropDownToValue]).time()
        const customT = {
            time: convertedTime,
            zone: `${(TIMEZONES.zoneShortTitle as ZoneInterface)[dropDownFromValue]} to ${(TIMEZONES.zoneShortTitle as ZoneInterface)[dropDownToValue]}`,
            color: '#aaaaaa'
        }
        setCustomTime(customT)   
    }

    useEffect(()=>{
        setTimers({setTime, customTime})
    }, [customTime])

    return (
        <form onSubmit={e=>handleSubmit(e)}>
            <div className="d-flex justify-content-center flex-wrap">
                <div className="fixed-margin-right mt-2">
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text">Select A Time</span>
                        </div>
                        <input type="time" className="form-control" placeholder="Username" onChange={(e)=>setComponentTime(e.target.value)} value={componentTime}/>
                    </div>
                </div>
                <div className="d-flex">
                    <div className="dropdown fixed-margin-right mt-2">
                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={()=>setShowDropdownFrom(!showDropdownFrom)}>
                            {!dropDownFromValue ? "Convert From" : dropDownFromValue}
                        </button>
                        {showDropdownFrom &&<div className="dropdown-menu show">
                            {dropdownItems({setValue:setDropdownFromValue, setShow: setShowDropdownFrom})}
                        </div>}
                    </div>
                    <div className="dropdown mt-2">
                        <button className="btn btn-secondary dropdown-toggle" type="button" onClick={()=>setShowDropdownTo(!showDropdownTo)}>
                        {!dropDownToValue ? "Convert To" : dropDownToValue}
                        </button>
                        {showDropdownTo && <div className="dropdown-menu show">
                            {dropdownItems({setValue:setDropdownToValue, setShow: setShowDropdownTo})}
                        </div>}
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary mt-2 ms-1" type="submit">Convert Timezone</button>
                </div>
            </div>
        </form>
    )
}

export default TimeConverter
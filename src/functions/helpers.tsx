import { Dispatch, SetStateAction } from "react"
import { Time } from "../globalTypes/types"
import moment from "moment-timezone"
import { TIMEZONES } from "../components/constants/timezones"

type SetTimeParamTypes = {
    setTime: Dispatch<SetStateAction<Time[]>>,
    customTime?: {
        time: string
        zone: string
        color: string
    }
}

const formatTime = (zone: string) => moment().tz(zone).format("h:mm A");

export const setTimers = ({ setTime, customTime }: SetTimeParamTypes) => {
    const PSTtime = formatTime(TIMEZONES.zoneCodes.PST)
    const ESTtime = formatTime(TIMEZONES.zoneCodes.EST)
    const MSTtime = formatTime(TIMEZONES.zoneCodes.MST)
    const CSTtime = formatTime(TIMEZONES.zoneCodes.CST)
    const UTCtime = moment.utc(moment()).format("h:mm A");

    if (!customTime?.time) {
        setTime([
            { time: ESTtime, zone: TIMEZONES.zoneTitles.EST, color: "#FFCC99" },
            { time: CSTtime, zone: TIMEZONES.zoneTitles.CST, color: "#FFFF99" },
            { time: MSTtime, zone: TIMEZONES.zoneTitles.MST, color: "#CCFFCC" },
            { time: PSTtime, zone: TIMEZONES.zoneTitles.PST, color: "#B2E9F7" },
            { time: UTCtime, zone: TIMEZONES.zoneTitles.UTC, color: "#f4f4f8" },
        ]);
        return
    }

    setTime([
        customTime,
        { time: ESTtime, zone: TIMEZONES.zoneTitles.EST, color: "#FFCC99" },
        { time: CSTtime, zone: TIMEZONES.zoneTitles.CST, color: "#FFFF99" },
        { time: MSTtime, zone: TIMEZONES.zoneTitles.MST, color: "#CCFFCC" },
        { time: PSTtime, zone: TIMEZONES.zoneTitles.PST, color: "#B2E9F7" },
        { time: UTCtime, zone: TIMEZONES.zoneTitles.UTC, color: "#f4f4f8" },
    ]);

}
import React, { useState } from "react"
import "./styles.css"
import Header from "./components/Header"
import TimeConverter from "./components/TimeConverter"
import TimeCards from "./components/TimeCards"
import { Time } from "./globalTypes/types"

const App = () => {
  const [time, setTime] = useState<Time[]>([]);
  const [customTime, setCustomTime] = useState<Time>()
  return (
    <div className="container-fluid p-0 m-0 center">
      <Header />
      <div className="d-flex justify-content-center flex-column">
        <div className="m-3">
          <TimeConverter setTime={setTime} time={time} setCustomTime={setCustomTime} customTime={customTime}/>
          <TimeCards setTime={setTime} time={time} setCustomTime={setCustomTime} customTime={customTime}/>
        </div>
      </div>
    </div>
  )
}

export default App
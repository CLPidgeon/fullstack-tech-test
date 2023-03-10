import React from "react";
import { useState, useEffect } from "react";
import { getServerTime } from "../functions/time";

export default function Time() {
  // Loading boolean to display loading screen or not
  const [loading, setLoading] = useState(true);
  // Holding and setting the server time from /time endpoint
  const [serverTime, setServerTime] = useState();
  // The current time
  const [time, setTime] = useState(new Date());
  // The difference between current time and server time
  const [difference, setDifference] = useState([]);
  const [error, setError] = useState();

  // Call to the getServerTime function. Loading set for loading screen if any delay
  const getLatestServerTime = () => {
    setLoading(true);
    getServerTime()
      .then((res) => {
        setError(null);
        setServerTime(res.data.epoch);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setError("You need to be authorized to use this API");
        } else {
          setError(err.response.statusText);
        }
      });
    // Can check the loading is working by commenting out this line
    setLoading(false);
  };

  // Checking time difference every second
  useEffect(() => {
    const getTimeDifference = () => {
      setTime(Math.round(Date.now()) / 1000);
      let newDifference = Math.floor(time - serverTime);
      //let newDifference = 3900;
      console.log(newDifference);
      let hours = ("0" + Math.floor(newDifference / 3600)).slice(-2);
      let minutes = ("0" + (Math.floor(newDifference / 60) % 60)).slice(-2);
      let seconds = ("0" + (newDifference % 60)).slice(-2);
      setDifference([hours, minutes, seconds]);
    };
    const interval = setInterval(() => {
      getTimeDifference();
    }, 1000);
    return () => clearInterval(interval);
  }, [serverTime, setDifference, time]);

  // Getting the epoch time in seconds on first render then every 30 seconds
  useEffect(() => {
    getLatestServerTime();
    const interval = setInterval(() => {
      getLatestServerTime();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="time">
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <h1>Time</h1>
              <p>Server time: {serverTime}</p>
              <div className="stopwatch--container">
                <div className="stopwatch--digits">
                  {difference[0]}
                  <br />
                  Hours
                </div>
                <div className="stopwatch--digits">
                  {difference[1]}
                  <br />
                  Minutes
                </div>
                <div className="stopwatch--digits">
                  {difference[2]}
                  <br /> Seconds
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

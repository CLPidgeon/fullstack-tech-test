import React from "react";
import { useState, useEffect } from "react";
import { getServerTime } from "../functions/time";

export default function Time() {
  // Loading boolean to display loading screen or not
  const [loading, setLoading] = useState(false);
  // Holding and setting the server time from /time endpoint
  const [serverTime, setServerTime] = useState();
  // The current time
  const [time, setTime] = useState(new Date().toString());
  // The difference between current time and server time
  const [difference, setDifference] = useState([]);
  const [error, setError] = useState();

  // Async call to the getServerTime function. Loading set for loading screen if any delay
  const getLatestServerTime = async () => {
    setLoading(true);
    await getServerTime()
      .then((res) => {
        setError(null);
        setServerTime(res.data.epoch);
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setError("You need to be authorized to use this API");
        } else {
          setError(err);
        }
      });
    // Can check the loading is working by commenting out this line
    setLoading(false);
  };

  // Checking time difference ever second
  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date());
      let newDifference = time - serverTime;
      let hours = "0" + Math.round(newDifference / 360000);
      let minutes = "0" + Math.round(newDifference / 60000);
      let seconds = ("0" + Math.ceil(newDifference / 1000)).slice(-2);
      setDifference([hours, minutes, seconds]);
    }, 1000);
    return () => clearInterval(timeInterval);
  });

  // Getting the epoch time on first render then every 30 seconds
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
                <div className="stopwatch--digits">{difference[0]}</div>
                <div className="stopwatch--digits">{difference[1]}</div>
                <div className="stopwatch--digits">{difference[2]}</div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

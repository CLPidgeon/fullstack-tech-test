import React from "react";
import { useState, useEffect } from "react";
import { getMetrics } from "../functions/metrics";

export default function Metrics() {
  // Loading boolean to display loading screen or not
  const [loading, setLoading] = useState(true);

  // Holding and setting the server time from /time endpoint
  const [latestMetrics, setLatestMetrics] = useState();

  const [error, setError] = useState();

  // Async call to the getMetrics function. Loading set for loading screen if any delay
  const getLatestMetrics = async () => {
    setLoading(true);
    await getMetrics()
      .then((res) => {
        setError(null);
        setLatestMetrics(res);
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

  // Getting the metrics on first render then every 30 seconds
  useEffect(() => {
    getLatestMetrics();
    const interval = setInterval(() => {
      getLatestMetrics();
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="metrics">
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <h1>Metrics</h1>
              <div className="metrics--container">{latestMetrics}</div>
            </>
          )}
        </>
      )}
    </div>
  );
}

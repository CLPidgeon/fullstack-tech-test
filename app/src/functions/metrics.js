import axios from "axios";

export const getMetrics = () => {
  const metrics = axios
    .get("http://localhost:8080/metrics", {
      headers: {
        Authorization: "mysecrettoken",
      },
    })
    .then((response) => {
      return response.data;
    });
  return metrics;
};

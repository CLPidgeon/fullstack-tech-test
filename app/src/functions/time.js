import axios from "axios";

export const getServerTime = async () => {
  const time = axios
    .get("http://localhost:8080/time", {
      headers: {
        Authorization: "mysecrettoken",
      },
    })
    .then((response) => {
      return response;
    });
  return time;
};

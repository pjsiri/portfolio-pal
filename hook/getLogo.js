import { useState, useEffect } from "react";
import axios from "axios";

const getLogo = (query) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: "https://twelve-data1.p.rapidapi.com/logo",
    params: { symbol: query },
    headers: {
      "X-RapidAPI-Key": "c3e9443811msh9092ec179039818p1c80adjsnde35f9d772e7",
      "X-RapidAPI-Host": "twelve-data1.p.rapidapi.com",
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request(options);

      setData(response.data.url);
      setIsLoading(false);
      //console.log(response.data.url);
    } catch (error) {
      setError(error);
      console.log("Logo Error!", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default getLogo;

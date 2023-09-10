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
      "X-RapidAPI-Key": "8d926b198emshbca834b637a93c6p1fb9b2jsnb38e64fc6ca1",
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

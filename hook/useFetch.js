import { useState, useEffect } from 'react';
import axios from 'axios';
import { RAPID_API_KEY } from '@env';

const rapidApiKey = RAPID_API_KEY;

const useFetch = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const axios = require('axios');

    const options = {
    method: 'GET',
    url: `https://twelve-data1.p.rapidapi.com/${endpoint}`,
    params: {
        exchange: 'NASDAQ',
        format: 'json'
    },
    headers: {
        'X-RapidAPI-Key': rapidApiKey,
        'X-RapidAPI-Host': 'twelve-data1.p.rapidapi.com'
    }
    };

    const fetchData = async () => {
        setIsLoading(true);

        try {
            const response = await axios.request(options);

            setData(response.data.data);
            setIsLoading(false);
            //console.log(response.data);
        } catch (error) {
            setError(error);
            alert('There is an error')
            //console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { data, isLoading, error, refetch };
}
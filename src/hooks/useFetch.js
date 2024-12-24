import {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import api from '@/api';

export const useFetch = (url, options) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setIsLoading(true);

      abortControllerRef.current = new AbortController();

      try {
        const response = await api.get(url, {
          ...options,
          signal: abortControllerRef?.current?.signal,
        });
        setData(response.data);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request cancelled');
          return;
        }

        console.log(error);
        setError('Something went wrong. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [options, url]);

  return {data, error, isLoading}
};

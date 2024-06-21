import { useEffect, useState } from "react";
import axios from "axios";

export const makeRequest = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
  headers: {
    Authorization: "bearer " + (process.env.NEXT_PUBLIC_API_TOKEN as string),
  },
});

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await makeRequest.get(url);
        setData(res.data.data);
      } catch (err) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

import { useEffect, useState } from "react";

export const useFetch = (URL, eventOnTask = null) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(URL);
      const json = await response.json();

      setData(json);
      setLoading(false);
    };

    fetchData();
  }, [URL, eventOnTask]);
  return { data, error, loading };
};

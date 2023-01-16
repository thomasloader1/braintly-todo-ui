import { useEffect, useState } from "react";

export const useFetch = (URL) => {
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

    /* fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      }); */

    fetchData();
  }, [URL]);
  return { data, error, loading };
};

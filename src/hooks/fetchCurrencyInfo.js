// ./hooks/fetchCurrencyInfo.js
import { useEffect, useState } from "react";

function fetchCurrencyInfo(currency) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currency) return;

    setLoading(true);

    fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((res) => res.json())
      .then((res) => {
        console.log("API data:", res[currency]); // ✅ See what we actually get
        setData(res[currency] || {});
        setLoading(false);
      })
      .catch((e) => {
        console.error("API fetch error:", e);
        setLoading(false);
      });
  }, [currency]);

  return { data, loading };
}

export default fetchCurrencyInfo;

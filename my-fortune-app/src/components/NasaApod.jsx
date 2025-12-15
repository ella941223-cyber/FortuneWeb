// src/components/NasaApod.jsx
import React, { useEffect, useState } from "react";

const NASA_KEY = "YOUR_NASA_API_KEY"; // ← 記得換掉

export default function NasaApod() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`)
      .then(res => res.json())
      .then(data => {
        setApod(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("NASA API 錯誤：", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="content-section">
      <h2>🚀 NASA 今日天文圖片</h2>

      {loading && <p>載入中...</p>}

      {!loading && apod && (
        <>
          <img
            src={apod.url}
            alt={apod.title}
            style={{
              width: "100%",
              maxHeight: "400px",
              objectFit: "cover",
              borderRadius: "12px",
              marginTop: "15px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)"
            }}
          />
          <h3 style={{ marginTop: "15px" }}>{apod.title}</h3>
          <p style={{ fontSize: "0.9rem", opacity: 0.8 }}>{apod.explanation}</p>
        </>
      )}
    </section>
  );
}

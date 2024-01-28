"use client";
import { useEffect, useState } from "react";

export default function Page() {
  const [store, setStore] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/student")
      .then((response) => response.json())
      .then((data) => setStore(data.data)); // Access `data` correctly
  }, [store]);

  

  return (
    <div>
      <h1>Info</h1>
      {store.map((item) => (
        <h3 key={item.prnNo}>{item.prnNo}</h3>
      ))}
       {store.map((item) => (
        <h3 key={item.username}>{item.user}</h3>
      ))}
    </div>
  );
}

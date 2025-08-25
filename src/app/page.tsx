
'use client';
import styles from "./page.module.css";
import React from "react";
import WeatherComponent from "./Components/WeatherComponent";


export default function Home() {
  return (
    <div className={styles.page}>
      <WeatherComponent />
    </div>
  );
}

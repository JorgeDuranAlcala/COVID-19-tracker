import React, { useState, useEffect, Component } from "react";
import { fetchDailyData } from "../../api";
import { Line, Bar } from "react-chartjs-2";
import styles from "./Chart.module.css";
import {  modifiedData, apiData, data } from "../../models/api.interface";

interface Props {
    country: string,
    Data: apiData<data>
}

const Chart = (props: Props) => {
  const [dailyData, setDailyData] = useState<modifiedData[]>([]);

  useEffect(() => {
    const fetchApi = async () => {

        const data  = await fetchDailyData() as modifiedData[]
       setDailyData(data)
   
    };


    fetchApi();
  }, [dailyData]);

  const lineChart = dailyData.length ? (
    <Line
        data={{
            labels: dailyData.map(({ date }) => date),
            datasets: [
                {
                    data: dailyData.map(({ confirmed }) => confirmed),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    backgroundColor: 'rgba(5, 5, 255,0.5)',
                    fill: true
                },
                {
                    data: dailyData.map( ({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,5,5,0.5)',
                    fill: true
                }
            ]
        }}
    />
  ) : null;

  const {country, Data: { lastUpdate, confirmed, recovered, deaths } } = props;
        

  const barChar = country ? (
    <Bar
        data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [
                {
                    label: 'People',
                    data: [confirmed?.value, recovered?.value, deaths?.value],
                    backgroundColor: [
                        'blue',
                        'green',
                        'red'
                    ]
                },
            ]
        }}
        options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` }
        }}
    />
    ) : null;

  return (
    <div className={styles.container}>
        { country ? barChar : lineChart }
      </div>
    );
};

export default Chart;

import {
  apiData,
  data,
  dailyData,
  modifiedData,
  countryResponse,
} from "../models/api.interface";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async (country?: string) => {
  try {
    let changeUrl = url;

    if (country) {
      changeUrl = `${url}/countries/${country}`;
    }

    const { recovered, deaths, confirmed, lastUpdate } = (
    await fetch(
      changeUrl,
      { method: "GET" }
    ).then((res: any) => res.json())) as apiData<data>;

    const modifiedData = { recovered, deaths, confirmed, lastUpdate };

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDailyData = async () => {
  try {
    const data = (await fetch(`${url}/daily`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => data)) as dailyData[];

    const modifiedData: modifiedData[] = data.map((dailyData) => ({
      confirmed: dailyData.confirmed.total,
      deaths: dailyData.deaths.total,
      date: dailyData.reportDate,
    }));

    return modifiedData;
  } catch (error) {
    console.log(error);
  }
};

export const fetchDataFromCountry = async () => {
  try {
    const data = (await fetch(`${url}/countries`, { method: "GET" })
      .then((res) => res.json())
      .then((data) => data)) as countryResponse;

    return data.countries;
  } catch (error) {
    console.log(error);
  }
};

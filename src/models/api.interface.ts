

export type apiData<T> =  {
    confirmed?: T;
    recovered?: T;
    deaths?: T;
    lastUpdate?: string;
}

export interface data {
    value: number;
    detail?: string;
}

export interface countryResponse {
    countries?: country[]
}

export interface country {
    name?: string
}

export interface dailyData {
    totalConfirmed: number;
    mainlandChina: number;
    otherLocations: number;
    deltaConfirmed: number;
    totalRecovered: number;
    confirmed: additionData;
    deltaConfirmedDetail: additionData;
    deaths: additionData;
    recovered: additionData;
    active: number;
    deltaRecovered: number;
    incidentRate: number;
    peopleTested: number;
    reportDate: string;
  }

  export interface modifiedData {
    confirmed?: number
    date?: string
    deaths?: number
  }

  
  interface additionData {
      total?: number
  }
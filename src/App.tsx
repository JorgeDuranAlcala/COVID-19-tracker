import React, { Component, ChangeEvent } from 'react';
import styles from './App.module.css';
import { Card, Chart, CountryP } from './components';
import { fetchData } from './api';
import logo from "./Images/covid19-logo.jpg"
import { apiData, data } from './models/api.interface';

interface State {
  data: apiData<data>
  country: string
}

class App extends Component {

  state: State = {
    data: {},
    country: ''
  }


  async componentDidMount() {
    const res = await fetchData();
    this.setState({ data: res })
    
  }
  

  handleCountryChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const { value }  = e.target;
      const res = await fetchData(value);
      this.setState({ data: res, country: value })
    } catch (error) {
      console.log(error)
    }
  }
  
  render() {

    const { data, country } = this.state;

    return (
    <div className={styles.App}>
      <div className={styles.container}>
        <div className={styles.logo}>
            <img src={logo} alt="covid19-logo"/>
        </div>
        <Card Data={data}/>
        <CountryP handleCountryChange={this.handleCountryChange} />
        <Chart country={country} Data={data}/>
      </div>
    </div>
  );
}
}

export default App;

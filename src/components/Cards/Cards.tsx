import React from "react";
import { apiData, data } from "../../models/api.interface";
import { Card, Typography, CardContent, Grid } from "@material-ui/core";
import styles from "./Cards.module.css";
import CountUp from "react-countup";

interface Props {
  Data: apiData<data>;
}

const Cards = (props: Props) => {
  const {
    Data: { confirmed, recovered, lastUpdate, deaths },
  } = props;

  if(!recovered || !deaths) {
    return (<>..loading</>)
  }

  const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];

return (
    <div className={styles.container}>
        <Grid container spacing={3} justify="center">
            <Grid item xs={12} md={3} component={Card} className={styles.card}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>infected</Typography>
                    <Typography variant="h5"><CountUp start={0} end={confirmed?.value || 0} duration={2} /></Typography>
                    <Typography color="textSecondary">REAL DATE</Typography>
                    <Typography variant="body2">Number of active cases of covid-19</Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12} md={3} component={Card} className={styles.card}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>recoverd</Typography>
                    <Typography variant="h5"><CountUp start={0} end={recovered.value} duration={2} /></Typography>
                    <Typography color="textSecondary">REAL DATE</Typography>
                    <Typography variant="body2">Number of recoveries from covid-19</Typography>
                </CardContent>
            </Grid>
            <Grid item xs={12} md={3} component={Card} className={styles.card}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                    <Typography variant="h5"><CountUp start={0} end={deaths.value} duration={2} /></Typography>
                    <Typography color="textSecondary">REAL DATE</Typography>
                    <Typography variant="body2">Number of Deaths case of covid-19</Typography>
                </CardContent>
            </Grid>
        </Grid>
    </div>
  );
};

export default Cards;

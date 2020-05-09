import React, { useEffect, useState } from 'react'
import { FormControl, NativeSelect } from '@material-ui/core'
import styles from "./CountryPicker.module.css"
import { fetchDataFromCountry } from '../../api'
import { country, countryResponse } from '../../models/api.interface'

interface Props {
    handleCountryChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CountryPicker = (props: Props) => {

    const [countries, setCountries] = useState<country[]>([])

    useEffect(() => {
        
        const fetchCountryData =  async () => {
            try {
                const data = await fetchDataFromCountry() as country[];
                setCountries(data)
                
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchCountryData()
        
    }, [setCountries])

    
    return (
            <FormControl className={styles.formControl}>
                <NativeSelect defaultValue=""  onChange={e => props.handleCountryChange(e)}>
                    <option value="">global</option>
                    {
                        countries.map( ({ name }, index) => (
                            <>
                                <option key={index} value={name}>{name}</option>
                            </>
                        ) )
                    }
                </NativeSelect>
            </FormControl>
    )
}

export default CountryPicker

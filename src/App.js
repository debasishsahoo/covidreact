import React, { useState, useEffect } from 'react';
import axios from "axios";

const color1 = {
    color: 'limegreen'
}
const color2 = {
    color: 'red'
}
function App() {
    const [country, setCountry] = useState('76')
    const [CovidData, setCovidData] = useState({
        Country: '',
        NewConfirmed: '',
        NewDeaths: '',
        NewRecovered: '',
        TotalConfirmed: '',
        TotalDeaths: '',
        TotalRecovered: ''
    })
    useEffect(() => {
        async function getData() {
            const res = await axios.get('https://api.covid19api.com/summary');
            /*    console.log(res); */
           /*  console.log(res.data.Countries[{ country }]) */
            setCovidData(() => {
                return ({
                    Country: res.data.Countries[country].Country,
                    NewConfirmed: res.data.Countries[country].NewConfirmed,
                    NewDeaths: res.data.Countries[country].NewDeaths,
                    NewRecovered: res.data.Countries[country].NewRecovered,
                    TotalConfirmed: res.data.Countries[country].TotalConfirmed,
                    TotalDeaths: res.data.Countries[country].TotalDeaths,
                    TotalRecovered: res.data.Countries[country].TotalRecovered,
                });
            }
            );

        }

        getData()
    })
    return (
        <>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Confirmed</th>
                        <th scope="col">Recovered</th>
                        <th scope="col">Deaths</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{CovidData.TotalConfirmed} <span style={color1}>+{CovidData.NewConfirmed}</span></td>
                        <td>{CovidData.TotalRecovered} <span style={color2}>+{CovidData.NewRecovered}</span> </td>
                        <td>{CovidData.TotalDeaths} <span style={color2}>+{CovidData.NewDeaths}</span></td>
                    </tr>
                </tbody>
            </table>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">API Country Code</label>
                <input type="text" className="form-control" defaultValue={CovidData.Country} />
            </div>

            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Select Your Country</label>
                <select className="form-control" aria-label="Default select example"

                    value={country}
                    onChange={(event) => {
                        setCountry(event.target.value)
                    }}
                >
                    <option selected>Select Your Country</option>
                    <option value="76">India</option>
                    <option value="181">United States of America</option>
                    <option value="23">Brazil</option>
                    <option value="59">France</option>
                    <option value="140">Russia</option>
                </select>
            </div>
        </>









    );
}

export default App;

import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

//Array for country drop down menu selection
const COUNTRIES = [ 
          {name: 'Afghanistan', code: 'AF'}, 
          {name: 'Åland Islands', code: 'AX'}, 
          {name: 'Albania', code: 'AL'}, 
          {name: 'Algeria', code: 'DZ'}, 
          {name: 'American Samoa', code: 'AS'}, 
          {name: 'AndorrA', code: 'AD'}, 
          {name: 'Angola', code: 'AO'}, 
          {name: 'Anguilla', code: 'AI'}, 
          {name: 'Antarctica', code: 'AQ'}, 
          {name: 'Antigua and Barbuda', code: 'AG'}, 
          {name: 'Argentina', code: 'AR'}, 
          {name: 'Armenia', code: 'AM'}, 
          {name: 'Aruba', code: 'AW'}, 
          {name: 'Australia', code: 'AU'}, 
          {name: 'Austria', code: 'AT'}, 
          {name: 'Azerbaijan', code: 'AZ'}, 
          {name: 'Bahamas', code: 'BS'}, 
          {name: 'Bahrain', code: 'BH'}, 
          {name: 'Bangladesh', code: 'BD'}, 
          {name: 'Barbados', code: 'BB'}, 
          {name: 'Belarus', code: 'BY'}, 
          {name: 'Belgium', code: 'BE'}, 
          {name: 'Belize', code: 'BZ'}, 
          {name: 'Benin', code: 'BJ'}, 
          {name: 'Bermuda', code: 'BM'}, 
          {name: 'Bhutan', code: 'BT'}, 
          {name: 'Bolivia', code: 'BO'}, 
          {name: 'Bosnia and Herzegovina', code: 'BA'}, 
          {name: 'Botswana', code: 'BW'}, 
          {name: 'Bouvet Island', code: 'BV'}, 
          {name: 'Brazil', code: 'BR'}, 
          {name: 'British Indian Ocean Territory', code: 'IO'}, 
          {name: 'Brunei Darussalam', code: 'BN'}, 
          {name: 'Bulgaria', code: 'BG'}, 
          {name: 'Burkina Faso', code: 'BF'}, 
          {name: 'Burundi', code: 'BI'}, 
          {name: 'Cambodia', code: 'KH'}, 
          {name: 'Cameroon', code: 'CM'}, 
          {name: 'Canada', code: 'CA'}, 
          {name: 'Cape Verde', code: 'CV'}, 
          {name: 'Cayman Islands', code: 'KY'}, 
          {name: 'Central African Republic', code: 'CF'}, 
          {name: 'Chad', code: 'TD'}, 
          {name: 'Chile', code: 'CL'}, 
          {name: 'China', code: 'CN'}, 
          {name: 'Christmas Island', code: 'CX'}, 
          {name: 'Cocos (Keeling) Islands', code: 'CC'}, 
          {name: 'Colombia', code: 'CO'}, 
          {name: 'Comoros', code: 'KM'}, 
          {name: 'Congo', code: 'CG'}, 
          {name: 'Congo, The Democratic Republic of the', code: 'CD'}, 
          {name: 'Cook Islands', code: 'CK'}, 
          {name: 'Costa Rica', code: 'CR'}, 
          {name: 'Cote D\'Ivoire', code: 'CI'}, 
          {name: 'Croatia', code: 'HR'}, 
          {name: 'Cuba', code: 'CU'}, 
          {name: 'Cyprus', code: 'CY'}, 
          {name: 'Czech Republic', code: 'CZ'}, 
          {name: 'Denmark', code: 'DK'}, 
          {name: 'Djibouti', code: 'DJ'}, 
          {name: 'Dominica', code: 'DM'}, 
          {name: 'Dominican Republic', code: 'DO'}, 
          {name: 'Ecuador', code: 'EC'}, 
          {name: 'Egypt', code: 'EG'}, 
          {name: 'El Salvador', code: 'SV'}, 
          {name: 'Equatorial Guinea', code: 'GQ'}, 
          {name: 'Eritrea', code: 'ER'}, 
          {name: 'Estonia', code: 'EE'}, 
          {name: 'Ethiopia', code: 'ET'}, 
          {name: 'Falkland Islands (Malvinas)', code: 'FK'}, 
          {name: 'Faroe Islands', code: 'FO'}, 
          {name: 'Fiji', code: 'FJ'}, 
          {name: 'Finland', code: 'FI'}, 
          {name: 'France', code: 'FR'}, 
          {name: 'French Guiana', code: 'GF'}, 
          {name: 'French Polynesia', code: 'PF'}, 
          {name: 'French Southern Territories', code: 'TF'}, 
          {name: 'Gabon', code: 'GA'}, 
          {name: 'Gambia', code: 'GM'}, 
          {name: 'Georgia', code: 'GE'}, 
          {name: 'Germany', code: 'DE'}, 
          {name: 'Ghana', code: 'GH'}, 
          {name: 'Gibraltar', code: 'GI'}, 
          {name: 'Greece', code: 'GR'}, 
          {name: 'Greenland', code: 'GL'}, 
          {name: 'Grenada', code: 'GD'}, 
          {name: 'Guadeloupe', code: 'GP'}, 
          {name: 'Guam', code: 'GU'}, 
          {name: 'Guatemala', code: 'GT'}, 
          {name: 'Guernsey', code: 'GG'}, 
          {name: 'Guinea', code: 'GN'}, 
          {name: 'Guinea-Bissau', code: 'GW'}, 
          {name: 'Guyana', code: 'GY'}, 
          {name: 'Haiti', code: 'HT'}, 
          {name: 'Heard Island and Mcdonald Islands', code: 'HM'}, 
          {name: 'Holy See (Vatican City State)', code: 'VA'}, 
          {name: 'Honduras', code: 'HN'}, 
          {name: 'Hong Kong', code: 'HK'}, 
          {name: 'Hungary', code: 'HU'}, 
          {name: 'Iceland', code: 'IS'}, 
          {name: 'India', code: 'IN'}, 
          {name: 'Indonesia', code: 'ID'}, 
          {name: 'Iran, Islamic Republic Of', code: 'IR'}, 
          {name: 'Iraq', code: 'IQ'}, 
          {name: 'Ireland', code: 'IE'}, 
          {name: 'Isle of Man', code: 'IM'}, 
          {name: 'Israel', code: 'IL'}, 
          {name: 'Italy', code: 'IT'}, 
          {name: 'Jamaica', code: 'JM'}, 
          {name: 'Japan', code: 'JP'}, 
          {name: 'Jersey', code: 'JE'}, 
          {name: 'Jordan', code: 'JO'}, 
          {name: 'Kazakhstan', code: 'KZ'}, 
          {name: 'Kenya', code: 'KE'}, 
          {name: 'Kiribati', code: 'KI'}, 
          {name: 'Korea, Democratic People\'S Republic of', code: 'KP'}, 
          {name: 'Korea, Republic of', code: 'KR'}, 
          {name: 'Kuwait', code: 'KW'}, 
          {name: 'Kyrgyzstan', code: 'KG'}, 
          {name: 'Lao People\'S Democratic Republic', code: 'LA'}, 
          {name: 'Latvia', code: 'LV'}, 
          {name: 'Lebanon', code: 'LB'}, 
          {name: 'Lesotho', code: 'LS'}, 
          {name: 'Liberia', code: 'LR'}, 
          {name: 'Libyan Arab Jamahiriya', code: 'LY'}, 
          {name: 'Liechtenstein', code: 'LI'}, 
          {name: 'Lithuania', code: 'LT'}, 
          {name: 'Luxembourg', code: 'LU'}, 
          {name: 'Macao', code: 'MO'}, 
          {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'}, 
          {name: 'Madagascar', code: 'MG'}, 
          {name: 'Malawi', code: 'MW'}, 
          {name: 'Malaysia', code: 'MY'}, 
          {name: 'Maldives', code: 'MV'}, 
          {name: 'Mali', code: 'ML'}, 
          {name: 'Malta', code: 'MT'}, 
          {name: 'Marshall Islands', code: 'MH'}, 
          {name: 'Martinique', code: 'MQ'}, 
          {name: 'Mauritania', code: 'MR'}, 
          {name: 'Mauritius', code: 'MU'}, 
          {name: 'Mayotte', code: 'YT'}, 
          {name: 'Mexico', code: 'MX'}, 
          {name: 'Micronesia, Federated States of', code: 'FM'}, 
          {name: 'Moldova, Republic of', code: 'MD'}, 
          {name: 'Monaco', code: 'MC'}, 
          {name: 'Mongolia', code: 'MN'}, 
          {name: 'Montserrat', code: 'MS'}, 
          {name: 'Morocco', code: 'MA'}, 
          {name: 'Mozambique', code: 'MZ'}, 
          {name: 'Myanmar', code: 'MM'}, 
          {name: 'Namibia', code: 'NA'}, 
          {name: 'Nauru', code: 'NR'}, 
          {name: 'Nepal', code: 'NP'}, 
          {name: 'Netherlands', code: 'NL'}, 
          {name: 'Netherlands Antilles', code: 'AN'}, 
          {name: 'New Caledonia', code: 'NC'}, 
          {name: 'New Zealand', code: 'NZ'}, 
          {name: 'Nicaragua', code: 'NI'}, 
          {name: 'Niger', code: 'NE'}, 
          {name: 'Nigeria', code: 'NG'}, 
          {name: 'Niue', code: 'NU'}, 
          {name: 'Norfolk Island', code: 'NF'}, 
          {name: 'Northern Mariana Islands', code: 'MP'}, 
          {name: 'Norway', code: 'NO'}, 
          {name: 'Oman', code: 'OM'}, 
          {name: 'Pakistan', code: 'PK'}, 
          {name: 'Palau', code: 'PW'}, 
          {name: 'Palestinian Territory, Occupied', code: 'PS'}, 
          {name: 'Panama', code: 'PA'}, 
          {name: 'Papua New Guinea', code: 'PG'}, 
          {name: 'Paraguay', code: 'PY'}, 
          {name: 'Peru', code: 'PE'}, 
          {name: 'Philippines', code: 'PH'}, 
          {name: 'Pitcairn', code: 'PN'}, 
          {name: 'Poland', code: 'PL'}, 
          {name: 'Portugal', code: 'PT'}, 
          {name: 'Puerto Rico', code: 'PR'}, 
          {name: 'Qatar', code: 'QA'}, 
          {name: 'Reunion', code: 'RE'}, 
          {name: 'Romania', code: 'RO'}, 
          {name: 'Russian Federation', code: 'RU'}, 
          {name: 'RWANDA', code: 'RW'}, 
          {name: 'Saint Helena', code: 'SH'}, 
          {name: 'Saint Kitts and Nevis', code: 'KN'}, 
          {name: 'Saint Lucia', code: 'LC'}, 
          {name: 'Saint Pierre and Miquelon', code: 'PM'}, 
          {name: 'Saint Vincent and the Grenadines', code: 'VC'}, 
          {name: 'Samoa', code: 'WS'}, 
          {name: 'San Marino', code: 'SM'}, 
          {name: 'Sao Tome and Principe', code: 'ST'}, 
          {name: 'Saudi Arabia', code: 'SA'}, 
          {name: 'Senegal', code: 'SN'}, 
          {name: 'Serbia and Montenegro', code: 'CS'}, 
          {name: 'Seychelles', code: 'SC'}, 
          {name: 'Sierra Leone', code: 'SL'}, 
          {name: 'Singapore', code: 'SG'}, 
          {name: 'Slovakia', code: 'SK'}, 
          {name: 'Slovenia', code: 'SI'}, 
          {name: 'Solomon Islands', code: 'SB'}, 
          {name: 'Somalia', code: 'SO'}, 
          {name: 'South Africa', code: 'ZA'}, 
          {name: 'South Georgia and the South Sandwich Islands', code: 'GS'}, 
          {name: 'Spain', code: 'ES'}, 
          {name: 'Sri Lanka', code: 'LK'}, 
          {name: 'Sudan', code: 'SD'}, 
          {name: 'Suriname', code: 'SR'}, 
          {name: 'Svalbard and Jan Mayen', code: 'SJ'}, 
          {name: 'Swaziland', code: 'SZ'}, 
          {name: 'Sweden', code: 'SE'}, 
          {name: 'Switzerland', code: 'CH'}, 
          {name: 'Syrian Arab Republic', code: 'SY'}, 
          {name: 'Taiwan, Province of China', code: 'TW'}, 
          {name: 'Tajikistan', code: 'TJ'}, 
          {name: 'Tanzania, United Republic of', code: 'TZ'}, 
          {name: 'Thailand', code: 'TH'}, 
          {name: 'Timor-Leste', code: 'TL'}, 
          {name: 'Togo', code: 'TG'}, 
          {name: 'Tokelau', code: 'TK'}, 
          {name: 'Tonga', code: 'TO'}, 
          {name: 'Trinidad and Tobago', code: 'TT'}, 
          {name: 'Tunisia', code: 'TN'}, 
          {name: 'Turkey', code: 'TR'}, 
          {name: 'Turkmenistan', code: 'TM'}, 
          {name: 'Turks and Caicos Islands', code: 'TC'}, 
          {name: 'Tuvalu', code: 'TV'}, 
          {name: 'Uganda', code: 'UG'}, 
          {name: 'Ukraine', code: 'UA'}, 
          {name: 'United Arab Emirates', code: 'AE'}, 
          {name: 'United Kingdom', code: 'GB'}, 
          {name: 'United States', code: 'US'}, 
          {name: 'United States Minor Outlying Islands', code: 'UM'}, 
          {name: 'Uruguay', code: 'UY'}, 
          {name: 'Uzbekistan', code: 'UZ'}, 
          {name: 'Vanuatu', code: 'VU'}, 
          {name: 'Venezuela', code: 'VE'}, 
          {name: 'Viet Nam', code: 'VN'}, 
          {name: 'Virgin Islands, British', code: 'VG'}, 
          {name: 'Virgin Islands, U.S.', code: 'VI'}, 
          {name: 'Wallis and Futuna', code: 'WF'}, 
          {name: 'Western Sahara', code: 'EH'}, 
          {name: 'Yemen', code: 'YE'}, 
          {name: 'Zambia', code: 'ZM'}, 
          {name: 'Zimbabwe', code: 'ZW'} 
        ]


function PublicHolidayComponent(props) {
    const [country, setCountry] = useState("");
    const [holidays, setHolidays] = useState([]);
    const [pubHolidayError, setPubHolidayError] = useState({status:false, message: ""});

    useEffect(() => {
        if(country === "") {
            return;
        }

        const publicHolidayOptions = {
          method: 'GET',
          url: 'https://working-days.p.rapidapi.com/1.3/analyse',
          params: {
            start_date: '2013-01-01',
            end_date: '2013-12-31',
            country_code: country,
            end_time: '18:15',
            start_time: '09:14',
            configuration: 'Federal holidays'
          },
          headers: {
            'X-RapidAPI-Key': 'a28c877ab2msh806b3128f2a283bp1871b9jsn40e6a3841153',
            'X-RapidAPI-Host': 'working-days.p.rapidapi.com'
          }
        };

        axios.request(publicHolidayOptions).then((response) => {
            setHolidays(response.data.public_holidays.list);
        }).catch((e) => {
            setPubHolidayError({status: true, message: "Information Unavailable."});
        });

        
    }, [country]);

    if(pubHolidayError.status){
        return (
            <h2 style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh',
              }}>Public Data Unavailable for Selected Country. Please refresh to choose another country.</h2>
         
        )
    };


    return (
        <div className='centre'>
            <select className ='centre' onChange={(e) => {
                    setCountry(e.target.value.split(' - ')[1]);
                }}>
                {COUNTRIES.map((country) => {
                    return <option key={country.code}>{country.name} - {country.code}</option>
                })}
            </select>
            {holidays.map((holiday, index) => {
                return <h2 className="headliner" key={index}>{holiday.date} - {holiday.description}</h2>
            })}
        </div>
    );

    
}

function CurrentWeatherComponent(props) {
    const [temperature, setTemperature] = useState({});
    const [weather, setWeather] = useState({});
    const [temperatureError, setTemperatureError] = useState({status:false, message: ""});
    
    function getCoordinates() {
        navigator.geolocation.getCurrentPosition((position) => {
            const {longitude, latitude} = position.coords;
            const appid= '2ee824bc7dbae6214abbc9a219b864b4';
            const units= 'metric';
            const currentWeatherOptions = {
                method: 'GET',
                url: `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${appid}&units=${units}`,
                params: {
                  lat: latitude,
                  lon: longitude,
                  appid: '2ee824bc7dbae6214abbc9a219b864b4',
                  units: 'metric'
                }
              };
            axios.request(currentWeatherOptions).then((response) => {
                setTemperature(response.data["main"]);
                setWeather(response.data.weather[0]);
            }).catch((e) => {
                setTemperatureError({status: true, message: "Information Unavailable."});
            });

            console.log(latitude);
            console.log(longitude);
            
        })
    }

    if(temperatureError.status){
        return (
            <h2 style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh'
              }}>Weather Data Unavailable for Your Area. Please try again later.</h2>
         
        )
    };

    return (
        <div>
            <button onClick={getCoordinates}>Get Weather Data For Your Area</button>
            <p>Current Weather Description: {weather.main}, {weather.description}</p>
            <p>Current Tempature: {temperature.temp}°C</p>
            <p>It feels like: {temperature.feels_like}°C</p>
            <p>Minimum Temperature: {temperature.temp_min}°C</p>
            <p>Maximum Temperature: {temperature.temp_max}°C</p>
        </div>
    );

    
}

function AccomodationComponent(props) {
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [accomodation, setAccomodation] = useState([]);
    const [accomodationError, showAccomodationError] = useState({status:false, message: ""});

    function submitDateForm(e) {
        e.preventDefault();
        navigator.geolocation.getCurrentPosition((position) => {
            const {longitude, latitude} = position.coords;
            console.log(arrivalDate);
            console.log(departureDate);
            const accomodationOptions = {
            method: 'GET',
            url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list',
            params: {
                offset: '0',
                arrival_date: arrivalDate,
                departure_date: departureDate,
                guest_qty: '1',
                dest_ids: '0',
                room_qty: '1',
                search_type: 'latlong',
                search_id: 'none',
                latitude: latitude,
                longitude: longitude,
                languagecode: 'en-us'
            },
            headers: {
                'X-RapidAPI-Key': 'a28c877ab2msh806b3128f2a283bp1871b9jsn40e6a3841153',
                'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
            }
            }
            axios.request(accomodationOptions).then((response) => {
                console.log(response.data.result);
                setAccomodation(response.data.result);
            }).catch((e) => {
                showAccomodationError({status: true, message: "Information Unavailable."});
            });
            
        })
    }

    if(accomodationError.status){
        return (
            <h2 style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100vh'
              }}>Weather Data Unavailable for Your Area. Please try again later.</h2>
         
        )
    };

    
    

    return (
        <div>
            <form className='centre' onSubmit={(e) => submitDateForm(e)}>
                <label htmlFor="arrival">Arrival Date:</label>
                <input type="date" id="arrival" name="arrival" onChange={(e) => {
                    setArrivalDate(e.target.value);
                }}></input>
                <label htmlFor="departure">Departure Date:</label>
                <input type="date" id="departure" name="departure" onChange={(e) => {
                    setDepartureDate(e.target.value);
                }}></input>
                <button type='submit'>Submit</button>
            </form>
            {accomodation.map((element, index) => {
                    return <p className='centre' key={index}>{element.hotel_name}, Minimum Price: {element.min_total_price}</p>
                })}
        </div>
    );

    
}


/*
 * React Component
 * "Element" in your program
 *  Class that extends React.Component
 *  Function that is in camelcase and capitalized
 */

//Start of UI
function App() {
  return (
      <div>
        <div>
            <h1 className='title'>View Public Holiday, Weather, and Accomodation Details in your selected country!</h1>
        </div>
        {/*Current Weather API Begin*/}
        <div className='centre'>
            <h2 className='centre'>Click Me To Find My Current Location and Details!</h2>
            <CurrentWeatherComponent />
        </div>
        {/*Current Weather API End*/}
        {/*Accomodation API Begin*/}
        <div>
            <h2 className='centre'>Fill In Data To Find Accomodation Near You.</h2>
            <h2 className='centre'>Make sure to pick an arrival date that is today or onwards.</h2>
            <h2 className='centre'>Else, there will be no output for accomodation.</h2>
            <AccomodationComponent />
        </div>
        {/*Accomodation API End*/}
        {/*Country API Display Begin*/}
        <div>
            <h2 className='centre'>Select Country to view list of public holidays</h2>
        <PublicHolidayComponent title="my title" subtitle="subtitle" exists />
        </div>
        {/*Country API Display End*/}
      </div>
  );
}


export default App;

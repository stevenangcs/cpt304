#CPT304 Assignment 2

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

If it is your first time using react, open Command Line Interface(CLI) and type:

`npm init -y`

(If you have used React before, skip the portion above.)

Once the download is done, change directory into the source code folder (e.g. This folder is called cpt304) [location of folder after pulling may differ, so please locate where the source code folder is pulled into], and type this in CLI:

`cd cpt304`

If your current directory is in the source code folder, you can type this in CLI:

`npm start`

This enables you to view and test the source code application.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Software Documentation

In order to fulfill the requirements of the user (seen from the user stories), API components were used. The parameters required for each component can be found below.

### Public Holiday API Component (PublicHolidayComponent)

Data is called from Public Holiday [Working days API](https://rapidapi.com/joursouvres-api/api/working-days/).

This API requires the following parameters:

- X-RapidAPI-Key
- X-RapidAPI-Host
- start_date
- end_date
- country_code (The ISO country code (2 letters). [Click here to view the available countries and configurations](https://api.workingdays.org/api-countries))

The country code used in the API call is determined by the user's input in a select field, shown in the code below:

```
{/*Display result of country choice if available*/}
    return (
        //Display dropdown menu choice containing all countries in the world
        <div className='centre'>
            <select className ='centre' onChange={(e) => {
                    setCountry(e.target.value.split(' - ')[1]);
                }}>
                {COUNTRIES.map((country) => {
                    return <option key={country.code}>{country.name} - {country.code}</option>
                })}
            </select>
            {/*Display all public holidays that country has*/}
            {holidays.map((holiday, index) => {
                return <p className="text" key={index}>{holiday.date} - {holiday.description}</p>
            })}
        </div>
    );
```

On the other hand, there are optional parameters:

- end_time (The end date's time (24 hours format, like 09:00 or 15:00, but not 3pm).If omitted, default value is 23:59.)
- start_time (The start date's time (24 hours format, like 09:00 or 15:00, but not 3pm).If omitted, default value is 00:00)
- profile_id (Description: If you want to query a customized calendar, provide its profile_id with 6 characters)
- configuration (The name of the preset configuration to be used)

Sample of API Call code snippet for Public Holiday data:

```
{/*Initialize Option and Parameters for API Call*/}
        const publicHolidayOptions = {
          method: 'GET',
          url: 'https://working-days.p.rapidapi.com/1.3/analyse',
          params: {
            {/*Edit parameters here*/}
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

        {/*Request for API data*/}
        axios.request(publicHolidayOptions).then((response) => {
            setHolidays(response.data.public_holidays.list);
        }).catch((e) => {
            setPubHolidayError({status: true, message: "Information Unavailable."});
        });
```

### Weather API Component (CurrentWeatherComponent)

API is obtained from [OpenWeatherMap](https://openweathermap.org/api).

This API requires the following parameters:

- lat (latitude) 
- lon (longitude)
- appid (Unique API Key)

The latitude and longitude used for the API call is obtained from the user by using the navigator.geolocation.getCurrentPosition in-built function, code snippet shown below:

```
navigator.geolocation.getCurrentPosition((position) => {

            {/*Initialize Option and Parameters for API Call*/}
            {/*Edit parameters here*/}
            const {longitude, latitude} = position.)
            }
```

On the other hand, there is an optional parameter used for the Weather API call:

- units (metric units used to show temperature in Celcius)


Sample of API Call code snippet for Weather data:

```
    {/*Get Coordinates for user's current location*/}
    {/*And use it to call OpenWeatherMap API*/}
    function getCoordinates() {
        {/*Obtain live location (latitude and longitude) of user*/}
        navigator.geolocation.getCurrentPosition((position) => {

            {/*Initialize Option and Parameters for API Call*/}
            {/*Edit parameters here*/}
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
            {/*Request for API data*/}
            axios.request(currentWeatherOptions).then((response) => {
                setTemperature(response.data["main"]);
                setWeather(response.data.weather[0]);
            }).catch((e) => {
                setTemperatureError({status: true, message: "Information Unavailable."});
            });
        })
    }
```

### Accommodation API Component (AccommodationComponent)

API is obtained from RapidAPI [Booking API](https://rapidapi.com/apidojo/api/booking/).

This API requires the following parameters:

- X-RapidAPI-Key
- X-RapidAPI-Host
- offset(The number of items to ignore as offset for paging (fixed 30 items returned per page). You are interested in the optional parameter 'search_id')
- arrival_date (The check-in date at hotel, the format is yyyy-MM-dd. Ex : 2022-08-14)
- departure_date (The check-out date, the format is yyyy-MM-dd. Ex : 2022-08-15)
- guest_qty (The number of adults)
- dest_ids (Value of dest_id or city_ufi field from locations/auto-complete API (Don't pass this if you use latlong as search_type))
- room_qty (The number of rooms)
- search_type (Value of dest_type returned by locations/auto-complete API)
- latitude
- longitude

When the application was created, it was assumed that the guest will find information for just themselves, therefore the default parameter for guest_qty is 1, and room_qty is 1.

The search_type parameter is also deafulted to the user's latitude and longitude in order to provide relevant data according to the user's location.

The search_id parameter is set to none too as it is irrelevant to the user.

Sample of API Call code snippet for Accommodation data:

```
function submitDateForm(e) {
        {/*e.preventDefault to saave user's date input'*/}
        e.preventDefault();
        {/*Obtain live location (latitude and longitude) of user*/}
        navigator.geolocation.getCurrentPosition((position) => {

            {/*Obtain live location (latitude and longitude) of user*/}
            {/*Edit parameters here*/}
            const {longitude, latitude} = position.coords;
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
            {/*Request for API data*/}
            axios.request(accomodationOptions).then((response) => {
                console.log(response.data.result);
                setAccommodation(response.data.result);
            }).catch((e) => {
                showAccommodationError({status: true, message: "Information Unavailable."});
            });

        })
}
```


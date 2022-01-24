1. Logo is in the middle of the page (centred horizontally and vertically).
2. It is 20% of screen width but no smaller than 150px in width
3. Remove the word “BETA” from the logo.
4. On mouse hover logo has a box shadow and is slightly increased
5. When the logo is clicked, it takes to the next page with a URL /weather-forecast
   Weather forecast page
   Make a next page with a URL “weather-forecast” (see the wireframe below)
1. The same logo is placed on the top of the screen and is 50px in height. And clicking the logo
   takes one back to the landing page
2. Below logo there is a heading titled “Weather forecast”.
3. Below the heading there are two input fields located next to each other. One is for latitude,
   other is for longitude.
   a. Latitude should have a validation for values >=-90 and <=90
   b. Longitude should have a validation for values >=-180 and <=180
   c. Validation error is not visible before one “visits” (focus/touch) the input field or
   clicks the “Check forecast” button

4. If form is valid, then on submit fetch the upcoming weather forecast from this URL
   https://8l526ngysb.execute-api.eu-west-1.amazonaws.com/?lat=$$$LAT$$$&lon=$$$LON$$$
   Substitute $$$LAT$$$with value from the latitude field and $$$LON$$$ with value from the
   longitude field so it's like ?lat=60&lon=11
5. Show “spinner/loader” when button while data is being fetched
6. Once values are fetched, iterate properties.timeseries property and render time,
   temperature and humidity values in table
   a. Time is in response as timestamp Output only hours and minutes without the date
   part. Use browser timezone
   b. Temperature is in data.instant.details.air_temperature.Postfix value with °C
   c. Humidity is in response as data.instant.details.relative_humidity.Postfix value
   with % sign

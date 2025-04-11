const app = Vue.createApp({
  //Start of Vue Data  
  data() {
        return {
            user: ' ',
            weather: ' ',
            location: ' ',
            wordInput: '',
            meaning: ' ',
            weatherData: {
            city: 'London',
            province: 'Ontario',
            country: 'Canada'
            }
        }
    },
    //Start of Use of computed, methods, and created 
    computed: {
        fullName() {
          return this.user ? `${this.user.firstName} ${this.user.lastName}` : '';
        },
        fullLocation() {
            return this.weatherData ? `${this.weatherData.city}, ${this.weatherData.province}, ${this.weatherData.country}` : '';
        }
      },
    methods: {
        fetchWeather() {
            const { city, province, country } = this.weatherData;
            const url = `http://comp6062.liamstewart.ca/weather-information?city=${city}&province=${province}&country=${country}`;
            fetch(url)
              .then(response => response.json())
              .then(data => {
                this.weather = {
                  temperature: data.temperature,
                  wind: data.wind_speed,
                  description: data.weather_description,
                };
              })
                .catch(error => {
                console.error("Error! fetching weather failed:", error);
              });
          },
        fetchProfile(){
            fetch('http://comp6062.liamstewart.ca/random-user-profile')
            .then(response => response.json())
            .then(data => {
              this.user = {
                firstName: data.first_name,
                lastName: data.last_name,
                age: data.age,
                profile_picture: data.profile_picture
              };
            })
            .catch(error => {
              console.error("Error! fetching user profile failed:", error);
            });
        },
        fetchDefinition() {
          if (!this.wordInput.trim()) return;
          const url = `https://comp6062.liamstewart.ca/define?word=${this.wordInput}`;
          fetch(url)
            .then(response => response.json())
            .then(data => {
             if (Array.isArray(data) && data.length > 0)
             {
              this.meaning = 
              {
                word: data[0].word,
                phonetic: data[0].phonetic,
                definition: data[0].definition
              };
             }
             else
             {
                alert("Word not found!");
                this.meaning = ' ';
             }
            })
            .catch(error => {
              console.error("Error! fetching definition failed:", error);
            });
        }
      },
      created() {
        this.fetchProfile();
        this.fetchWeather();
        this.fetchDefinition();
      }
      
});
// this connects to the div with the id of app
app.mount('#app');

const Offer = {
    data() {
        return {
            result: {},
            "offers": [
                {
                    "id": 1,
                    "name": "Jordan Doe",
                    "salary": 120000,
                    "bonus": 9000,
                    "company": "EY",
                    "offerDate": "2021-10-12"
                },
        
                {
                    "id": 2,
                    "name": "Jesse Doe",
                    "salary": 90000,
                    "bonus": 2000,
                    "company": "IU",
                    "offerDate": "2021-12-10"
                }
            ]
        }
    },

    computed: {
        prettyBirthday() {
            return dayjs(this.result.dob.date)
            .format('D MMM YYYY')
        }
    },

    methods: {
        fetchUserData(){
            fetch('https://randomuser.me/api')
        
            .then( response => response.json())
    
            .then((json) => {
                console.log(json);
                this.result = json.results[0];
            }
            )
    
            .catch( (error) => {
    
                    console.error(error);
            })
        }
    },

    created() {
        this.fetchUserData();
    }
}

Vue.createApp(Offer).mount('#offerApp')
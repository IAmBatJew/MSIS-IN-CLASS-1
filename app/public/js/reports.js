const Offer = {
    data() {
        return {
            "students": [],
            selectedStudent: null,
            offerForm:{},
            "offers": [],
            selectedOffer: null
        }
    },

    computed: {
        prettyBirthday() {
            return dayjs(this.result.dob.date)
            .format('D MMM YYYY')
        }
    },

    methods: {

       fetchOfferData(s){
            fetch('/api/report')
            .then( response => response.json())
            .then( (responseJson) => {
                console.log(responseJson);
                this.offers = responseJson;
            })
    
            .catch( (err) => {
    
                    console.error(err);
            })
        }
    },
       

    created() {
        this.fetchOfferData();
    }
}

Vue.createApp(Offer).mount('#reportApp')
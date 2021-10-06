const Offer = {
    data() {
        return {
            "students": [],
            selectedStudent: null,
            "offers": []
        }
    },

    computed: {
        prettyBirthday() {
            return dayjs(this.result.dob.date)
            .format('D MMM YYYY')
        }
    },

    methods: {

        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },

        selectStudent(s) {
            if (s == this.selectedStudent) {
                return;
            }

            this.selectedStudent = s;
            this.offers = [];
            this.fetchOfferData(this.selectedStudent);
        },

        fetchStudentData(){
            fetch('/api/students/')
        
            .then( response => response.json())
    
            .then( (responseJson) => {
                console.log(responseJson);
                this.students = responseJson;
            }
            )
    
            .catch( (err) => {
    
                    console.error(err);
            })
        },

        fetchOfferData(s){
            console.log("Fetching offer data for ", s);
            fetch('/api/offers/offersIndex.php?student=' + s.id)
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
        this.fetchStudentData();
    }
}

Vue.createApp(Offer).mount('#offerApp')
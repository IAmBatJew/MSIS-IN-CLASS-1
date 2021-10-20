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
        },

        postOffer(evt) {
            if(this.selectedOffer === null) {
                this.postNewOffer(evt);
            } else {
                this.postEditOffer(evt);
            }
        },

        postEditOffer(evt) {
            this.offerForm.studentid = this.selectedStudent.id;
            this.offerForm.id = this.selectedOffer.id;

            console.log("Updating:", this.offerForm);
            // alert("Posting!");
    
            fetch('api/offers/update.php', {
                method:'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                    "content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.offers = json;
    
                //Reset the form
                this.resetOfferForm();
            });
        },

        selectOffer(o) {
            this.selectedOffer = o;
            this.offerForm = Object.assign({}, this.selectedOffer);
        },

        resetOfferForm() {
            this.selectedOffer = null;
            this.offerForm = {};
        },

        postDeleteOffer(o) {

            ///Use "prompt" instead of confirm to have them type in a response, not just a clickable button
            if (!confirm("Are you sure you want to dlete the offer from "+o.compnayName+"?")){
                return; 
            }

            fetch('api/offers/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                    "content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.offers = json;
    
                //Reset the form
                this.resetOfferForm();
            });
        },

        postNewOffer(evt) {

            this.offerForm.studentId = this.selectedStudent.id;
            console.log("Creating:", this.offerForm);
            // alert("Posting!");
    
            fetch('api/offers/create.php', {
                method:'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                    "content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then ( json => {
                console.log("Returned from post:", json);
                //TODO: test a result was returned!
                this.offers = json;
    
                //Reset the form
                this.resetOfferForm();
            });
        }
    },

    created() {
        this.fetchStudentData();
    }
}

Vue.createApp(Offer).mount('#offerApp')
import Firebase from "firebase";


const firebaseConfig ={
    apiKey:'AIzaSyB1IXS01JBpM9iL-Qk_IA0I3K-yJ5mnPIQ', 
    databaseURL:'https://cart-aa736.firebaseio.com/',
    projectId:'cart-aa736',
    appId:'1:187597473460:android:c26b1bc45236fbe95439e1'
}

export default Firebase.initializeApp(firebaseConfig); 
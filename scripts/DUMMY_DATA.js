import { renderSlides } from './main.js';

const a1 = 'https://firebasestorage.googleapis.com/v0/b/artgallery-896d7.appspot.com/o/a1.jpeg?alt=media&token=b2a0e39d-86b0-4b15-adfc-8463d7b30c51';
const a2 = 'https://firebasestorage.googleapis.com/v0/b/artgallery-896d7.appspot.com/o/a2.jpeg?alt=media&token=d162b3da-a07b-4739-8613-a536b3ec065c';
const a3 = 'https://firebasestorage.googleapis.com/v0/b/artgallery-896d7.appspot.com/o/a3.jpeg?alt=media&token=289cd4e8-47e2-403d-95bf-d1ea9ae61bc9';
const a4 = 'https://firebasestorage.googleapis.com/v0/b/artgallery-896d7.appspot.com/o/a4.jpeg?alt=media&token=785ead26-68b1-46b1-8fda-ffa94806111f';

export let DUMMY_DATA = [{
  img: a1,
  body: 'Eres lo más lindo del mundo... '
},
{
  img: a2,
  body: 'me encanta verte feliz'
},
{
  img: a3,
  body: 'Espero que con este regalo pueda. '
},
{
  img: a4,
  body: 'endulzarte el corazón'
},
];



import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";


const firebaseConfig = {

  apiKey: "AIzaSyAlWnX9FV2k6UGS7j44-bsrygF6SKMa7R4",
  authDomain: "sweetbox-fcbb5.firebaseapp.com",
  projectId: "sweetbox-fcbb5",
  storageBucket: "sweetbox-fcbb5.appspot.com",
  messagingSenderId: "965201744140",
  appId: "1:965201744140:web:b5d1fd560615c824833929"

};

const params = new URLSearchParams(location.search)
const userUID = params.get('id')
console.log(userUID);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
db.collection('pedidos').doc(userUID).get().then(doc => {

  console.log(doc.data());
  const user = doc.data();

  console.log(user);
  DUMMY_DATA = user.data;
  renderSlides();
});



const test = {

  request: 'camilo',

  data: [
    {
      body: 'dsfdsfd',
      img: 'http//fdgdfg'
    }
  ]

}
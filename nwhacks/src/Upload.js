import React from 'react';
import axios from "axios";

import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyByKn8cPCkuyk8UlQ677H1DeXt94JR5eVk",
    authDomain: "nwhackdb.firebaseapp.com",
    databaseURL: "https://nwhackdb.firebaseio.com",
    projectId: "nwhackdb",
    storageBucket: "nwhackdb.appspot.com",
    messagingSenderId: "836715595935",
    appId: "1:836715595935:web:ea6518d1be5cb8be523aaa",
    measurementId: "G-Z6KC83REX4"
  };
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref()
console.log("TCL: storageRef", storageRef)

// Create a reference to 'mountains.jpg'
var exampleRef = storageRef.child('example.jpg');
console.log("TCL: exampleRef", exampleRef)

const db = firebase.firestore();

let photosRef = db.collection('photos'); 


const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});



class Upload extends React.Component {
    state = {
        selectedFile : null,

    }

    fileSelectedHandler = (event) => {
        const vm = this;
        vm.setState({
            selectedFile: event.target.files[0]
        })
    }

    fileUploadHandler = async () => {
        const vm = this;
        let blob;
        try {
            blob = await toBase64(vm.state.selectedFile);
        } catch(err){
            console.log(err)
        }
        let setSF = photosRef.doc('test').set({
            data: blob,
          })

        axios.get('localhost:8080/photo')
        .then(res => {
            console.log(res);
        });
    }

    render() {
        const vm = this;
        return (
            <div className="App">
                <input type="file" onChange={vm.fileSelectedHandler}/>
                <button onClick={vm.fileUploadHandler}>Upload</button>
            </div>
        )
    }
}

export default Upload;

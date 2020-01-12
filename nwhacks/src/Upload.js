import React from 'react';
import axios from "axios";

import * as firebase from 'firebase';
var config = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
};
firebase.initializeApp(config);

 // Get a reference to the storage service, which is used to create references in your storage bucket
// var storage = firebase.storage();
// Create a root reference
var storageRef = firebase.storage().ref();
console.log("TCL: storageRef", storageRef)

// Create a reference to 'mountains.jpg'
var exampleRef = storageRef.child('example.jpg');
console.log("TCL: exampleRef", exampleRef)




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

    fileUploadHandler = () => {
        const vm = this;
        console.log(vm.state.selectedFile);
        const fd = new FormData();
        fd.append("image", vm.state.selectedFile,vm.state.selectedFile.name);
        var blob = new Blob([JSON.stringify(fd)], {type : 'image/*'});
        console.log("TCL: Upload -> fileUploadHandler -> blob", blob)
        exampleRef.put(blob).then(function(snapshot) {
            console.log('Uploaded a blob or file!');
        });
        // axios.post('https://nwhackbad.appspot.com/upload', fd)
        // .then(res => {
        //     console.log(res);
        // });
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

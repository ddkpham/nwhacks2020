import React from 'react';
import axios from "axios";


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
        axios.post('https://nwhackbad.appspot.com/upload', fd)
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

import React from 'react';
import axios from "axios";


class Upload extends React.Component {
    state = {
        selectedFile : null,
        drug_name: "",
        max_pills: "",
        curr_pills: "",
        dosage: "",

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

    formChangeHandler = (e) => {
        const vm = this;
         vm.setState({
            [e.target.name]: e.target.value
         })
    }

    render() {
        const vm = this;
        let forms = formComponent(vm);
        return (
            <div className="App">
                <input type="file" onChange={vm.fileSelectedHandler}/>
                <button onClick={vm.fileUploadHandler}>Upload</button>
                {forms}
            </div>
        )
    }
}

const formComponent = (vm) => {
    return (
        <form>
            <div className="form-row">
                <div className="col">
                    <input name="drug_name" type="text" className="form-control" placeholder="Drug Name" value={vm.state.drug_name} onChange={vm.formChangeHandler}/>
                </div>
                <div className="col">
                    <input name="max_pills" type="text" className="form-control" placeholder="Max Pills Per Day" value={vm.state.max_pills} onChange={vm.formChangeHandler}/>
                </div>
                <div className="col">
                    <input name="dosage" type="text" className="form-control" placeholder="Dosage" value={vm.state.dosage} onChange={vm.formChangeHandler}/>
                </div>
            </div>
        </form>

    );
}

export default Upload;

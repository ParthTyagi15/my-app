import './App.css'
import React, { useState, useEffect } from 'react'


function App() {

  const [ptext, setPtext] = useState({
    head: "",
    first: "",
    second: "",
  });
  const [selectedFile, setSelectedFile] = React.useState({
    file: [],
    filePreview: "https://as2.ftcdn.net/v2/jpg/03/71/52/39/1000_F_371523988_BoMoTd964YALdioGdOhzHTyunqXsRRqS.jpg",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(selectedFile.file);
    formData.append("file", selectedFile.file);

    fetch("http://localhost:8000", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((x) => {

        console.log(x[0]);
        console.log(x[1]);
        setPtext(
          {
            head: "Predictions :",
            first: "1. " + x[0]["image_prediction"] + " = " + x[0]["image_prediction_confidence"],
            second: "2. " + x[1]["image_prediction"] + " = " + x[1]["image_prediction_confidence"],
          }
        )
      })
      .catch((error) => {
        console.log(error);
        console.log("API Call Failed");
      });
  }



  return (

    <div className='page'>
      <div className='container'>
        <h1 className="heading">Image Detection App</h1>
        <br></br>

        <div className="img-holder">
          <img src={selectedFile.filePreview} width="224" alt="" id="img" className='img' />
        </div>
        <input name="img-up" id="upload_file" type="file" accept="image/*" onChange={
          (event) => setSelectedFile({ file: event.target.files[0], filePreview: URL.createObjectURL(event.target.files[0]), })
        } />
        <div className='label'>
          <label htmlFor="upload_file" className='image-upload'>
            <i className='material-icons'>add_photo_alternate</i>
            Upload your Image
          </label>
        </div>
        <button id="submit_file" type="submit" className="btn btn-dark" onClick={handleSubmit}>Upload</button>
        <div className='submit'>
          <label htmlFor="submit_file" className='upload'>
            <i className='material-icons'>file_upload</i>
            Get Predictions
          </label>

        </div>
        <div className='pred'>
          <b>
            {ptext.head}
            <br />
            {ptext.first}
            <br />
            {ptext.second}
          </b>
        </div>
      </div>
    </div>

  )

}
export default App

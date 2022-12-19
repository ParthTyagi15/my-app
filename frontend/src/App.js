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
    <div className="page">
      <section id="title">
        <div class="container-fluid">
          <nav class="navbar navbar-expand-lg navbar-dark">
            <a class="navbar-brand" href="">DETECT-I-MAGE</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link" href="https://parthtyagi15.github.io/CV-parth/">About me</a>
                </li>
              </ul>
            </div>
          </nav>
          <div class="row">
            <div class="col-lg-12 desc">
              <h1>Upload the image and get the predictions.</h1>
            </div>
          </div>
        </div>
      </section>
      <section class="main-body">
        <div class="container-fluid">
          <div className="img-holder">
            <img src={selectedFile.filePreview} width="224" alt="" id="img" className='img' />
            <input name="img-up" id="upload_file" type="file" accept="image/*" onChange={
              (event) => setSelectedFile({ file: event.target.files[0], filePreview: URL.createObjectURL(event.target.files[0]), })
            } />
            <button class="w-100 btn btn-block btn-lg btn-outline-light upload-btn">
              <label htmlFor="upload_file" className='image-upload'>
                <i class="fa-solid fa-image icon"></i> Upload your Image
              </label>
            </button>
            <button id="submit_file" type="submit" class="w-100 btn btn-block btn-lg btn-outline-light upload-btn" onClick={handleSubmit}>
              <i class="fa-solid fa-upload icon"></i> Get Predictions
            </button>
          </div>
        </div>
      </section>
      <section id="predictions">
        <div className='pred'>
          <b>
            {ptext.head}
            <br />
            {ptext.first}
            <br />
            {ptext.second}
          </b>
        </div>
      </section>
    </div>
  )

}
export default App

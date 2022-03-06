import React, { Component } from 'react';
import Particles from './components/Particles/Particles';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
//import SignIn from './components/SignIn/SignIn';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm' ;
import Rank from './components/Rank/Rank';
import './App.css';


class App extends  Component{
    constructor(){
      super();
      this.state = {
        input: '',
        imageUrl:'',
        box:{},
      }
    }
   
   onInputChange = (event) => {
      this.setState({input: event.target.value});
    }
    onSubmitButton = () => { this.setState({imageUrl: this.state.input});
      const raw = JSON.stringify({
      "user_app_id": {
        "user_id": "quingsley",
        "app_id": "jerome",
      },
      "inputs": [
        {
          "data": {
            "image": {
              "url": this.state.input,
            }
          }
        }
      ]
    });
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Key f7db891a0bbf4d79aec513e5c3a53c2b'
      },
      body: raw,
    };
    const calculateFaceLocation = (data) => {
       const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
       const image = document.getElementById('inputimage');
       const width = Number(image.width);
       const height = Number(image.height);
       console.log(width, height);
   }
   fetch("https://api.clarifai.com/v2/models/face-detection/outputs", requestOptions)
    .then(response => response.text())
    .then((result) => {calculateFaceLocation(JSON.parse(result, null, 2).outputs[0].data);
      console.log(JSON.parse(result,null, 2).outputs);
     }) 
    .catch(error => console.log(error));
}
    render() {
        return ( 
          <div className = "App" >
              <Particles className='particles'/>
              < Navigation / >
              {/*<SignIn />*/}
              < Logo / >
              <Rank />
              < ImageLinkForm 
                      onInputChange={this.onInputChange} 
                      onSubmitButton={this.onSubmitButton} 
              />
              < FaceRecognition imageUrl={this.state.imageUrl} />
          </div>
        );
    }
}

export default App;
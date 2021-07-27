import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Badges} from "./Badges";
import {DashBoard} from "./Dashboard";

class App extends React.Component<any, any> {

    constructor(props : any) {
        super(props)
        this.state = {address : ""}
    }

    updateAddress (address : string){
        this.setState({
            address : address
        })
    }

    render() {
       return (
            <div className="App">
                {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
                <DashBoard setAddress={(addr) => {
                    this.updateAddress(addr)
                }} />
                <Badges address={this.state.address}/>
            </div>
        )
    }
}


export default App;

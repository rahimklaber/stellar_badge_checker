import React from 'react';
import './App.css';
import {Badges} from "./Badges";
import {DashBoard} from "./Dashboard";

interface IAppState {
    address: string
    loggedIn: boolean
}

class App extends React.Component<any, IAppState> {

    constructor(props: any) {
        super(props)
        this.state = {address: "", loggedIn: false}
    }

    updateAddress(address: string, loggedIn: boolean) {
        this.setState({
            address: address
        })
    }

    render() {
        return (
            <div className="App">

                <header>
                    <h1 className="title">
                        Stellar Quest badge checker
                    </h1>
                </header>
                <div>
                    <Badges address={this.state.address}/>
                    <p>
                        hi
                    </p>
                    <DashBoard setAddress={(addr, albedo) => {
                        this.updateAddress(addr, albedo)
                    }}/>
                </div>

            </div>
        )
    }
}


export default App;

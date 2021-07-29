import React from 'react';
import './App.css';
import {Badges} from "./Badges";
import {DashBoard} from "./Dashboard";
import {BadgeAsset, checkAndGetBadges} from "./lib/getBadges";

interface IAppState {
    address: string
    loggedIn: boolean
    badges : Array<BadgeAsset>
}

class App extends React.Component<any, IAppState> {

    constructor(props: any) {
        super(props)
        this.state = {address: "", loggedIn: false,badges:[]}
        window.close = () => this.state.badges
    }

    componentDidMount() {
        this.loadBadges("")
    }

    updateAddress(address: string, loggedIn: boolean) {
        this.setState({
            address: address,
            loggedIn : loggedIn
        })
        this.loadBadges(address)
    }

    loadBadges(address: string){
        checkAndGetBadges(address).then(([assets,complete])=>{
            this.setState({
            badges : assets
            })
        }).catch(()=>console.log("failed to load address"))
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
                    <Badges badges={this.state.badges}/>
                    <p>
                        hi
                    </p>
                    <DashBoard badges={this.state.badges} setAddress={(addr, albedo) => {
                        this.updateAddress(addr, albedo)
                    }}/>
                </div>

            </div>
        )
    }
}


export default App;

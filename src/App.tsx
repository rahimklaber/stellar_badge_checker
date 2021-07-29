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
        // eslint-disable-next-line no-restricted-globals
        const search = location.search
        const params = new URLSearchParams(search)

        if(params.get("address")!==null){
            this.loadBadges(params.get("address") as string)
            this.setState({
                address: params.get("address") as string
            })
        }else{
            this.loadBadges("")
        }
    }

    updateAddress(address: string, loggedIn: boolean) {
        this.setState({
            address: address,
            loggedIn : loggedIn
        })
        this.loadBadges(address)
        this.clearPath()
        if(address !== ""){
            //todo
            // eslint-disable-next-line no-restricted-globals
            const search = location.search
            const params = new URLSearchParams(search)
            params.set("address",address)
            // eslint-disable-next-line no-restricted-globals
            const link = location.pathname + "?" + params.toString()
            // eslint-disable-next-line no-restricted-globals
            history.pushState(null,"",link)
        }

    }
    // set path to the base path
    clearPath(){
        // eslint-disable-next-line no-restricted-globals
        const link = location.pathname
        // eslint-disable-next-line no-restricted-globals
        history.pushState(null,"",link)
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
                    <h2 className="text">
                        {this.state.address}
                    </h2>
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

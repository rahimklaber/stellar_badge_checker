import React from 'react';
import './App.css';
import {Badges} from "./Badges";
import {DashBoard} from "./Dashboard";
import {BadgeAsset, checkAndGetBadges} from "./lib/getBadges";
import {IVerifyAttestationResult} from "./lib/verifyAttestation";
import {AttestationResult} from "./AttestationResult";

interface IAppState {
    address: string
    loggedIn: boolean
    badges: Array<BadgeAsset>
    attestResult: IVerifyAttestationResult
}

class App extends React.Component<any, IAppState> {

    constructor(props: any) {
        super(props)
        this.state = {
            address: "", loggedIn: false, badges: [], attestResult: {
                valid: false,
                date: new Date(),
                address: "",
                token: "",
                badges: []
            }
        }
    }

    componentDidMount() {
        // eslint-disable-next-line no-restricted-globals
        const search = location.search
        const params = new URLSearchParams(search)

        if (params.get("address") !== null) {
            this.loadBadges(params.get("address") as string)
            this.setState({
                address: params.get("address") as string
            })
        } else {
            this.loadBadges("")
        }
    }

    updateAddress(address: string, loggedIn: boolean) {
        this.setState({
            address: address,
            loggedIn: loggedIn
        })
        this.loadBadges(address)
        this.clearPath()
        if (address !== "") {
            //todo
            // eslint-disable-next-line no-restricted-globals
            const search = location.search
            const params = new URLSearchParams(search)
            params.set("address", address)
            // eslint-disable-next-line no-restricted-globals
            const link = location.pathname + "?" + params.toString()
            // eslint-disable-next-line no-restricted-globals
            history.pushState(null, "", link)
        }

    }

    // set path to the base path
    clearPath() {
        // eslint-disable-next-line no-restricted-globals
        const link = location.pathname
        // eslint-disable-next-line no-restricted-globals
        history.pushState(null, "", link)
    }

    updateAttestResult(attestResult: IVerifyAttestationResult) {
        this.setState({
            attestResult
        })
        this.loadBadges(attestResult.address)
    }

    loadBadges(address: string) {
        checkAndGetBadges(address).then(([assets, complete]) => {
            this.setState({
                badges: assets
            })
        }).catch(() => console.log("failed to load address"))
    }

    render() {
        return (
            <div className="App">

                <AttestationResult attestResult={this.state.attestResult}/>

                <h1 className="title">
                    Stellar Quest badge checker
                </h1>
                <Badges badges={this.state.badges}/>
                <DashBoard badges={this.state.badges} setAddress={(addr, albedo) => this.updateAddress(addr, albedo)}
                           updateAttestResult={(attestRes => this.updateAttestResult(attestRes))}/>

            </div>
        )
    }
}


export default App;

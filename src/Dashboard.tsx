import React from "react";
import {AppBar, Backdrop, Button, Container} from "@material-ui/core";
import {getAlbedoPublicKey} from "./lib/albedo";
import "./DashBoard.css"
import {shorten} from "./lib/utils";
import {Attestation} from "./Attestation"
import {BadgeAsset} from "./lib/getBadges";
interface IDashBoardProp {
    setAddress: (addr: string, albedo: boolean) => void
    badges : Array<BadgeAsset>
}

interface IDashBoardState {
    address: string
    loggedIn: boolean
    attestationOpen : boolean
}

export class DashBoard extends React.Component<IDashBoardProp, IDashBoardState> {
    constructor(props: any) {
        super(props);
        this.state = {address: "", loggedIn: false, attestationOpen : false}
    }

    closeAttestation(){
        this.setState({
            attestationOpen : false
        })
    }

    openAttestation(){
        this.setState({
            attestationOpen : true
        })
    }

    render() {
        const albedoButtonText = this.state.loggedIn ? shorten(this.state.address) : "Connect with Albedo"
        return (
            <AppBar position="sticky" className="DashBoard">
                <Container>
                    {/*<TextField variant="outlined"*/}
                    {/*           onChange={(event) => this.setState({address: event.target.value})}/>*/}
                    {/*<Button color="primary"*/}
                    {/*        onClick={() => this.props.setAddress(this.state.address, false)}>*/}
                    {/*    <b  className="text">Load</b>*/}
                    {/*</Button>*/}

                    <div className="grow"/>
                    <Button color="primary"
                            onClick={() => {
                                // logout
                                if (this.state.loggedIn){
                                    this.setState({
                                        loggedIn : false,
                                        address: ""
                                    })
                                    this.props.setAddress("",false)
                                    return
                                }
                                    getAlbedoPublicKey().then(address => {
                                        this.props.setAddress(address, true)
                                        this.setState({
                                            loggedIn: true,
                                            address: address
                                        })
                                    })
                            }}>
                        <b className="text">{albedoButtonText}</b>
                    </Button>

                    <Button color="primary" onClick={() => {
                        if (!this.state.loggedIn) {
                            alert("Connect with albedo first")
                            return
                        }
                        this.openAttestation()

                    }}>
                        <b className="text">Create attestation</b>
                    </Button>
                    <Backdrop open={this.state.attestationOpen} onClick={()=>""}>
                        <Attestation badges={this.props.badges} address={this.state.address} close={()=> this.closeAttestation()}/>
                    </Backdrop>

                </Container>


            </AppBar>

        )
    }
}
import React from "react";
import {AppBar, Button, Container, TextField} from "@material-ui/core";
import {getAlbedoPublicKey} from "./lib/albedo";
import "./DashBoard.css"
import {shorten} from "./lib/utils";

interface IDashBoardProp {
    setAddress: (addr: string, albedo: boolean) => void
}

interface IDashBoardState {
    address: string
    loggedIn: boolean
}

export class DashBoard extends React.Component<IDashBoardProp, IDashBoardState> {
    constructor(props: any) {
        super(props);
        this.state = {address: "",loggedIn: false}
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
                            onClick={() => getAlbedoPublicKey().then(address => {
                                this.props.setAddress(address, true)
                                this.setState({
                                    loggedIn : true,
                                    address : address
                                })
                                console.log(this.state.address)
                            })}>
                        <b className="text" >{albedoButtonText}</b>
                    </Button>

                    <Button color="primary">
                        <b className="text">Create attestation</b>
                    </Button>
                </Container>


            </AppBar>

        )
    }
}
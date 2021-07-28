import React from "react";
import {AppBar, Button, Container, TextField} from "@material-ui/core";
import {getAlbedoPublicKey} from "./lib/albedo";
import "./DashBoard.css"

interface IDashBoardProp {
    setAddress: (addr: string, albedo: boolean) => void
}

interface IDashBoardState {
    addressFromField: string
}

export class DashBoard extends React.Component<IDashBoardProp, IDashBoardState> {
    constructor(props: any) {
        super(props);
        this.state = {addressFromField: ""}
    }

    render() {

        return (
            <AppBar position="sticky" className="DashBoard">
                <Container>
                    <TextField variant="outlined"
                               onChange={(event) => this.setState({addressFromField: event.target.value})}/>
                    <Button color="primary"
                            onClick={() => this.props.setAddress(this.state.addressFromField, false)}>
                        <b  className="text">Load</b>
                    </Button>

                    {/*<div/>*/}
                    <Button color="primary"
                            onClick={() => getAlbedoPublicKey().then(address => this.props.setAddress(address, true))}>
                        <b className="text" >Connect With Albedo</b>
                    </Button>

                    <Button color="primary">
                        <b className="text">Create attestation</b>
                    </Button>
                </Container>


            </AppBar>

        )
    }
}
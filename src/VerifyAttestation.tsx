import React from "react";
import {Button, Card, CardActions, CardContent, TextField} from "@material-ui/core";
import "./VerifyAttestation.css"
import {BadgeAsset} from "./lib/getBadges";
import {createAttestation} from "./lib/createAttestation";

interface IVerifyAttestationProps {
    close: () => void
    address: string
    badges: Array<BadgeAsset>
}

interface IVerifyAttestationState {
    identifier: string
    token: string
}

export class VerifyAttestation extends React.Component<IVerifyAttestationProps, IVerifyAttestationState> {

    constructor(props: IVerifyAttestationProps) {
        super(props);
        this.state = {identifier: "", token: ""}
    }


    render() {

        return (
            <Card>
                <CardContent className="attestation">
                    <h2 className="text">
                        Generate an attestation
                    </h2>
                    <h3 className="text">
                        Add a token to make the attestation unique
                    </h3>
                    <TextField className="text" variant="filled" label="Identifier"/>
                    <div id="qrcode"/>
                </CardContent>
                <CardActions className="bottomRow">
                    <Button className="attestButton" >
                        <b className="text">Create attestation</b>
                    </Button>
                    <div className="grow"/>
                    <Button className="attestButton" onClick={this.props.close}>
                        <b className="text">Cancel</b>
                    </Button>
                </CardActions>

            </Card>
        )
    }
}
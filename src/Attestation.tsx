import React from "react";
import {Button, Card, CardActions, CardContent, TextField} from "@material-ui/core";
import "./Attestation.css"
import {BadgeAsset} from "./lib/getBadges";
import {createAttestation} from "./lib/createAttestation";

interface IAttestationProps {
    close: () => void
    address: string
    badges: Array<BadgeAsset>
}

interface IAttestationState {
    identifier: string
    token: string
}

export class Attestation extends React.Component<IAttestationProps, IAttestationState> {

    constructor(props: IAttestationProps) {
        super(props);
        this.state = {identifier: "", token: ""}
    }

    updateIdentifier(identifier: string) {
        this.setState({
            identifier
        })
    }

    /**
     * generate and download the attestation
     */
    generateAttestation() {
        createAttestation(this.props.address, this.props.badges, this.state.identifier)
            .then(token => {
                this.setState({
                    token
                })
                const now = Date.now()
                const file = new File([token],`${this.props.address}_quest_token_${now.valueOf()}.txt`, {type: "application/octet-stream"})
                // eslint-disable-next-line no-restricted-globals
                location.href=URL.createObjectURL(file)
            })

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
                    <TextField className="text" variant="filled" label="Identifier"
                               onChange={(event) => this.updateIdentifier(event.target.value)}/>
                    <div id="qrcode"/>
                </CardContent>
                <CardActions className="bottomRow">
                    <Button className="attestButton" onClick={() => this.generateAttestation()}>
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
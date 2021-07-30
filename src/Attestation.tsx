import React from "react";
import {Button, Card, CardActions, CardContent, TextField} from "@material-ui/core";
import "./Attestation.css";
import {BadgeAsset} from "./lib/getBadges";
import {createAttestation} from "./lib/createAttestation";
import {saveAs} from "file-saver";

interface IAttestationProps {
    close: () => void
    address: string
    badges: Array<BadgeAsset>
}

interface IAttestationState {
    identifier: string
    attestation: string
}

/**
 * Component to create an attestation.
 */
export class Attestation extends React.Component<IAttestationProps, IAttestationState> {

    constructor(props: IAttestationProps) {
        super(props);
        this.state = {identifier: "", attestation: ""}
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
            .then(attestation => {
                this.setState({
                    attestation
                })
                const now = Date.now()
                // const file = new File([attestation], `${this.props.address}_quest_attestation_${now.valueOf()}.txt`, {type: "text/plain"})
                const blob = new Blob([attestation], {type: "text/plain"})
                saveAs(blob, `${this.props.address}_quest_attestation_${now.valueOf()}.txt`)
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
                </CardContent>
                <CardActions className="bottomRow">
                    <Button className="attestButton" onClick={() => this.generateAttestation()}>
                        <b className="text">Create attestation</b>
                    </Button>
                    <div className="grow"/>
                    <Button className="attestButton" onClick={this.props.close}>
                        <b className="text">Close</b>
                    </Button>
                </CardActions>

            </Card>
        )
    }
}
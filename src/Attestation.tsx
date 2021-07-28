import React from "react";
import {Button, Card, CardActions, CardContent, TextField} from "@material-ui/core";
import "./Attestation.css"

interface IAttestationProps {
    close : () => void
    address: string
}

export class Attestation extends React.Component<IAttestationProps, any> {


    render() {
        return (
            <Card >
                <CardContent className="attestation">
                    <h2 className="text">
                        Generate an attestation
                    </h2>
                    <h3 className="text">
                        Add a token to make the attestation unique
                    </h3>
                    <TextField className="text" variant="filled" label="Identifier"/>
                </CardContent>
                <CardActions className="bottomRow">
                    <Button className="attestButton">
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
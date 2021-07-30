import React from "react";
import {AppBar, Button, Container} from "@material-ui/core";
import "./AttestationResult.css"
import {IVerifyAttestationResult} from "./lib/verifyAttestation";


interface IAttestationResultProps {
    attestResult: IVerifyAttestationResult
    close: () => void
}

/**
 * Component which shows the result of verifying an Attestation
 */
export class AttestationResult extends React.Component<IAttestationResultProps, any> {

    render() {

        const info =  <Container className="attestationInfo">
            {`Date created: ${this.props.attestResult.date.toDateString()}`}<br/>
            {this.props.attestResult.token === "" ? "No extra data was used to generate the attestation" : `Extra data used to generate attestation: ${this.props.attestResult.token}`}<br/>

            {"View validated badges below"}
        </Container>

        return (
            <AppBar position="sticky" className="AttestationResult">
                <div>
                    <h2 className="text">
                        {this.props.attestResult.valid ? `Attestation for ${this.props.attestResult.address} validated` : `Attestation for ${this.props.attestResult.address} not validated`}
                    </h2>
                    {this.props.attestResult.valid ? info : null}
                    <Button onClick={this.props.close}>
                        <b className="text">Close</b>
                    </Button>
                </div>

            </AppBar>

        )
    }
}
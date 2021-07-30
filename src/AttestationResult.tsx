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
        return (
            <AppBar position="sticky" className="AttestationResult">
                <div>
                    <h2 className="text">
                        {this.props.attestResult.valid ? `Attestation for ${this.props.attestResult.address} validated` : `Attestation for ${this.props.attestResult.address} not validated`}
                    </h2>
                    <Container className="attestationInfo">
                        {`Created on: ${this.props.attestResult.date}`}<br/>
                        {this.props.attestResult.token === "" ? "No token was used to generate the attestation" : `Token: ${this.props.attestResult.token}`}<br/>

                        View account badges below
                    </Container>
                    <Button onClick={this.props.close}>
                        <b className="text">Close</b>
                    </Button>
                </div>

            </AppBar>

        )
    }
}
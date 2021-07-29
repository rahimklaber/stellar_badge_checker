import React from "react";
import {AppBar, Container} from "@material-ui/core";
import "./AttestationResult.css"
import {IVerifyAttestationResult} from "./lib/verifyAttestation";


interface IAttestationResultProps {
    attestResult: IVerifyAttestationResult
}

export class AttestationResult extends React.Component<IAttestationResultProps, any> {

    render() {
        return (
            <AppBar position="sticky" className="AttestationResult">
                <Container>
                    <h2 className="text">
                        {this.props.attestResult.valid ? `Attestation for ${this.props.attestResult.address} validated` : `Attestation for ${this.props.attestResult.address} not validated`}
                    </h2>
                    <p className="text">
                        {`Created on: ${this.props.attestResult.date}`}<br/>
                        {`Token: ${this.props.attestResult.token}`}<br/>

                        View account badges below
                    </p>
                </Container>


            </AppBar>

        )
    }
}
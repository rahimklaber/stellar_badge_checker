import React from "react";
import {Button, Card, CardActions, CardContent, TextField} from "@material-ui/core";
import "./VerifyAttestation.css"
import {IVerifyAttestationResult, verifyAttestation} from "./lib/verifyAttestation";

interface IVerifyAttestationProps {
    close: () => void
    updateAttestResult : (attestRes: IVerifyAttestationResult) => void
}

interface IVerifyAttestationState {
    attestation: string
    attestResult: IVerifyAttestationResult
}

/**
 * Component where you can input an attestation to verify.
 */
export class VerifyAttestation extends React.Component<IVerifyAttestationProps, IVerifyAttestationState> {

    constructor(props: IVerifyAttestationProps) {
        super(props);
        this.state = {
            attestation: "", attestResult: {
                valid: false,
                date: new Date(),
                address: "",
                token: "",
                badges: [],
                attestationString: ""
            }
        }
    }

    verify() {
        verifyAttestation(this.state.attestation)
            .then((res) => {
                console.log(res)
                this.setState({
                    attestResult: res
                })
                this.props.updateAttestResult(res)
                this.props.close()
            })
    }

    updateToken(attestation: string) {
        this.setState({
            attestation
        })
    }

    render() {


        return (
            <Card>
                <CardContent className="attestation">
                    <h2 className="text">
                        Verify an attestation
                    </h2>
                    <TextField onChange={(event) => this.updateToken(event.target.value)} className="text"
                               variant="filled" label="Attestation"/>

                </CardContent>
                <CardActions className="bottomRow">
                    <Button className="attestButton" onClick={() => this.verify()}>
                        <b className="text">Verify</b>
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
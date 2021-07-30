import React from "react";
import {Button, Card, CardActions, CardContent, TextField} from "@material-ui/core";
import "./VerifyAttestation.css"
import {IVerifyAttestationResult, verifyAttestation} from "./lib/verifyAttestation";

interface IVerifyAttestationProps {
    close: () => void
    updateAttestResult : (attestRes: IVerifyAttestationResult) => void
}

interface IVerifyAttestationState {
    token: string
    attestResult: IVerifyAttestationResult
}

/**
 * Component where you can input an attestation to verify.
 */
export class VerifyAttestation extends React.Component<IVerifyAttestationProps, IVerifyAttestationState> {

    constructor(props: IVerifyAttestationProps) {
        super(props);
        this.state = {
            token: "", attestResult: {
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
        verifyAttestation(this.state.token)
            .then((res) => {
                console.log(res)
                this.setState({
                    attestResult: res
                })
                this.props.updateAttestResult(res)
                this.props.close()
            })
    }

    updateToken(token: string) {
        this.setState({
            token
        })
    }

    render() {

        const attestation  = this.state.attestResult.address !== "" ? <div>{"attestation is valid: " + this.state.attestResult.valid.toString()}</div> : <div/>

        return (
            <Card>
                <CardContent className="attestation">
                    <h2 className="text">
                        Verify an attestation
                    </h2>
                    <TextField onChange={(event) => this.updateToken(event.target.value)} className="text"
                               variant="filled" label="Attestation"/>
                    <div id="qrcode"/>
                    {attestation}

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
import React from "react";
import {Button, Card, CardActions, CardContent} from "@material-ui/core";
import "./VerifyAttestation.css"
import {IVerifyAttestationResult, verifyAttestation} from "./lib/verifyAttestation";
import {FilePond} from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import {FilePondFile} from "filepond";

interface IVerifyAttestationProps {
    close: () => void
    updateAttestResult: (attestRes: IVerifyAttestationResult) => void
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
        if(this.state.attestation === ""){
            alert("Please upload an attestation")
            return
        }
        verifyAttestation(this.state.attestation)
            .then((res) => {
                this.setState({
                    attestResult: res
                })
                this.props.updateAttestResult(res)
                this.props.close()
            })
    }

    /**
     * Extract attestation string from file.
     */
    updateAttestationFile(file: Array<FilePondFile>) {
        if(file.length === 0){
            this.setState({
                attestation : ""
            })
            return
        }
        file[0].file.text()
            .then((attestation) => {
                console.log(attestation)
                this.setState({
                    attestation
                })
            })
    }

    render() {
        return (
            <Card>
                <CardContent className="attestation">
                    <h2 className="text">
                        Upload attestation file to verify
                    </h2>
                    <FilePond
                        onupdatefiles={(files)=>this.updateAttestationFile(files)}
                        allowMultiple={false}
                    />
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
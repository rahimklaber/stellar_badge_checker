import React from "react";
import {Button, Card, CardActions, CardContent, TextField} from "@material-ui/core";
import "./Attestation.css"
import {BadgeAsset} from "./lib/getBadges";
import {createAttestation} from "./lib/createAttestation";

interface IAttestationProps {
    close : () => void
    address: string
    badges : Array<BadgeAsset>
}

interface IAttestationState{
    identifier : string
}

export class Attestation extends React.Component<IAttestationProps, IAttestationState> {

    constructor(props : IAttestationProps) {
        super(props);
        this.state = {identifier: ""}
    }

    updateIdentifier(identifier:string){
        this.setState({
            identifier
        })
    }

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
                    <TextField className="text" variant="filled" label="Identifier" onChange={(event)=>this.updateIdentifier(event.target.value)}/>
                </CardContent>
                <CardActions className="bottomRow">
                    <Button className="attestButton" onClick={()=> createAttestation(this.props.address,this.props.badges,this.state.identifier)}>
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
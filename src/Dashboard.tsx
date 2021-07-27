import React from "react";
import {Card, CardContent, CardMedia, Grid, makeStyles,TextField,Button} from "@material-ui/core";
import {Asset} from "stellar-sdk";
import {BadgeAsset, checkAndGetBadges} from "./lib/getBadges";
import {getAlbedoPublicKey} from "./lib/albedo";
import "./DashBoard.css"
import {shorten} from "./lib/utils";

interface IDashBoardProp {
    setAddress : (addr : string) => void
}

interface IDashBoardState {

}

export class DashBoard extends React.Component<IDashBoardProp, IDashBoardState> {
     constructor(props: any) {
        super(props);
        this.state = {}
    }

    render() {

        return (
            <Card>

                <TextField>

                </TextField>
                <Button color="primary" onClick={() => getAlbedoPublicKey().then(address => this.props.setAddress(address))}>
                    Connect With Albedo
                </Button>
            </Card>
        )
    }
}
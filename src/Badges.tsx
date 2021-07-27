import React from "react";
import {Card, CardContent, CardMedia, Grid, makeStyles} from "@material-ui/core";
import {Asset} from "stellar-sdk";
import {BadgeAsset, checkAndGetBadges} from "./lib/getBadges";
import {getAlbedoPublicKey} from "./lib/albedo";
import "./Badges.css"
import {shorten} from "./lib/utils";


export class Badges extends React.Component<any, any> {
     constructor(props: any) {
        super(props);
        this.state = {assets: [],valid: false}
    }

    componentDidMount() {
        getAlbedoPublicKey().then(address => {
            return checkAndGetBadges(address)
        }).then(([assets,complete]) => {
            this.setState({assets : assets,valid:complete})
        })
    }


    render() {
        const assetComponent = this.state.assets.map((asset: BadgeAsset) => {
            const header = !asset.valid ? <div className="badges-not-valid">not valid</div> : <div className="badges-valid">valid</div>
            const txLink = asset.valid ? <a href={`https://stellar.expert/explorer/public/tx/${asset.txHash}`} target="_blank">{shorten(asset.txHash as string)}</a> : <div></div>
            return <Grid item>
                <Card key={asset.code}>
                    {header}
                    <CardMedia
                        className="image"
                    image={asset.getImageUrl()}
                    title="test"
                    />
                    <CardContent >
                        {asset.code}<br/>
                        {txLink}
                    </CardContent>
                </Card>
            </Grid>

        })
        const header = !this.state.valid ? <div className="badges-not-valid">not validated</div> : <div className="badges-valid">validated</div>
        return (
            <div>
                {header}
                <Grid container spacing={3}>
                    {assetComponent}
                </Grid>
            </div>
        )
    }
}
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
        // series 1..3 are assets for those series
        this.state = {assets: [],series1: [], series2: [], series3 :[],valid: false}
    }

    componentDidMount() {
        getAlbedoPublicKey().then(address => {
            return checkAndGetBadges(address)
        }).then(([assets,complete]) => {
            this.setState({assets : assets,valid:complete,series1:assets.slice(0,8),series2:assets.slice(8,16), series3:assets.slice(16,24)})
        })
    }


    createAssetComponentsGrid(assets: Array<BadgeAsset>){
        const assetComponent = assets.map((asset: BadgeAsset) => {
            const header = !asset.valid ? <div className="badges-not-valid">not valid</div> : <div className="badges-valid">valid</div>
            const txLink = asset.valid ? <a href={`https://stellar.expert/explorer/public/tx/${asset.txHash}`} target="_blank">{shorten(asset.txHash as string)}</a> : <div></div>
            return <Grid item  key={asset.code}>
                <Card>
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
        return assetComponent
    }

    render() {
        const series1AssetGrid = this.createAssetComponentsGrid(this.state.series1)
        const series2AssetGrid = this.createAssetComponentsGrid(this.state.series2)
        const series3AssetGrid = this.createAssetComponentsGrid(this.state.series3)

        const header = !this.state.valid ? <div className="badges-not-valid">not validated</div> : <div className="badges-valid">validated</div>
        return (
            <div>
                {header}
                <h2>
                    Series 1
                </h2>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    {series1AssetGrid}
                </Grid>
                <h2>
                    Series 2
                </h2>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    {series2AssetGrid}
                </Grid>
                <h2>
                    Series 3
                </h2>
                <Grid container spacing={3} justifyContent="center" alignItems="center">
                    {series3AssetGrid}
                </Grid>
            </div>
        )
    }
}
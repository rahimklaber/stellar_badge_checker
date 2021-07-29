import React from "react";
import {Card, CardContent, CardMedia, Grid} from "@material-ui/core";
import {BadgeAsset} from "./lib/getBadges";
import "./Badges.css"
import {shorten} from "./lib/utils";

interface IBadgesProps {
    badges: Array<BadgeAsset>
}

interface IBadgesState{
    series1: Array<BadgeAsset>
    series2: Array<BadgeAsset>
    series3: Array<BadgeAsset>
}
export class Badges extends React.Component<IBadgesProps, IBadgesState> {
    constructor(props: IBadgesProps) {
        super(props);
        // series 1..3 are assets for those series
        this.state = {series1: [], series2: [], series3: []}
    }

    static getDerivedStateFromProps(props: IBadgesProps , state: IBadgesState) : IBadgesState{
        return {
            series1 : props.badges.slice(0,8),
            series2: props.badges.slice(8,16),
            series3: props.badges.slice(16,24)
        }
    }



    createAssetComponentsGrid(assets: Array<BadgeAsset>) {
        return assets.map((asset: BadgeAsset) => {
            const txLink = asset.valid ? <a href={`https://stellar.expert/explorer/public/tx/${asset.txHash}`}
                                            target="_blank" rel="noreferrer">{shorten(asset.txHash as string)}</a> : <div className="text-transparent">hi</div>
            const cssClass = asset.valid ? "badge" : "badge-invalid"
            return <Grid item key={asset.code}>
                <Card className={cssClass}>
                    {/*{header}*/}
                    <CardMedia
                        className="image"
                        image={asset.getImageUrl()}
                        title={asset.code}
                    />
                    <CardContent>
                        <b className="text">{"Quest ".concat(asset.code.slice(asset.code.length-1,asset.code.length))}</b><br/>
                        {txLink}
                    </CardContent>
                </Card>
            </Grid>

        })
    }

    render() {
        const series1AssetGrid = this.createAssetComponentsGrid(this.state.series1)
        const series2AssetGrid = this.createAssetComponentsGrid(this.state.series2)
        const series3AssetGrid = this.createAssetComponentsGrid(this.state.series3)


        return (
            <div className="badges">
                <h2 className="text">
                    Series 1
                </h2>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {series1AssetGrid}
                </Grid>
                <h2 className="text">
                    Series 2
                </h2>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {series2AssetGrid}
                </Grid>
                <h2 className="text">
                    Series 3
                </h2>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {series3AssetGrid}
                </Grid>
            </div>
        )
    }
}
import React from "react";
import {Card, CardContent, CardMedia, Grid} from "@material-ui/core";
import {BadgeAsset, checkAndGetBadges} from "./lib/getBadges";
import "./Badges.css"
import {shorten} from "./lib/utils";

interface IBadgesProps {
    address: string
}

export class Badges extends React.Component<IBadgesProps, any> {
    constructor(props: any) {
        super(props);
        // series 1..3 are assets for those series
        this.state = {assets: [], series1: [], series2: [], series3: [], valid: false}
    }

    componentDidMount() {
        checkAndGetBadges(this.props.address).then(([assets, complete]) => {
            this.setState({
                assets: assets,
                valid: complete,
                series1: assets.slice(0, 8),
                series2: assets.slice(8, 16),
                series3: assets.slice(16, 24)
            })
        }).catch(err => console.log("Loaded assets"))
    }

    loadBadges(){
       checkAndGetBadges(this.props.address).then(([assets, complete]) => {
           this.setState({
               assets: assets,
               valid: complete,
               series1: assets.slice(0, 8),
               series2: assets.slice(8, 16),
               series3: assets.slice(16, 24)
           })
       }).catch(err => console.log("failed to load assets; check the address"))
   }

    /**
     * load badges when an address has been passed to the object
     */
   componentDidUpdate(prevProps: Readonly<IBadgesProps>) {
       if(prevProps.address !== this.props.address && this.props.address !== ""){
           this.loadBadges()
       }
   }

    createAssetComponentsGrid(assets: Array<BadgeAsset>) {
        return assets.map((asset: BadgeAsset) => {
            const header = !asset.valid ? <div className="badges-not-valid">not valid</div> :
                <div className="badges-valid">valid</div>
            const txLink = asset.valid ? <a href={`https://stellar.expert/explorer/public/tx/${asset.txHash}`}
                                            target="_blank">{shorten(asset.txHash as string)}</a> : <div></div>
            return <Grid item key={asset.code}>
                <Card className="badge">
                    {header}
                    <CardMedia
                        className="image"
                        image={asset.getImageUrl()}
                        title="test"
                    />
                    <CardContent>
                        {asset.code}<br/>
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
            <div>
                <h2 className="text">
                    Series 1
                </h2>
                <Grid container spacing={1} justifyContent="center" alignItems="center">
                    {series1AssetGrid}
                </Grid>
                <h2 className="text">
                    Series 2
                </h2>
                <Grid container spacing={1} justifyContent="center" alignItems="center">
                    {series2AssetGrid}
                </Grid>
                <h2 className="text">
                    Series 3
                </h2>
                <Grid container spacing={1} justifyContent="center" alignItems="center">
                    {series3AssetGrid}
                </Grid>
            </div>
        )
    }
}
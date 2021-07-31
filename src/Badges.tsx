import React from "react";
import {Card, CardContent, CardMedia, Container, Grid, Switch} from "@material-ui/core";
import {BadgeAsset} from "./lib/getBadges";
import "./Badges.css";

interface IBadgesProps {
    badges: Array<BadgeAsset>
}

interface IBadgesState {
    series1: Array<BadgeAsset>
    series2: Array<BadgeAsset>
    series3: Array<BadgeAsset>
    series1mono: Array<BadgeAsset>
    series2mono: Array<BadgeAsset>
    viewSeries1mono: boolean
    viewSeries2mono: boolean
}

/**
 * Component to view Stellar Quest badges.
 */
export class Badges extends React.Component<IBadgesProps, IBadgesState> {
    constructor(props: IBadgesProps) {
        super(props);
        // series 1..3 are assets for those series
        this.state = {
            series1: [],
            series2: [],
            series3: [],
            series1mono: [],
            series2mono: [],
            viewSeries1mono: false,
            viewSeries2mono: false
        }
    }

    static getDerivedStateFromProps(props: IBadgesProps, state: IBadgesState): IBadgesState {
        return {
            series1: props.badges.slice(0, 8),
            series2: props.badges.slice(8, 16),
            series3: props.badges.slice(16, 24),
            series1mono: props.badges.slice(24, 32),
            series2mono: props.badges.slice(32, 40),
            viewSeries1mono: state.viewSeries1mono,
            viewSeries2mono: state.viewSeries2mono
        }
    }


    createAssetComponentsGrid(assets: Array<BadgeAsset>) {
        return assets.map((asset: BadgeAsset) => {
            const txLink = asset.valid ? <a href={`https://stellar.expert/explorer/public/tx/${asset.txHash}`}
                                            target="_blank" rel="noreferrer">{"view Tx"}</a> :
                <div className="text-transparent noselect">_</div> // _ is to keep the height consistent
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
                        <b className="text">{"Quest ".concat(asset.code.slice(asset.code.length - 1, asset.code.length))}</b><br/>
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
        const series1monoAssetGrid = this.createAssetComponentsGrid(this.state.series1mono)
        const series2monoAssetGrid = this.createAssetComponentsGrid(this.state.series2mono)

        const series1MonoOrNormal = this.state.viewSeries1mono ? series1monoAssetGrid : series1AssetGrid
        const series2MonoOrNormal = this.state.viewSeries2mono ? series2monoAssetGrid : series2AssetGrid


        return (
            <div className="badges">
                <Container>
                    <h2 className="monochrome-series-title">
                        Series 1
                    </h2>
                    <div className="monochrome-series-header">
                        <span className="text"><b>Monochrome</b></span>
                        <Switch
                            checked={this.state.viewSeries1mono}
                            onChange={(event) => {
                                this.setState({
                                    viewSeries1mono: event.target.checked
                                })
                            }
                            }
                        />
                    </div>
                </Container>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {series1MonoOrNormal}
                </Grid>
                <Container>
                    <h2 className="monochrome-series-title">
                        Series 2
                    </h2>
                    <div className="monochrome-series-header">
                        <span className="text"><b>Monochrome</b></span>
                        <Switch
                            checked={this.state.viewSeries2mono}
                            onChange={(event) => {
                                this.setState({
                                    viewSeries2mono: event.target.checked
                                })
                            }
                            }
                        />
                    </div>
                </Container>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    {series2MonoOrNormal}
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
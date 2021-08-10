import {server} from "./stellar";
import {badges, monoBadges} from "./badgeAssets";
import {AccountResponse, Asset} from "stellar-sdk";

/**
 * Class to represent a Badge
 * @property txHash hash where the badge was rewarded
 * @property valid whether the user has gotton the badge from stellar quest or not
 */
export class BadgeAsset extends Asset {
    txHash?: string
    valid?: boolean
    mono: boolean
    private _imageUrl = ""

    constructor(code: string, issuer: string, mono: boolean, txHash?: string, valid?: boolean) {
        super(code, issuer)
        this.txHash = txHash
        this.valid = valid
        this.mono = mono
    }

    getImageUrl(): string {
        if (this._imageUrl !== "") {
            return this._imageUrl
        } else {
            let nftversion: string = ""
            if (this.mono) {
                nftversion = " 2"
            } else if (this.code.startsWith("SQ01")) {
                nftversion = "1"
            } else if (this.code.startsWith("SQ02")) {
                nftversion = "2"
            } else if (this.code.startsWith("SQ03")) {
                nftversion = "3"
            }

            this._imageUrl = `https://api.stellar.quest/badge/${this.issuer}?network=public&v=${nftversion}`
            return this._imageUrl
        }
    }

}

/**
 * Check if the account has all the badges and return the badges that it has.
 *
 *
 * @param address address to check
 * @return Pair of list of assets and boolean to indicate whether all assets are here
 */
export async function checkAndGetBadges(address: string): Promise<Array<BadgeAsset>> {
    let account: AccountResponse | null
    if(address === ""){
        account = null
    }else{
        account = await server.loadAccount(address).catch(() => {
            return null
        })
    }

    const balances = account?.balances
    const accountBadgeAssets: Array<BadgeAsset> = badges.map(badge => new BadgeAsset(badge.asset_code, badge.asset_issuer, false))
    const monoBadgeAssets = monoBadges.map(badge => new BadgeAsset(badge.asset_code, badge.asset_issuer, true))
    accountBadgeAssets.push(...monoBadgeAssets)

    if (account == null) {
        return accountBadgeAssets
    }

    //get all sq badges that the account has
    balances?.forEach(bal => {
        if (bal.asset_type !== "native") {
            const foundBadgeAsset = accountBadgeAssets.find(badge => badge.code === bal.asset_code && badge.issuer === bal.asset_issuer)
            if (foundBadgeAsset !== undefined) {
                foundBadgeAsset.valid = true
            }
        }
    })

    // get all payments to check whether the badge is valid
    const payments = await server.payments().forAccount(account.accountId()).limit(200).call()
    const badgePaymentsToMe = payments.records.filter(op => {
        if (op.type !== "payment") {
            return false
        }
        if (op.to !== account?.accountId()) {
            return false
        }
        if (!badges.some(({
                              asset_code,
                              asset_issuer
                          }) => asset_code === op.asset_code && asset_issuer === op.asset_issuer)) {
            return false
        }
        if (!badges.some(({asset_code, asset_issuer}) => asset_issuer === op.from)) {
            return false
        }
        return true
    })

    accountBadgeAssets.forEach(asset => {
        const foundPayment = badgePaymentsToMe.find(badgePayment => badgePayment.asset_code === asset.code && badgePayment.asset_issuer === asset.issuer)
        if (foundPayment !== undefined) {
            asset.txHash = foundPayment.transaction_hash
        }
    })
    let numberOfValidBadges = 0
    accountBadgeAssets.forEach(badge => {
        numberOfValidBadges = numberOfValidBadges + (badge.valid ? 1 : 0)
    })

    return accountBadgeAssets

}
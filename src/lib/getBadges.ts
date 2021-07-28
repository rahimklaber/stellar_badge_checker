import {server} from "./stellar";
import {badges, numberOfQuestBadges} from "./badgeAssets";
import {Asset} from "stellar-sdk";

/**
 * Class to represent a Badge
 * @property txHash hash where the badge was rewarded
 * @property valid whether the user has gotton the badge from stellar quest or not
 */
export class BadgeAsset extends Asset {
    txHash?: string
    valid?: boolean
    private _imageUrl = ""

    constructor(code: string, issuer: string, txHash?: string, valid?: boolean) {
        super(code, issuer)
        this.txHash = txHash
        this.valid = valid
    }

    getImageUrl(): string {
        if (this._imageUrl !== "") {
            return this._imageUrl
        } else {
            let nftversion: string =""
            if (this.code.startsWith("SQ01")) {
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
 * Todo: check trustlines
 *
 * @param address address to check
 * @return Pair of list of assets and boolean to indicate whether all assets are here
 */
export async function checkAndGetBadges(address: string): Promise<[Array<BadgeAsset>, boolean]> {
    const account = await server.loadAccount(address).catch(()=> {
        return null
    }) // todo what if the account is not created
    const balances = account?.balances
    const accountBadgeAssets: Array<BadgeAsset> = badges.map(badge => new BadgeAsset(badge.asset_code,badge.asset_issuer))

    if(account == null){
        return [accountBadgeAssets,false]
    }

    //get all sq badges that the account has
    balances?.forEach(bal => {
        if (bal.asset_type !== "native") {
            const asset = {"asset_code": bal.asset_code, "asset_issuer": bal.asset_issuer}
            const foundBadgeAsset = accountBadgeAssets.find(badge => badge.code === bal.asset_code && badge.issuer === bal.asset_issuer)
            if (foundBadgeAsset !== undefined) {
                foundBadgeAsset.valid = true
            }
        }
    })

    // get all payments to check whether the badge is valid todo : call next()
    const payments = await server.payments().forAccount(account.accountId()).limit(200).call()
    const badgePaymentsToMe = payments.records.filter(op => {
        if (op.type !== "payment") {
            return false
        }
        if (op.to !== account.accountId()) {
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
        const foundPayment = badgePaymentsToMe.find(badgePayment => badgePayment.asset_code === asset.code)
        if (foundPayment !== undefined) {
            asset.txHash = foundPayment.transaction_hash
        }
    })
    //todo figure out reduce
    let numberOfValidBadges = 0
    accountBadgeAssets.forEach(badge => {
        numberOfValidBadges = numberOfValidBadges + (badge.valid ? 1 : 0)
    })

    return [accountBadgeAssets, numberOfValidBadges === numberOfQuestBadges]

}
import {server} from "./stellar";
import {badges, numberOfQuestBadges} from "./badgeAssets";
import {Asset} from "stellar-sdk";

/**
 * Check if the account has all the badges and return the badges that it has.
 *
 * Todo: check trustlines
 *
 * @param address address to check
 * @return Pair of list of assets and boolean to indicate whether all assets are here
 */
export async function checkAndGetBadges(address : string) :  Promise<[Array<Asset>, boolean]>{
    const account = await server.loadAccount(address) // todo what if the account is not created
    const balances = account.balances
    const accountBadgeAssets : Array<Asset> = []

    balances.forEach(bal => {
        if(bal.asset_type !== "native"){
            const asset = {"asset_code" : bal.asset_code, "asset_issuer" : bal.asset_issuer}
            if(badges.includes(asset)){
                accountBadgeAssets.push(new Asset(asset.asset_code,asset.asset_issuer))
            }
        }
    })

    return [accountBadgeAssets,accountBadgeAssets.length === numberOfQuestBadges]

}
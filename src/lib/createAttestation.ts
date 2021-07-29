import {BadgeAsset} from "./getBadges";
import {signMessageWithAlbedo} from "./albedo";

/**
 * Create a token signed by the requester, to attest to the badges
 *
 *
 * @param address user to create token for
 * @param token extra information to create token. Usefull when someone has requested a token.
 * @param badges
 */
export async function createAttestation(address : string,badges: Array<BadgeAsset>,token: string=""){
    const timeEpoch = Date.now().valueOf()
    const validBadges = badges.filter(badge => badge.valid).map(badge=>{
        const series = badge.code.charAt(3)
        const quest = badge.code.charAt(5)
        return series+quest+badge.txHash
    })

    const finalPart = token === "" ? "" : "*"+token
    const fullToken = validBadges+"*"+timeEpoch+"*"+address+finalPart

    const signaure = await signMessageWithAlbedo(address,fullToken)
    console.log(fullToken+"*"+signaure)

return fullToken+"*"+signaure


}
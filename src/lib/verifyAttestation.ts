import {verifyMessageSignature} from '@albedo-link/signature-verification'
import {BadgeAsset, checkAndGetBadges} from "./getBadges";


export interface IVerifyAttestationResult{
    valid : boolean
    date : Date,
    address : string,
    token : string,
    badges : Array<BadgeAsset>,
    attestationString : string
}

/**
 * verify the attestation.
 *
 * @param attestation attestation to verify.
 *
 * @return object with information about the result
 */
export async function verifyAttestation(attestation: string) : Promise<IVerifyAttestationResult> {
    try {
        const split = attestation.split("*")
        const hashes = split[0].split(",")
        const timeEpoch = split[1]
        const address = split[2]
        const token = split.length === 5 ? split[3] : ""
        const signature = split.length === 5 ? split[4] : split[3]
        const messageWithoutSignature = split.slice(0, split.length - 1).join("*")
        const valid = verifyMessageSignature(address, messageWithoutSignature, signature)
        if (!valid) {
            return {
                valid: false,
                date: new Date(),
                address: address,
                token: token,
                badges: [],
                attestationString: attestation
            }
        }
        // find the badges that this address has to compare with the txs in the token
        const [badgesForAddress] = await checkAndGetBadges(address)

        const splitHashes = hashes.map((hash) => {
            return {
                series: parseInt(hash.charAt(0)),
                quest: parseInt(hash.charAt(1)),
                txHash: hash.slice(2, hash.length)
            }
        })


        splitHashes.forEach((splithash) => {
            const {series, quest, txHash} = splithash
            const badgeIndex = (series - 1) + (quest - 1)
            const badge = badgesForAddress[badgeIndex]
            if (badge.txHash !== txHash) {
                return {
                    valid: false,
                    date: new Date(),
                    address: "",
                    token: "",
                    badges: [],
                    attestationString: attestation
                }
            }
        })

        const dateObj = new Date(0)
        dateObj.setTime(parseInt(timeEpoch))
        return {
            valid: true,
            date: dateObj,
            address: address,
            token: token,
            badges: badgesForAddress,
            attestationString: attestation
        }
    }catch (e){
        return {
            valid: false,
            date: new Date(),
            address: "",
            token: "",
            badges: [],
            attestationString: attestation
        }
    }

}
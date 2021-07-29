import {Keypair} from "stellar-sdk";
import {verifyMessageSignature} from '@albedo-link/signature-verification'


/**
 * verify the attestation.
 *
 * @param attestation attestation to verify.
 *
 * @return tuple with if the attestation is valid, when it was created and the token that was used
 */
export async function verifyAttestation(attestation : string) /*: Promise<[boolean,Date,string]>*/{
    const split = attestation.split("*")
    const hashes = split[0].split(",")
    const timeEpoch = split[1]
    const address = split[2]
    const token = split.length === 5 ? split[3] : ""
    const signature = split.length === 5 ? split[4] : split[3]
    const keypair = Keypair.fromPublicKey(address)
    const messageWithoutSignature = split.slice(0,split.length-1).join("*")
    const valid = verifyMessageSignature(address,messageWithoutSignature,signature)
    if(!valid){
        return [false,Date.now(),""]
    }
    
    console.log(`attestation is valid ${valid}`)


}
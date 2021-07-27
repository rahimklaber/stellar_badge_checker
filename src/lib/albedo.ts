import albedo from "@albedo-link/intent";

/**
 * Request the public key from albedo.
 */
export async function getAlbedoPublicKey(): Promise<string> {
    const albedoResponse = await albedo.publicKey({})

    return albedoResponse.pubkey
}
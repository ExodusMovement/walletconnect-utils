// @ts-ignore
import { encryptCBC, decryptCBC } from '@exodus/crypto/aes';

export async function aesCbcEncrypt(
  iv: Uint8Array,
  key: Uint8Array,
  data: Uint8Array
): Promise<Uint8Array> {
  return encryptCBC({ key, nonce: iv, data });
}

export async function aesCbcDecrypt(
  iv: Uint8Array,
  key: Uint8Array,
  data: Uint8Array
): Promise<Uint8Array> {
  return decryptCBC({ key, nonce: iv, data });
}

import { hmac } from '@exodus/crypto/hmac'
import { isConstantTime } from "../helpers/validators.js";

export async function hmacSha256Sign(
  key: Uint8Array,
  msg: Uint8Array
): Promise<Uint8Array> {
  return hmac('sha256', key, msg, 'uint8');
}

export async function hmacSha256Verify(
  key: Uint8Array,
  msg: Uint8Array,
  sig: Uint8Array
): Promise<boolean> {
  const expectedSig = await hmacSha256Sign(key, msg);
  const result = isConstantTime(expectedSig, sig);
  return result;
}

export async function hmacSha512Sign(
  key: Uint8Array,
  msg: Uint8Array
): Promise<Uint8Array> {
  return hmac('sha512', key, msg, 'uint8');
}

export async function hmacSha512Verify(
  key: Uint8Array,
  msg: Uint8Array,
  sig: Uint8Array
): Promise<boolean> {
  const expectedSig = await hmacSha512Sign(key, msg);
  const result = isConstantTime(expectedSig, sig);
  return result;
}

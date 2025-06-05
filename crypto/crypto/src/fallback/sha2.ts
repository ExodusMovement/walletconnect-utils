import { hash } from '@exodus/crypto/hash'

export async function sha256(msg: Uint8Array): Promise<Uint8Array> {
  return hash('sha256', msg, 'uint8')
}

export async function sha512(msg: Uint8Array): Promise<Uint8Array> {
  return hash('sha512', msg, 'uint8')
}

export async function ripemd160(msg: Uint8Array): Promise<Uint8Array> {
  return hash('ripemd160', msg, 'uint8')
}

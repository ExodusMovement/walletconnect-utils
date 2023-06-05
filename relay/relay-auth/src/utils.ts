import { encode, decode } from "bs58";
import { safeJsonParse, safeJsonStringify } from "@exodus/walletconnect-safe-json";
import { fromByteArray, toByteArray } from "base64-js";

import {
  DID_DELIMITER,
  DID_METHOD,
  DID_PREFIX,
  JWT_DELIMITER,
  MULTICODEC_ED25519_BASE,
  MULTICODEC_ED25519_HEADER,
  MULTICODEC_ED25519_LENGTH,
} from "./constants";
import { IridiumJWTData, IridiumJWTDecoded, IridiumJWTSigned } from "./types";

function encodeBase64url(data: Uint8Array): string {
  return (fromByteArray(data)
    .replace(/\+/g, "-") // Convert '+' to '-'
    .replace(/\//g, "_") // Convert '/' to '_'
    .replace(/=+$/, "") // Remove ending '='
  );
}

function decodeBase64url(data: string): Uint8Array {
  return toByteArray(
    data
      .replace(/-/g, "+") // Convert '-' to '+'
      .replace(/_/g, "/") // Convert '_' to '/'
  );
}

// ---------- JSON ----------------------------------------------- //

export function decodeJSON(str: string): any {
  return safeJsonParse(Buffer.from(decodeBase64url(str)).toString("utf8"));
}

export function encodeJSON(val: any): string {
  return encodeBase64url(
    new Uint8Array(Buffer.from(safeJsonStringify(val)))
  );
}

// ---------- Issuer ----------------------------------------------- //

export function encodeIss(publicKey: Uint8Array): string {
  const header = decode(
    MULTICODEC_ED25519_HEADER
  );
  const multicodec =
    MULTICODEC_ED25519_BASE +
    encode(Buffer.concat([header, publicKey]));
  return [DID_PREFIX, DID_METHOD, multicodec].join(DID_DELIMITER);
}

export function decodeIss(issuer: string): Uint8Array {
  const [prefix, method, multicodec] = issuer.split(DID_DELIMITER);
  if (prefix !== DID_PREFIX || method !== DID_METHOD) {
    throw new Error(`Issuer must be a DID with method "key"`);
  }
  const base = multicodec.slice(0, 1);
  if (base !== MULTICODEC_ED25519_BASE) {
    throw new Error(`Issuer must be a key in mulicodec format`);
  }
  const bytes = decode(multicodec.slice(1));
  const type = encode(bytes.slice(0, 2));
  if (type !== MULTICODEC_ED25519_HEADER) {
    throw new Error(`Issuer must be a public key with type "Ed25519"`);
  }
  const publicKey = bytes.slice(2);
  if (publicKey.length !== MULTICODEC_ED25519_LENGTH) {
    throw new Error(`Issuer must be a public key with length 32 bytes`);
  }
  return publicKey;
}

// ---------- Signature ----------------------------------------------- //

export function encodeSig(bytes: Uint8Array): string {
  return encodeBase64url(bytes);
}

export function decodeSig(encoded: string): Uint8Array {
  return decodeBase64url(encoded);
}

// ---------- Data ----------------------------------------------- //

export function encodeData(params: IridiumJWTData): Uint8Array {
  return new Uint8Array(Buffer.from(
    [encodeJSON(params.header), encodeJSON(params.payload)].join(JWT_DELIMITER)
  ));
}

export function decodeData(data: Uint8Array): IridiumJWTData {
  const params = Buffer.from(data).toString("utf8").split(JWT_DELIMITER);
  const header = decodeJSON(params[0]);
  const payload = decodeJSON(params[1]);
  return { header, payload };
}

// ---------- JWT ----------------------------------------------- //

export function encodeJWT(params: IridiumJWTSigned): string {
  return [
    encodeJSON(params.header),
    encodeJSON(params.payload),
    encodeSig(params.signature),
  ].join(JWT_DELIMITER);
}

export function decodeJWT(jwt: string): IridiumJWTDecoded {
  const params = jwt.split(JWT_DELIMITER);
  const header = decodeJSON(params[0]);
  const payload = decodeJSON(params[1]);
  const signature = decodeSig(params[2]);
  const data = new Uint8Array(Buffer.from(
    params.slice(0, 2).join(JWT_DELIMITER)
  ));
  return { header, payload, signature, data };
}

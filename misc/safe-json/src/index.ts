/**
 * JSONStringify & JSONParse used from json-with-bigint
 * source: https://github.com/Ivan-Korolenko/json-with-bigint
 */
/* 
  Function to serialize data to JSON string.
  Converts all BigInt values to strings with "n" character at the end.
*/
import jsonBI from "@exodus/json-bigint-nobignumber";
const jsonBigInt = jsonBI({ strict: true, useNativeBigInt: true });

export function safeJsonParse<T = any>(value: string): T | string {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  return jsonBigInt.parse(value);
}

export function safeJsonStringify(value: any): string {
  return jsonBigInt.stringify(value);
}

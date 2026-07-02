export interface DecodedPart {
  success: boolean;
  data?: any;
  error?: string;
}

export const base64UrlDecode = (str: string): string => {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binString = atob(base64);
  const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
};

export const decodeJwtPart = (tokenPart: string): DecodedPart => {
  if (!tokenPart) {
    return { success: false, error: "Empty token segment" };
  }
  try {
    const decodedStr = base64UrlDecode(tokenPart);
    const parsed = JSON.parse(decodedStr);
    return { success: true, data: parsed };
  } catch (err: unknown) {
    return {
      success: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
};

export const verifyHmacSignature = async (token: string, secret: string): Promise<boolean> => {
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  
  const [headerB64, payloadB64, signatureB64] = parts;
  const dataToSign = `${headerB64}.${payloadB64}`;
  
  try {
    let base64 = signatureB64.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binarySignString = atob(base64);
    const signatureBuffer = new Uint8Array(Array.from(binarySignString, (c) => c.charCodeAt(0)));
    
    const enc = new TextEncoder();
    const secretBuffer = enc.encode(secret);
    const dataBuffer = enc.encode(dataToSign);
    
    const key = await crypto.subtle.importKey(
      "raw",
      secretBuffer,
      { name: "HMAC", hash: { name: "SHA-256" } },
      false,
      ["verify"]
    );
    
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBuffer,
      dataBuffer
    );
    
    return isValid;
  } catch {
    return false;
  }
};

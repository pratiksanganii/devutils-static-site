export interface Base64ProcessResult {
  success: boolean;
  data: string;
  error?: string;
}

export const encodeBase64 = (text: string): Base64ProcessResult => {
  if (!text) {
    return { success: true, data: "" };
  }
  try {
    const bytes = new TextEncoder().encode(text);
    const binString = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
    const encoded = btoa(binString);
    return { success: true, data: encoded };
  } catch (err: unknown) {
    return {
      success: false,
      data: "",
      error: err instanceof Error ? err.message : String(err),
    };
  }
};

export const decodeBase64 = (base64Str: string): Base64ProcessResult => {
  if (!base64Str.trim()) {
    return { success: true, data: "" };
  }
  try {
    const cleanInput = base64Str.replace(/\s/g, "");
    const binString = atob(cleanInput);
    const bytes = Uint8Array.from(binString, (char) => char.charCodeAt(0));
    const decoded = new TextDecoder().decode(bytes);
    return { success: true, data: decoded };
  } catch {
    return {
      success: false,
      data: "",
      error: "Invalid Base64 input. Please make sure the string is valid Base64 encoded format.",
    };
  }
};

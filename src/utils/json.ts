export interface JsonProcessResult {
  success: boolean;
  data: string;
  error?: string;
}

export const formatJson = (value: string, spaces: number = 2): JsonProcessResult => {
  if (!value.trim()) {
    return { success: true, data: "" };
  }
  try {
    const parsed = JSON.parse(value);
    const formatted = JSON.stringify(parsed, null, spaces);
    return { success: true, data: formatted };
  } catch (err: unknown) {
    return {
      success: false,
      data: "",
      error: err instanceof Error ? err.message : String(err),
    };
  }
};

export const minifyJson = (value: string): JsonProcessResult => {
  if (!value.trim()) {
    return { success: true, data: "" };
  }
  try {
    const parsed = JSON.parse(value);
    const minified = JSON.stringify(parsed);
    return { success: true, data: minified };
  } catch (err: unknown) {
    return {
      success: false,
      data: "",
      error: err instanceof Error ? err.message : String(err),
    };
  }
};

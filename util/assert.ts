import useLog from "../hooks/useLog";

const log = useLog("Assert")

export function assert(condition: boolean, message: string) {
  if (!condition) {
    useLog(message);
    throw new Error(message);
  }
}

export function isNotBlank(text: string): boolean {
  return text != null && text.trim().length > 0;
}
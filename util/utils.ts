import { AxiosResponse } from "axios";
import { FieldError } from "../hooks/useInputForm";

export function isNotEmpty(arr: any) {
  if (arr == null) {
    return false;
  }
  if (Array.isArray(arr)) {
    return arr.length;
  }
  return false;
}

export function extractErrors(res: AxiosResponse<any, any>): FieldError[] {
  const subErrors = res?.data?.subErrors;
  if (subErrors == null) {
    return [];
  }

  if (Array.isArray(subErrors)) {
    const errors: FieldError[] = [];
    for (const subError of res?.data?.subErrors) {
      if (subError.path != null && subError.message != null) {
        errors.push({
          name: subError.path,
          message: subError.message
        })
      }
    }
    return errors;
  }
  else {
    if (subErrors.path != null && subErrors.message != null) {
      return [{ name: subErrors.path, message: subErrors.message }]
    }
  }
}
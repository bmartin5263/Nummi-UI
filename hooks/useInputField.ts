import { useState } from "react"
import { assert, isNotBlank } from "../util/assert"

export type FieldTemplate = {
  name: string,
  initialValue: string,
  shouldValidate: boolean,
  validator: (text: string) => string,
  insertValueIntoRequest: (req: any, value: string) => void
}

export type Field = {
  name: string,
  inputValue: string,
  errorMessage: string
  inErrorState: boolean

  update(text: string): void
  validate(): string
  enableValidations(): void
  setErrorMessage(text: string): void
  insertValueIntoRequest: (req: any) => void
}

function useInputField(props: FieldTemplate): Field {
  assert(isNotBlank(props.name), "Field name cannot be blank");

  const [inputValue, setInputValue] = useState(props.initialValue);
  const [errorMessage, setErrorMessage] = useState("");
  const [inErrorState, setInErrorState] = useState(false);
  const [shouldValidate, setShouldValidate] = useState(props.shouldValidate == null ? false : true);

  const validator: (text: string) => string = props.validator != null ? props.validator : (str: string) => null
  const insertValueIntoRequest: (req: any, value: string) => void = props.insertValueIntoRequest != null
    ? props.insertValueIntoRequest
    : (req) => req[props.name] = inputValue

  const doValidate = (text: string): string => {
    const error: string = validator(text);
    if (error == null) {
      setInErrorState(false);
    }
    else {
      setInErrorState(true);
      setErrorMessage(error);
    }
    return error;
  }

  const doUpdate = (text: string) => {
    setInputValue(text);
    if (shouldValidate) {
      doValidate(text);
    }
  }

  const doSetErrorMessage = (text: string) => {
    setErrorMessage(text);
    setInErrorState(true);
  }

  return {
    name: props.name,
    inputValue: inputValue,
    errorMessage: errorMessage,
    inErrorState: inErrorState,

    update: (text) => doUpdate(text),
    validate: () => {
      if (inErrorState) {
        return errorMessage;
      }
      return doValidate(inputValue);
    },
    setErrorMessage: (text) => doSetErrorMessage(text),
    enableValidations: () => {
      setShouldValidate(true);
      doValidate(inputValue);
    },
    insertValueIntoRequest: (req: any) => {
      insertValueIntoRequest(req, inputValue);
    }
  };
}

export default useInputField;
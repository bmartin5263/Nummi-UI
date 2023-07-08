import useInputField, { Field, FieldTemplate } from "./useInputField";
import nummiClient from '../util/nummiClient';
import { assert, isNotBlank } from "../util/assert";
import { EventHandler, FormEvent, useState } from "react";
import { Axios, AxiosResponse } from "axios";
import useLog from "./useLog";
import { isNotEmpty } from "../util/utils";

const log = useLog("InputForm");

export type InputFormTemplate = {
  fields: FieldTemplate[],
  defaultErrorMessage: string,

  preSubmitValidation: (fields: Map<string, Field>) => string;
  onSubmit: (req: any) => Promise<AxiosResponse<any, any>>;
  onSuccess: (req: any, res: AxiosResponse<any, any>) => void;
  fieldErrorExtractor: (res: AxiosResponse<any, any>) => FieldError[]
}

export type FieldError = {
  name: string,
  message: string
}

export type InputForm = {
  submitted: boolean,
  generalError: string,

  submit: EventHandler<FormEvent<HTMLFormElement>>;
  validate(): boolean;
  getFieldValue(name: string): string;
  getField(name: string): Field;
}

function useInputForm(props: InputFormTemplate): InputForm {
  const [submitted, setSubmitted] = useState(false);
  const [generalError, setGeneralError] = useState(null);

  const preSubmitValidation = props.preSubmitValidation != null 
    ? props.preSubmitValidation 
    : () => null;

  const fieldErrorExtractor = props.fieldErrorExtractor != null
    ? props.fieldErrorExtractor
    : (res: AxiosResponse<any, any>) => []; 

  const onSuccess = props.onSuccess != null
    ? props.onSuccess
    : (req: any, res: AxiosResponse<any, any>) => {}

  const fields: Map<string, Field> = new Map();
  for (const field of props.fields) {
    assert(isNotBlank(field.name), "Field name cannot be blank");
    fields.set(field.name, useInputField(field))
  }

  const doValidate = (): boolean => {
    let success = true;

    const newGeneralError = preSubmitValidation(fields);
    if (newGeneralError != null) {
      setGeneralError(newGeneralError);
      success = false;
    }

    for (const [name, field] of fields) {
      if (field.validate() != null) {
        success = false;
      }
    }

    return success;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (props.onSubmit != null) {
      // Stop the form from submitting and refreshing the page.
      event.preventDefault()
    }
    setGeneralError(null);
    const data: any = {};

    let success: boolean = doValidate();

    if (!success) {
      event.preventDefault()
      return;
    }
    else if (props.onSubmit == null) {
      setSubmitted(true);
      return event;
    }

    for (const [name, field] of fields) {
      field.insertValueIntoRequest(data);
    }

    setSubmitted(true);
    try {
      const res = await props.onSubmit(data);
      log(res.data);
      onSuccess(data, res);
    }
    catch (error) {
      setSubmitted(false);
      const res = error.response;
      const fieldErrors: FieldError[] = fieldErrorExtractor(res);

      if (isNotEmpty(fieldErrors)) {
        for (const fieldError of fieldErrors) {
          const field: Field = fields.get(fieldError.name)
          if (field != null) {
            field.setErrorMessage(fieldError.message);
          }
          else {
            console.log(JSON.stringify(fieldError));
          }
        }
      }
      else {
        if (error.response?.data?.userMessage != null) {
          setGeneralError(error.response?.data?.userMessage);
        }
        else {
          setGeneralError(props.defaultErrorMessage);
        }
      }
    }
  }

  return {
    submitted: submitted,
    generalError: generalError,
    submit: async (event) => {
      return handleSubmit(event)
    },
    validate: () => doValidate(),
    getField: (name: string): Field => fields.get(name),
    getFieldValue: (name: string): string => fields.get(name)?.inputValue
  }
}

export default useInputForm;
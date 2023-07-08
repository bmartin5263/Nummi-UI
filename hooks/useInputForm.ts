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

  preSubmitValidation: (fields: Map<string, Field>) => string;
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

  const handleSubmit = async (event) => {
    // Stop the form from submitting and refreshing the page.
    event.preventDefault()
    setGeneralError(null);
    const data: any = {};

    let failed = false;

    const newGeneralError = preSubmitValidation(fields);
    if (newGeneralError != null) {
      setGeneralError(newGeneralError);
      failed = true;
    }

    for (const [name, field] of fields) {
      if (field.validate() != null) {
        failed = true;
      }
      field.insertValueIntoRequest(data);
    }

    if (failed) {
      return;
    }

    setSubmitted(true);
    try {
      const res = await nummiClient.post("register", data);
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
        setGeneralError(error.response?.data?.userMessage ?? "Unable to Register at this time. Please try again in a few minutes");
      }
    }
  }

  return {
    submitted: submitted,
    generalError: generalError,
    submit: async (event) => {
      handleSubmit(event)
    },
    getField: (name: string): Field => fields.get(name),
    getFieldValue: (name: string): string => fields.get(name)?.inputValue
  }
}

export default useInputForm;
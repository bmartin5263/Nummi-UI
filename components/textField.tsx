import styles from 'styles/textField.module.scss'
import useLog from '../hooks/useLog';
import { useState } from 'react';
import { Field } from '../hooks/useInputField';

const log = useLog("TextField")

type TextFieldProps = {
  value: string, 
  placeholder: string,
  error: string, 

  field: Field,

  showError: boolean,
  type: string, 
  identifier: string,
  title: string,
  className: string,
  spellCheck: boolean,

  onChange: (newValue: string) => string;
  onExit: () => void;
}

function TextField(props: TextFieldProps) {
  const defaultStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  } as const;

  const value = props.value ?? props.field.inputValue;
  const error = props.error ?? props.field.errorMessage;
  const showError = props.showError ?? props.field.inErrorState;
  const identifier = props.identifier ?? props.field.name;

  let onChange = (str: string) => {};
  let onExit = () => {};
  if (props.field != null) {
    if (props.onChange == null) {
      onChange = (newValue: string) => props.field.update(newValue);
    }
    if (props.onExit == null) {
      onExit = () => props.field.enableValidations()
    }
  }

  const handleChange = (event) => {
    let value: string = event.target.value; 
    let overriddenValue = onChange(value);
    if (overriddenValue != null) {
      event.target.value = overriddenValue;
    }
  }

  const handleBlur = (event) => {    
    onExit();
  }

  return (
    <div className={"textBox " + props.className}>
      <div style={defaultStyle}>
        <p className={getTitleClass(value)}>{props.title}</p>
        <p className={getWarningClass(showError)}>{error}</p>
      </div>
      <div style={defaultStyle}>
        <input
          spellCheck={props.spellCheck}
          value={value}
          className={styles.textBox} 
          id={identifier} 
          name={identifier} 
          type={props.type == null ? "text" : props.type}
          placeholder={props.placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

function getWarningClass(showError: boolean) {
  const classes = [styles.headerText, styles.errorText];
  if (!showError) {
    classes.push(styles.headerTextHidden);
  }
  return classes.join(" ");
}

function getTitleClass(text: string) {
  const classes = [styles.headerText, styles.labelText];
  if (!text) {
    classes.push(styles.headerTextHidden);
  }
  return classes.join(" ");
}

export default TextField;
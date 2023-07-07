import styles from 'styles/textField.module.scss'
import useLog from '../hooks/useLog';
import { useState } from 'react';

const log = useLog("TextField")

type TextFieldProps = {
  name: string, 
  title: string, 
  warning: string, 
  type: string, 
  className: string,
  initialValue: string,
  spellCheck: boolean,
  
  validator: (text: string) => string;
}

function TextField({name, title, warning, type, className, initialValue, spellCheck, validator}: TextFieldProps) {
  if (initialValue == null) {
    initialValue = "";
  }
  if (validator == null) {
    validator = (text: string) => null;
  }

  const [text, setText] = useState(initialValue);
  const [error, setError] = useState(warning);
  const [exited, setExited] = useState(false);

  log("rerender name=" + name + " title=" + title + " warning=" + warning + " error=" + error + " text=" + text);


  const defaultStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  } as const;

  const staticValidate = (text: string) => {
    log("Validate " + text)
    if (error == null) {
      let newError = validator(text);
      log("error " + newError)
      setError(newError);
    }
  }

  const handleChange = (event) => {
    let value: string = event.target.value; 
    setText(value);

    if (exited) {
      staticValidate(value);
    }
  }

  const handleBlur = (event) => {    
    let value: string = event.target.value; 
    setExited(true);
    staticValidate(value);
  }

  return (
    <div className={"textBox " + className}>
      <div style={defaultStyle}>
        <p className={getTitleClass(text)}>{title}</p>
        <p className={getWarningClass(error)}>{error}</p>
      </div>
      <div style={defaultStyle}>
        <input
          spellCheck={spellCheck}
          value={text}
          className={styles.textBox} 
          id={name} 
          name={name} 
          type={type ?? "text"}
          placeholder={title}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
}

function getWarningClass(warning: string) {
  const classes = [styles.headerText, styles.errorText];
  if (warning == null) {
    log("hiding warning " + warning)
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
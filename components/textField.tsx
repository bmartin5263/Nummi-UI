import styles from 'styles/textField.module.scss'
import useLog from '../hooks/useLog';
import { useState } from 'react';

const log = useLog("TextField")

type TextFieldProps = {
  name: string, 
  title: string, 
  warning: string, 
  type: string, 
  className: string
}

function TextField({name, title, warning, type, className}: TextFieldProps) {
  const [text, setText] = useState("");

  const defaultStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  } as const;

  const handleChange = (event) => {
    let value = event.target.value; 
    setText(value);
  }
  log("Render")
  return (
    <div className={"textBox " + className}>
      <div style={defaultStyle}>
        <p className={getTitleClass(text)}>{title}</p>
        <p className={getWarningClass(text, warning)}>{warning}</p>
      </div>
      <div style={defaultStyle}>
        <input 
          className={styles.textBox} 
          id={name} 
          name={name} 
          type={type ?? "text"}
          placeholder={title}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

function getWarningClass(text, warning) {
  const classes = [styles.headerText, styles.errorText];
  if (!warning) {
    classes.push(styles.headerTextHidden);
  }
  return log(classes.join(" "));
}

function getTitleClass(text) {
  const classes = [styles.headerText, styles.labelText];
  if (!text) {
    classes.push(styles.headerTextHidden);
  }
  return log(classes.join(" "));
}

export default TextField;
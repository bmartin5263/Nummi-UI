import styles from 'styles/textField.module.scss'
import useLog from '../hooks/useLog';
import { useState } from 'react';

function TextField({name, warning, type, className}) {
  const log = useLog("TextField");
  const [text, setText] = useState("");

  const defaultStyle = {
    'display': 'flex',
    'flex-wrap': 'wrap',
    'width': '100%'
  };

  const warningClass = getWarningClass(text, warning);
  const titleClass = getTitleClass(text);

  const handleChange = (event) => {
    let value = event.target.value; 
    setText(value);
  }

  return (
    <div className={"TextBox " + className}>
      <div style={defaultStyle}>
        <p className={titleClass}>{name}</p>
        <p className={warningClass}>{warning}</p>
      </div>
      <div style={defaultStyle}>
        <input 
          className={styles.textBox} 
          id={name} 
          name={name} 
          type={type ?? "text"}
          placeholder={name}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

function getWarningClass(text, warning) {
  const classes = [styles.headerText, styles.errorText];
  if (!text && warning) {
    classes.push(styles.headerTextHidden);
  }
  return classes.join(" ");
}

function getTitleClass(text) {
  const classes = [styles.headerText, styles.labelText];
  if (!text) {
    classes.push(styles.headerTextHidden);
  }
  return classes.join(" ");
}

export default TextField;
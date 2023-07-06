import Link from 'next/link';
import ThemeContext from './themeContext';
import { useContext } from 'react';
import { useRouter } from 'next/router'
import styles from "styles/banner.module.scss";
import { MouseEvent } from 'react';


export type ButtonProps = {
  className: string, 
  children: React.ReactNode,
  style: React.CSSProperties,

  buttonType: ButtonType,
  disabled: boolean,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

export class ButtonType {
  css: string;


  static BASIC = new ButtonType("button2-basic")
  static PRIMARY = new ButtonType("button2-primary")

  constructor(css: string) {
    this.css = css
  }
}

export class ButtonEffect {
  css: string;

  static SPINNING = new ButtonEffect("button2-basic")

  constructor(css: string) {
    this.css = css
  }
}

function Button({className, children, style, buttonType, disabled, onClick}: ButtonProps) {
  if (buttonType == null) {
    buttonType = ButtonType.BASIC;
  }

  var classes = ["button2", buttonType.css];
  if (className != null) {
    classes.push(className);
  }

  // var empty = children == null || (typeof children === 'string' && children.length == 0);

  // if (empty) {
  //   if (!omnipresent) {
  //     classes.push(styles.hidden)
  //   }
  // }
  // else {
  //   classes.push(bannerType.css)
  // }

  return (
    <>
      <button className={classes.join(' ')} style={style} disabled={disabled} onClick={onClick}>
        <span className="icon material-icons">ma</span>
        {children}
        <span className='loader'></span>
      </button>
    </>
  )
}

export default Button
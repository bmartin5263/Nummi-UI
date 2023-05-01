import Head from 'next/head';
import Navigation from './navigation';
import { useContext } from "react";
import ThemeContext from './themeContext'

export default function CenterBox({ children }) {
  return (
    <div className='center-box'>
      {children}
    </div>
  );
}
import Link from 'next/link';
import ThemeContext from './themeContext';
import { useContext } from 'react';
import { useRouter } from 'next/router'

function Banner({className, text}) {
  return (
    <>
      {/* <div className='banner banner-info'>
        Create an Account to Start Trading!
      </div>
      <br/> */}
      <div className={'banner ' + className}>
        {text}
      </div>
    </>
  )
}

export default Banner
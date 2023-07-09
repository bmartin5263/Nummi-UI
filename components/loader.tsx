export type LoaderProps = {
  left: boolean,
  right: boolean
}

function Loader(props) {
  return (<span 
    style={{
      marginLeft: props.right == null ? '0' : '.3em',
      marginRight: props.rigleftht == null ? '0' : '.3em'
    }} 
    className='loader'
  />
  )
}

export default Loader;
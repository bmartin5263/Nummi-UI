type IconProps = {
  id: string,
  className: string, 
  style: React.CSSProperties,
  children: React.ReactNode
}

function Icon({id, className, style, children}: IconProps) {
  return <span id={id} className="icon material-icons">{children}</span>
}

export default Icon;
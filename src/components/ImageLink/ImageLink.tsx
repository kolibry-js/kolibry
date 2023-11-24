interface Props {
  src: string
  href: string
  alt: string
  className?: string // Hinzufügen einer optionalen className Prop
}

export default function ImageLink({ src, href, alt, className }: Props) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      <img src={src} alt={alt} />
    </a>
  )
}

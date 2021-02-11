export default function Markdown({data}) {
  return (
    <div dangerouslySetInnerHTML={{__html:data}} />
  )
}
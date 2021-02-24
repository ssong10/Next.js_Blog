import {useEffect} from 'react'
import Prism from 'prismjs';

export default function Markdown({data}) {
  useEffect(()=>{
    Prism.highlightAll();
  },[data])
  return (
    <div dangerouslySetInnerHTML={{__html:data}} />
  )
}
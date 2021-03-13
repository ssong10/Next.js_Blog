import {useEffect} from 'react'
import Prism from 'prismjs';

export default function Markdown({data}) {
  useEffect(()=>{
    Prism.highlightAll();
  },[data])
  return (
    <div className="markdown" dangerouslySetInnerHTML={{__html:data}} />
  )
}
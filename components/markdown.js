import {useEffect} from 'react'
import Prism from '@utils/prism';

export default function Markdown({data}) {
  useEffect(()=>{
    Prism.highlightAll();
  },[data])
  return (
    <div className="markdown" dangerouslySetInnerHTML={{__html:data}} />
  )
}
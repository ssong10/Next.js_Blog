import {useEffect} from 'react'
import Prism from '@utils/prism';

export default function Markdown({data}) {
  useEffect(async ()=>{
    Prism.highlightAll(data);
  },[data])
  return (
    <div className="markdown" dangerouslySetInnerHTML={{__html:data}} />
  )
}
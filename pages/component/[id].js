import { components } from '../../lib/FILE'
import Layout from '../../components/layout'
import {getBlobUrl} from '../../lib/components'
import {getComponent} from '../../lib/firebase'
import { useEffect, useState } from 'react'
import Prism from 'prismjs';
import Head from 'next/head'

export default function Component({params,code}) {
  const { id } = params
  const [url, setSrc] = useState(''); // initial src will be empty
  const [ type, setType] = useState('html')
  useEffect(() => {
    const bloburl = getBlobUrl(code)
    setSrc(bloburl);
    setType('html')
    Prism.highlightAll();
  }, [code]);
  useEffect(()=> {
    document.querySelector('pre.show').classList.remove('show')
    document.querySelector(`pre#${type}`).classList.add('show')
  },[type])
  const onChange = (e) => {
    if (e.target.classList.contains('btn')){
      document.querySelector('.btn.select').classList.remove('select')
      e.target.classList.add('select')
      setType(e.target.innerText)
    }
  }
  return (
    <Layout>
      <Head>
        <title>Ssong10 | {params.id}</title>
      </Head>
      <div className="code__container">
        <h1>{id}</h1>
        <div onClick={onChange} className="tab__wrap">
          <button className="btn select">html</button>
          <button className="btn">js</button>
          <button className="btn">css</button>
        </div>
        <div className="form__wrap">
          <pre className="show" id="html">
            <code className="language-html">{code.html}</code>
          </pre>
          <pre id="js">
            <code className="language-js">{code.js}</code>
          </pre>
          <pre id="css">
            <code className="language-css">{code.css}</code>
          </pre>
          {/* <textarea disabled value={code.html} className="codearea show" name="" id="html"></textarea>
          <textarea disabled value={code.js} className="codearea" name="" id="js" ></textarea>
          <textarea disabled value={code.css} className="codearea" name="" id="css" ></textarea> */}
        </div>
        <div className="code_preview">
          <a target="_blank" href={url} className="new_link">
            <div className="open_preview" title="새 창으로 열기"></div>
          </a>
          <iframe src={url} />
        </div>
        <style jsx>
          {`
            .code__container { 
              margin:auto;
              width: 80%;
              height: 500px;
            }
            iframe {
              width: 100%;
              height: 100%;
            }
            pre {
              width : 100%;
              height : 400px;
              display:none;
              box-sizing: border-box;
            }
            
            .show {
              display:block;
            }
            
            .btn {
              border: 1px solid #9ea3a3;
              width: 50px;
              padding: 8px 6px;
              margin: 5px;
              background-color:#e4e4e9;
              border-radius: 5px;
              cursor: pointer;
            }
            
            .btn.select {
              background-color: #babae3;
            }
            
            .code_preview {
              position:relative;
              width : 100%;
              height : 500px;
              border: 1px solid black;
            }
            .code_preview iframe {
              width : 100%;
              height: 100%;
            }
            .code_preview .new_link {
              position: absolute;
              top:10px;
              right: 10px;
              width : 10px;
              height: 10px;
              background-color: gray;
            }
          `
          }
        </style>
      </div>
    </Layout>
  )
}
export async function getStaticPaths() {
  const paths = components.map(item=>{
    return {
      params: {
        id : item
      }
    }
  })
  return {
    paths,
    fallback: false,
  }
  // Return a list of possible value for id
}
export async function getStaticProps({ params }) {
  // const code = {
  //   html : '<div class="red"></div>',
  //   js : '',
  //   css : '.red {background-color:red;width:100px;height:100px;'
  // }
  const code = await getComponent(params.id)
  return {
    props: {
      params,
      code
    }
  }
}

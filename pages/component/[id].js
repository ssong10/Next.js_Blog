import { components } from '@constant/FILE'
import Layout from '@components/layout'
import {getBlobUrl} from '@utils/components'
import {getComponent} from '@utils/firebase'
import Markdown from '@components/markdown'
import { useEffect, useState } from 'react'
import Prism from '@utils/prism';
import Head from 'next/head'
import { renderer } from '@utils/posts';
import styled from 'styled-components'
const CodeContainer = styled.main`
  margin : 50px 10% 100px 10%;
  line-height:2;
  min-height: 90vh;

  @media screen and (max-width: 768px) {
    margin : 50px 5% 100px 5%;
    width:90%;
    font-size: 80%;
  }
`


export default function Component({params,code, description}) {
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
      setType(e.target.innerText)
    }
  }
  const selected = (btn) => {
    return (btn === type) ? 'btn select' :'btn'
  }
  return (
    <Layout>
      <Head>
        <title>Ssong10 | {params.id}</title>
      </Head>
      <CodeContainer>
        <h1>{id}</h1>
        <div className="description">
          <Markdown data={(description || '') } />
        </div>
        <div onClick={onChange} className="tab__wrap">
          <button className={selected('html')}>html</button>
          <button className={selected('js')}>js</button>
          <button className={selected('css')}>css</button>
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
            @media screen and (max-width: 767px) {
              .code__container { 
                width: 90%;
              }
            }
          `
          }
        </style>
      </CodeContainer>
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
}
export async function getStaticProps({ params }) {
  // const code = {
  //   html : '<div class="red"></div>',
  //   js : '',
  //   css : '.red {background-color:red;width:100px;height:100px;'
  // }
  const {html,js,css,description} = await getComponent(params.id)
  const descriptionData = renderer(description || '')
  return {
    props: {
      params,
      code : {html,js,css},
      description : descriptionData
    }
  }
}

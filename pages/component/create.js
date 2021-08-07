import Layout from '@components/layout'
import {getBlobUrl} from '@utils/components'
import { useEffect, useState } from 'react'
import {fetchComponent} from '@utils/firebase'

export default function Component() {
  const initcode = {
    description : '',
    html : '<div class="red">안녕</div>',
    js : '',
    css : '.red {background-color:red;width:100px;height:100px;'
  }
  const [ code , setCode ] = useState(initcode)
  const [ title , setTitle ] = useState('')
  const [ url , setSrc] = useState(''); // initial src will be empty
  const [ type, setType] = useState('html')
  useEffect(() => {
    applyCode()
  }, []);
  useEffect(()=> {
    document.querySelector('.codearea.show').classList.remove('show')
    document.querySelector(`.codearea#${type}`).classList.add('show')
  },[type])
  const onChange = (e) => {
    document.querySelector('.btn.select').classList.remove('select')
    e.target.classList.add('select')
    setType(e.target.innerText)
  }
  const applyCode = () => {
    const bloburl = getBlobUrl(code)
    setSrc(bloburl);
  }
  const changeCode = (e) => {
    setCode({...code, [e.target.id]:e.target.value})
  }
  const createCode = ()=>{
    console.log(title,code)
    applyCode()
    fetchComponent(title,code)
  }
  return (
    <Layout>
      title : <input value={title} onChange={(e)=>setTitle(e.target.value)}></input>
      <div className="code__container">
        <textarea onChange={changeCode} defaultValue={code.description} name="" id="description"></textarea>

        <div onClick={onChange} className="tab__wrap">
          <button className="btn select">html</button>
          <button className="btn">js</button>
          <button className="btn">css</button>
        </div>
        <div onChange={changeCode} className="form__wrap">
          <textarea defaultValue={code.html} className="codearea show" name="" id="html"></textarea>
          <textarea defaultValue={code.js} className="codearea" name="" id="js" ></textarea>
          <textarea defaultValue={code.css} className="codearea" name="" id="css" ></textarea>
        </div>
        <button onClick={applyCode} className="preview_btn">미리보기</button>
        <button onClick={createCode} className="create_btn">작성</button>
        <div className="code_preview">
          <a target="_blank" href={url} className="new_link">
            <div className="open_preview" title="새 창으로 열기"></div>
          </a>
          <iframe src={url} />
        </div>
        <style jsx>
          {`
            .code__container { 
              min-height: 500px;
            }
            iframe {
              width: 100%;
              height: 100%;
            }
            .codearea {
              width : 100%;
              height : 400px;
              display:none;
              box-sizing: border-box;
            }
            
            .show {
              display:block;
            }
            
            .btn {
              border: 1px solid black;
              border-radius :2px;
            }
            
            .btn.select {
              background-color : gray;
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
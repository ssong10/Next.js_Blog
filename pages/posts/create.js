import Layout from '@components/layout'
import { fetchPost } from '@utils/firebase'
import { useState } from 'react'
export default function PostCreate() {
  const [post,setPost] = useState({sub:'',item:'',context:''})

  const createPost = (e) =>{
    e.preventDefault()
    fetchPost(post.sub,post.item,post.context)
  }
  const onhandleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]:e.target.value
    })
  }
  return (
    <Layout>
      <div className="post">
        <form onChange={onhandleChange}>
          <label>sub : <input type="text" name="sub" defaultValue={post.sub} /></label>
          <label>item : <input type="text" name="item" defaultValue={post.item} /></label>
          <textarea rows="20" name="context" defaultValue={post.context}></textarea>
          <button onClick={createPost} className="create_btn">등록</button>
        </form>
      </div>
      <style jsx>
        {`
          input {
            margin : 24px;
          }
          textarea {
            width : 100%;
            display:block;
          }
        `}
      </style>
    </Layout>
  )
}
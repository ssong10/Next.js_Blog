import { posts } from '../../lib/FILE'
import Nav from '../../components/nav'
import Markdown from '../../components/markdown'
import { remarkHTML } from '../../lib/posts';

export default function Post({params,data}) {
  const { id } = params
  const [subject,item] = id;
  return (
    <div>
      <Nav></Nav>
      <Markdown data={data}></Markdown>
    </div>
  )
}
export async function getStaticPaths() {
  const paths = posts.reduce((prev,post) => {
    const items = post.items.map(item=>{
      return {
        params: {
          id : [post.subject,item]
        }
      }
    })
    return [
      ...prev,...items
    ]
  },[])
  return {
    paths,
    fallback: false,
  }
  // Return a list of possible value for id
}
export async function getStaticProps({ params }) {
  const data = await remarkHTML(params.id)
  return {
    props: {
      params,
      data
    }
  }
}

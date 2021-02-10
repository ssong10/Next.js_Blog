import { posts } from '../../lib/FILE'
import Nav from '../../components/Nav'

export default function Post({params}) {
  const { id } = params
  const [subject,item] = id;
  return (
    <div>
      <Nav></Nav>
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
  return {
    props: {
      params
    }
  }
}

import { posts } from '../../lib/FILE'
import Layout from '../../components/layout'
import Markdown from '../../components/markdown'
import { mdParser } from '../../lib/posts';
import Head from 'next/head'
export default function Post(props) {
  const {params, data} = props
  return (
    <Layout>
      <Head>
        <title>Ssong10 | {params.id[1]}</title>
      </Head>
      <Markdown data={data}></Markdown>
    </Layout>
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
  const data = await mdParser(params.id)
  return {
    props: {
      params,
      data
    }
  }
}

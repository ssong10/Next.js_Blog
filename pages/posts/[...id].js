import { posts } from '../../lib/FILE'
import Layout from '../../components/layout'
import Markdown from '../../components/markdown'
import { mdParser,getAnchorHTML } from '../../lib/posts';
import Head from 'next/head'
export default function Post(props) {
  const { params, data, anchor } = props
  return (
    <Layout>
      <Head>
        <title>Ssong10 | {params.id[1]}</title>
      </Head>
      <section className="side-bar">
        <p><span className="side-bar-title">{params.id[1]}</span></p>
        <ul className="anchor-list" dangerouslySetInnerHTML={{__html:anchor}}></ul>
      </section>
      <main className="container">
        <Markdown data={data}></Markdown>
      </main>
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
  const anchor = getAnchorHTML()
  return {
    props: {
      params,
      data,
      anchor
    }
  }
}

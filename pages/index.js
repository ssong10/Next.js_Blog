import Head from 'next/head'
import Layout from '../components/layout'
import Markdown from '../components/markdown'
import { remarkHTML } from '../lib/posts';

export default function Home({data}) {
  return (
    <Layout>
      <Head>
        <title>Ssong10</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Markdown data={data}/>
      </main>
    </Layout>
  )
}
export async function getStaticProps() {
  const data = await remarkHTML(['main','main'])
  return {
    props: {
      data
    }
  }
}
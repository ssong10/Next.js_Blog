import Layout from '../components/layout'
import Markdown from '../components/markdown'
import { mdParser } from '../lib/posts';

export default function Home({data}) {
  return (
    <Layout>
      <main>
        <Markdown data={data}/>
      </main>
    </Layout>
  )
}
export async function getStaticProps() {
  const data = await mdParser(['main','main'])
  return {
    props: {
      data
    }
  }
}
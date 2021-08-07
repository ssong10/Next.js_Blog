import Layout from '@components/layout'
import Markdown from '@components/markdown'
import { getPost } from '@utils/firebase'
import { renderer } from '@utils/posts';
import setPaths from '@utils/setPaths';
import styled from 'styled-components'
import Head from 'next/head'

const Container = styled.main`
  margin-bottom: 100px;
  line-height:2;
  min-height: 90vh;

  @media screen and (max-width: 768px) {
    width:90%;
    font-size: 80%;
  }
`

const Content = styled.div`
  width: 85%;
  margin: auto;  
`

export default function Home({data,timeStamp}) {
  return (
    <Layout>
      <Head>
        <title>Ssong10</title>
      </Head>
      <Container>
        <Content>
          <Markdown data={data}/>
        </Content>
      </Container>
    </Layout>
  )
}
export async function getStaticProps() {
  const post = await getPost(['main','main'])
  const data = await renderer(post.content)
  return {
    props: {
      data,
      createAt : post.createdAt,
      updatedAt : post.updatedAt,
    }
  }
}
import { posts } from '@constant/FILE'
import Layout from '@components/layout'
import Markdown from '@components/markdown'
import Timestamp from '@components/timestamp'
import { getPost } from '@utils/firebase'
import { renderer, getAnchorHTML } from '@utils/posts';
import Head from 'next/head'
import styled from 'styled-components'

const Container = styled.main`
  margin-bottom: 100px;
  margin-left : 17vw;
  line-height:2;
  min-height: 90vh;
  
  @media screen and (max-width: 768px) {
    width:90%;
    font-size: 80%;
  }
  @media screen and (max-width: 1280px) {
    margin-left: 0;
  }
`
const Content = styled.div`
  width: 85%;
  margin: auto;  
`
const Title = styled.h1`
  text-align:center;
`
export default function Post(props) {
  const { params, data, anchor,createdAt, updatedAt } = props
  return (
    <Layout>
      <Head>
        <title>Ssong10 | {params.id[1]}</title>
      </Head>
      <section className="side-bar">
        <p><span className="side-bar-title">{params.id[1]}</span></p>
        <ul className="anchor-list" dangerouslySetInnerHTML={{__html:anchor}}></ul>
      </section>
      <Container>
        <Content>
          <Title>
          {params.id[1]}  
          </Title>
          <Timestamp createdAt={createdAt} updatedAt={updatedAt}></Timestamp>
          <Markdown data={data}></Markdown>
        </Content>
      </Container>
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
}

export async function getStaticProps({ params }) {
  const post = await getPost(params.id)
  const data = await renderer(post.content)
  const anchor = getAnchorHTML()
  return {
    props: {
      params,
      data,
      anchor,
      createdAt : post.createdAt,
      updatedAt : post.updatedAt,
    }
  }
}

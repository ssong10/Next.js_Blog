import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet() 
    const originalRenderPage = ctx.renderPage
    try {
      // sheet을 사용해 정의된 모든 스타일을 수집
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => 
          sheet.collectStyles(<App {...props} />),
      })
      // Documents의 initial props 
      const initialProps = await Document.getInitialProps(ctx)
      // props와 styles를 반환
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles} 
            {sheet.getStyleElement()}
          </>
        ),
      } 
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet"></link>
          <script async src="https://kit.fontawesome.com/17820a52a0.js" crossOrigin="anonymous"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
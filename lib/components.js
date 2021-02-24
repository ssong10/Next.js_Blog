export const getBlobUrl = (code)=> {
  const { html, css, js } = code
  const getBlobURL = (code, type) => {
    const blob = new Blob([code], { type })
    return URL.createObjectURL(blob)
  }
  const cssURL = getBlobURL(css, 'text/css')
  const jsURL = getBlobURL(js, 'text/javascript')
  const source = 
  `
    <html>
      <head>
        <meta charset="utf-8">
        ${css && `<link rel="stylesheet" type="text/css" href="${cssURL}" />`}
      </head>
      <body>
        ${html || ''}
      </body>
      ${js && `<script src="${jsURL}"></script>`}
    </html>
  `
  return getBlobURL(source, 'text/html')
}
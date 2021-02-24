import {getPost} from '../lib/firebase'
import markdownIt from 'markdown-it'
const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})
.enable(['link' ,'image'])
// .use(require('markdown-it-anchor').default, 
//   {
//     level: 1,
//     slugify: string => string,
//     permalink: true,
//     permalinkSpace:false,
//     permalinkHref	: slug => `${window.location.href}#${slug}`,
//     callback: (token, { slug }) => {
//       const $anchor = document.querySelector('.anchor-list');
//       if ($anchor){
//         $anchor.innerHTML += `<li><a class="anchor-tag ${token.tag}_tags" href="${window.location.href}#${slug}">${slug}</a></li>`
//       }
//   },
//   permalinkClass: 'header-anchor',
//   permalinkSymbol: '#',
//   permalinkBefore: true
// })

export async function mdParser(path) {
  const content = await getPost(path)
  return md.render(content)
}
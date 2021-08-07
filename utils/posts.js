import {getPost} from './firebase'
import markdownIt from 'markdown-it'
const anchor = require('markdown-it-anchor')

let anchorHTML = ''
const md = markdownIt({
  html: true,
  linkify: true,
  typographer: true
})
.enable(['link' ,'image'])
.use(anchor, {
  slugify: string => string,
  permalink: true,
  permalinkSpace:false,
  callback: (token, { slug }) => {
    anchorHTML += `<li><a class="anchor-tag ${token.tag}_tags" href="#${slug}">${slug}</a></li>`
  },
  permalinkClass: 'header-anchor',
  permalinkSymbol: '#',
  permalinkBefore: true
})

export function getAnchorHTML () {
  const data = anchorHTML
  return data
}
export function renderer(content) {
  anchorHTML = ''
  const mdHTML = md.render(content)
  return mdHTML
}
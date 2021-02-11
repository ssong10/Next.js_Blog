import {getPost} from '../lib/firebase'
import remark from 'remark'
import html from 'remark-html'

export async function remarkHTML(path) {
  const content = await getPost(path)
  const processedContent = await remark()
    .use(html)
    .process(content)
    const contentHTML =processedContent.toString()
  return contentHTML
}


// const postsDirectory = path.join(process.cwd(), 'posts')

// const getFileData = (postsDirectory,subjectName, fileName) => {
//   // Remove ".md" from file name to get id
//   const id = fileName.replace(/\.md$/, '')
//   const fullPath = path.join( postsDirectory,subjectName, fileName)      
//   const fileContents = fs.readFileSync(fullPath , 'utf8')
//   // Use gray-matter to parse the post metadata section
//   const matterResult = matter(fileContents)
//   const {content,data} = matterResult
//   return {
//     id:[subjectName,id],
//     ...matterResult.data
//   }
// }
// export function getPostsData() {
//   return {data:'data'}

//   // const subjectNames = fs.readdirSync(postsDirectory)
//   // const allPostsData = subjectNames.reduce((Data,subjectName) => {
//   //   const fileNames = fs.readdirSync(`${postsDirectory}/${subjectName}`)
//   //   const fileData = fileNames.map(fileName => {
//   //     return getFileData(postsDirectory,subjectName,fileName)
//   //   })
//   //   return [...Data,...fileData]
//   // },[])
//   // return allPostsData
// }

// export function getAllFileDir() {
//   const subjectNames = fs.readdirSync(postsDirectory)
//   const allPostsData = subjectNames.map(subjectName => {
//     const fileNames = fs.readdirSync(`${postsDirectory}/${subjectName}`)
//     return fileNames.map(fileName => {
//       return getFileData(postsDirectory,subjectName,fileName)
//     })
//   })
//   console.log(allPostsData)
//   return allPostsData
// }
import { getPaths, fetchPaths } from './firebase'
import { posts, components } from '@constant/FILE'

const setPaths = async () => {
  const data = await getPaths()
  const newObject = {}
  Object.entries(data).forEach(([key,value])=> {
    let tmp = {}
    Object.entries(value).forEach(([title,value]) => {
      tmp[title] = {
        content:value.content,
        createdAt:Date.now(),
        updatedAt:Date.now()
      }
    })
    newObject[key] = tmp
  })
  fetchPaths(newObject)
}
export default setPaths
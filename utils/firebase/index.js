import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";

  var firebaseConfig = {
    apiKey: "AIzaSyDz7fmntQQ2cMdExdwsr3xYLTwgxaDIJkU",
    authDomain: "ssong10-blog.firebaseapp.com",
    databaseURL: "https://ssong10-blog-default-rtdb.firebaseio.com",
    projectId: "ssong10-blog",
    storageBucket: "ssong10-blog.appspot.com",
    messagingSenderId: "31669301681",
    appId: "1:31669301681:web:7dd08f1bbeb60cfb600d90",
    measurementId: "G-PQVNTYH8VN"
  };
// Initialize Firebase

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

const database = firebase.database()

export const fetchPost = async (sub,title,context) => {
  const post = await getPost([sub,title])
  const ref = database.ref(`/posts/${sub}/${title}`)
  const changePost = {
    ...post,
    content:context,
    updatedAt : Date.now(),
  }
  if (!post) {
    changePost['createdAt'] = Date.now()
  } 
  ref.update(changePost).then(()=> {
    console.log(`${sub} ${title} 생성완료`)
  })
}

export const fetchComponent = (title,code) => {
  const ref = database.ref(`/components/${title}`)
  ref.update(code)
    .then(()=>{
      console.log(`${title} 생성완료`)
    })
}

const getData = async (path)=>{
  const ref = database.ref(path)
  const data= await ref.once('value').then(snapshot=> {
    return snapshot.val()
  })
  return data
}

export async function getPost(params){
  const [sub,item] = params
  return getData(`/posts/${sub}/${item}`)
}

export async function getComponent(params){
  return getData(`/components/${params}`)
}

export const getPaths = async () => {
  return getData('/posts')
}
export const fetchPaths = (paths) => {
  const ref = database.ref(`/posts`)
  ref.update(paths)
    .then(()=> {
    })
}
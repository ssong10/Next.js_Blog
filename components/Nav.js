import Link   from 'next/link'
import { posts, components } from '@constant/FILE'
import { useRouter } from "next/router";
import {useState,useEffect} from "react"

const Item = ({item,path,match}) => {
  return (
    <Link href={path}>
      <div className={"nav-item " + (match?'active':'')}>
        <a href={path}><span>{item}</span></a>
      </div>
    </Link>
  )
}

const Subject = ({paths,subject,items,basePath}) => {
  const matchSub = paths[0] === subject
  const matchItem = (item) => {
    return paths[1] === item
  }
  return (
    <div className="nav-sub">
      <span className={matchSub ? 'active' : ''}>{subject}</span>
      <div className="nav-items-wrap">
        <div className="nav-item-list">
          {items.map((item,idx) => (
            <Item
              key={idx} path={basePath+subject+'/'+item} item={item}
              match={matchSub & matchItem(item)} />
            ))}
        </div>
      </div>
    </div>
  )
}
const mobiletitle = (path) => {
  const [sub,item] = path
  if (sub && item){
    return `[ ${sub} ] ${item}`
  } else {
    return `[ Ssong10 ]`
  }
}
export default function Nav() {
  const { asPath } = useRouter();
  const [sideNav, setSideNav] = useState(false)
  useEffect(()=>{
    setSideNav(false)
  },[asPath])
  const path = decodeURI(asPath).trim('/').split('/')
  const toggleSideNav = () => {
    setSideNav(!sideNav)
  }
  return (
    <header id="nav">
      <i onClick={toggleSideNav} className="side-button fas fa-bars"></i>
      <Link href="/">
        <span className="main-title">Ssong10</span>
      </Link>
      <span className="mobile-title">{mobiletitle(path.slice(-2,))}</span>
      <div className={sideNav ? 'nav-links show' : "nav-links"}>
        <Link href="/">
        <div className="nav-sub mobile-home">
          <span>Ssong10</span>
        </div>
        </Link>
        {posts.map((post,idx) => (
          <Subject
            paths={path.slice(-2,)}
            key={idx}
            subject={post.subject}
            items={post.items}
            basePath = '/posts/'
          ></Subject>
        ))}
        <Subject
          paths={path.slice(-2,)}
          subject='component'
          items={components}
          basePath = '/'
        ></Subject>
      </div>
    </header>
  )
}
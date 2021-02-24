import Link   from 'next/link'
import { posts, components } from '../lib/FILE'
import { useRouter } from "next/router";

const Item = ({item,path,match}) => {
  return (
    <Link href={path}
    >
      <div className={"nav-item " + (match?'active':'')}>
        <span>{item}</span>
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

export default function Nav() {
  const { asPath } = useRouter();
  const path = decodeURI(asPath).trim('/').split('/')
  return (
    <header id="nav">
      <i className="side-button fas fa-bars" aria-hidden="true"></i>
      <Link href="/">
        <span className="main-title">Ssong10</span>
      </Link>
      <span className="mobile-title">[ Ssong 10 ]</span>
      <div className="nav-links">
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
      <style jsx global>
        {`
          #nav {
            z-index:1000;
            position :sticky;
            top : 0;
            left : 0;
            right : 0;
            background-color:#fefcfe;
            border-bottom: 1px solid #eaeaea;
            height : var(--navHeight);
            padding : 0.6rem 1rem;
          }
          #nav .show {display:block}
          .main-title {display:inline-block;font-weight:700;font-size:1.4rem;cursor : pointer;  line-height : 2.4rem;}
          .nav-links{display:inline-block;position:absolute;right:5vw;}
          .mobile-title {
            display:none;
            font-weight:600;
            font-size:1.1rem;
            line-height : 2.4rem;
            float:right;
          }
          .nav-sub{display:inline-block;line-height:2.4rem;position:relative;margin-left:3vw;cursor:pointer;text-align:left}
          .nav-sub:hover .nav-item-list {display:block}
          .nav-sub>span {padding:1vw}
          .nav-items-wrap { padding-top:20px}
          .nav-item-list {display:none;position: absolute;line-height:2.2rem;width:200px;right:-5px;top:85%;min-height:auto;border:1px solid #eaeaea;background-color:#fefcfe;padding:0.3rem}
          .nav-item{
            padding:0rem 0.5rem;
            transition: 0.3s
          }
          .nav-item:hover {
            background-color : rgba(135,64,33,0.1);
          }
          .active {color: #2f9aea;}
          .nav-item-list:after,
          .nav-item-list:before {
            content: '';
            position: absolute;
            width:0;
            height:0;
            top: -20px;
            border-style: solid;
          }
          .nav-item-list:after {
            left: 170px;
            border-color: transparent transparent white transparent;
            border-width: 10px;
          }
          .nav-item-list:before {
            left: 169px;
            top:-21px;
            border-color: transparent transparent gray transparent;
            border-width: 11px;
            z-index:-1
          }
        `}
      </style>
    </header>
  )
}
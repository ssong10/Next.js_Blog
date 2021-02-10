import Link from 'next/link'
import { posts, components } from '../lib/FILE'
const Subject = ({subject,items}) =>{
  return (
    <div className="nav-sub">
      <span>{subject}</span>
      <div className="nav-item-list">
        {items.map(item => (
          <Link key={item} href={'/posts'+'/'+subject+'/'+item}>
            <div className="nav-item">
              <span>{item}</span>
            </div>
          </Link>
        ))}
      </div>
      <style jsx>
        {`
          .nav-sub{display:inline-block;line-height:2.4rem;position:relative;margin-left:3vw;cursor:pointer;text-align:left}
          .nav-sub:hover .nav-item-list {display:block}
          .nav-sub>span {padding:1vw}
          .nav-item-list {display:none;position: absolute;line-height:2.2rem;width:200px;right:0;min-height:auto;border:1px solid #eaeaea;background-color:#fefcfe;padding:0.3rem}
          .nav-item{display:inline-block;width:100%;padding:0rem 0.5rem;}
        `}
      </style>      
    </div>
  )
}

export default function Nav() {
  return (
    <header id="nav">
      <i className="side-button fas fa-bars" aria-hidden="true"></i>
      <Link href="/">
        <span className="main-title">Ssong10</span>
      </Link>
      <span className="mobile-title">[ Ssong 10 ]</span>
      <div className="nav-links">
        {posts.map((post,idx) => (
          <Subject key={idx} subject={post.subject} items={post.items}></Subject>
        ))}
      </div>
      <style jsx>
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
        `}
      </style>
    </header>
  )
}
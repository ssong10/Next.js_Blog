import Nav from './nav'
import Instagram from '../public/Instagram.svg'
import Github from '../public/Github.svg'

export default function Layout({children}) {
  return (
    <>
      <Nav />
      <div className="container">
        {children}
      </div>
      <footer>
        <div className="links">
          <a target="_blank" href="https://github.com/ssong10">
            <Github />
          </a>
          <a target="_blank" href="https://www.instagram.com/2_seung10/">
            <Instagram />
          </a>
        </div>
        <div><small>Ssong10</small></div>
      </footer>
    </>
  )
}
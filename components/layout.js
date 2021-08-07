import Nav from "@components/nav"

export default function Layout({children}) {
  return (
    <>
      <Nav />
      {children}
      <footer>
        <div className="links">
          <a target="_blank" href="https://github.com/ssong10">
            <i className="fab fa-github"></i>
          </a>
          <a target="_blank" href="https://www.instagram.com/2_seung10/">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
        <div><small>Ssong10</small></div>
        <div><small>leesy1403@naver.com</small></div>
      </footer>
    </>
  )
}
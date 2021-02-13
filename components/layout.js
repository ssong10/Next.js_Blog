import Nav from './nav'
export default function Layout({children}) {
  return (
    <>
      <Nav />
      <div className="container">
        {children}
      </div>
      <style jsx global>
        {`
          body {margin:0;padding:0}
          .container {width:80%;margin:auto;}
        `}

      </style>
    </>
  )
}
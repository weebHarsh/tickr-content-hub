function Error({ statusCode }: { statusCode?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <div style={{ textAlign: "center" }}>
        <h1 style={{ fontSize: "4rem", color: "#530093", opacity: 0.2 }}>{statusCode || "Error"}</h1>
        <p style={{ color: "#6b7280" }}>
          {statusCode === 404 ? "Page not found" : "An error occurred"}
        </p>
        <a href="/" style={{ color: "#530093", textDecoration: "underline", marginTop: "1rem", display: "inline-block" }}>
          Back to Dashboard
        </a>
      </div>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: { res?: { statusCode: number }; err?: { statusCode: number } }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

import Footer from "../components/common/footer/footer";

const NotFound = () => {
  return (
    <>
      <div>
        <div style={{ height: "90px" }}></div>
        <div
          style={{
            textAlign: "center",
            color: "var(--burnt-red)",
            margin: "auto",
            overflow: "hidden",
          }}
        >
          <h3>Page Not found (404)</h3>
          <p>We can't find the page you are looking for</p>
        </div>
        <div style={{ height: "100px" }}></div>
      </div>
    </>
  );
};

export default NotFound;

import "draft-js/dist/Draft.css";
import TextEditor from "./components/textEditor";

const homeStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  backgroundColor: "#171717",
};

const titleStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  marginBottom: "1rem",
  color: "white",
};

export default function Home() {
  return (
    <div style={homeStyle}>
      <h1 style={titleStyle}>DraftJS Editor</h1>
      <TextEditor />
    </div>
  );
}

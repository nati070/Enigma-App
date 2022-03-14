import AnalizeComp from "./components/Analize";
import CoinTableComp from "./components/CoinTable";
import FirstPageComp from "./components/FirstPage";
import { Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";
import FileUpload from "./components/FileUpload";


function App() {
  return (
    <Div>
      <Title>Enigma App</Title>
      <DivLinks>
        <LinkType to="/live-dispaly">Live Display</LinkType>
        <LinkType to="/upload">Upload File DB</LinkType>
        <LinkType to="/analyze">Analyze from DB</LinkType>
      </DivLinks>

      <Routes>
        <Route path="/" element={<FirstPageComp />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/live-dispaly" element={<CoinTableComp />} />
        <Route path="/analyze" element={<AnalizeComp />} />
      </Routes>
    </Div>
  );
}

export default App;

const Div = styled.div``;

const Title = styled.div`
  display: felx;
  justify-content: center;
  padding: 15px;
  background-color: #7809b0;
  font-size: 20px;
  font-weight: bold;
  color: white;
`;
const DivLinks = styled.div`
  margin: 50px;
  display: felx;
  justify-content: center;
`;
const LinkType = styled(Link)`
  padding: 20px;
  margin: 90px 40px;
  font-size: 20px;
  color: white;
  border-radius: 20px;
  text-decoration: none;
  background-color: #7809b0;
`;

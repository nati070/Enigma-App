import { useState, useEffect } from "react";
import styled from "styled-components";
const utils = require("../utils/utils");

function CoinTableComp(props) {
  const [listInstrument, setListInstrument] = useState([]);

  const initializeInstrumentsData = async () => {
    try {
      const dataList = await utils.getInstrumentsData();
      setListInstrument(dataList);
    } catch (err) {
      console.error("faild useEffect bring data", err);
    }
    return () => {};
  };
  const updateInstrumentsData = () => {
    const timer = setTimeout(async () => {
      try{
      const dataList = await utils.getInstrumentsData();
      setListInstrument(dataList);
      }
      catch(err){
        console.error("faild useEffect bring data", err);
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  };

  useEffect(initializeInstrumentsData, []);
  useEffect(updateInstrumentsData, [listInstrument]);

  const listInstrumentData = listInstrument ? (
    listInstrument.map((instrument) => {
      return (
        <Row key={instrument.name}>
          <Cell>{instrument.name}</Cell>
          <Cell>{instrument.bid}</Cell>
          <Cell>{instrument.ask}</Cell>
          <Cell>{instrument.last}</Cell>
        </Row>
      );
    })
  ) : (
    <></>
  );

  return listInstrument ? (
    <Div>
      <Table>
        <tbody>
          <HeaderRow>
            <HeaderCell>Instrument</HeaderCell>
            <HeaderCell>Bid</HeaderCell>
            <HeaderCell>Ask</HeaderCell>
            <HeaderCell>Last</HeaderCell>
          </HeaderRow>
          {listInstrumentData}
        </tbody>
      </Table>
    </Div>
  ) : (
    <Header>There is problem. Try agein later</Header>
  );
}
export default CoinTableComp;
const Div = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Table = styled.table`
  border: 1px solid #ddd;
`;
const HeaderCell = styled.th`
  padding: 10px;
  border: 1px solid #ddd;
`;

const HeaderRow = styled.tr`
  border: 1px solid #ddd;
  background-color: #b8b3ad;
`;

const Row = styled.tr`
  border: 1px solid #ddd;
  background-color: #6e6c69;
  &: hover {
    background-color: #dbd4c1;
    cursor: pointer;
  }
`;
const Cell = styled.td`
  border: 1px solid #ddd;
  padding: 5px;
`;

const Header = styled.h1`
  border: 1px solid #ddd;
`;

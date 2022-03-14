import { useState } from "react";
import styled from "styled-components";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import GraphComp from "./Graph";

const utils = require("../utils/utils");

function AnalizeComp(props) {
  const [valueStart, setValueStart] = useState(new Date("2019-01-01T00:00:00"));
  const [valueEnd, setValueEnd] = useState(new Date("2019-01-01T23:59:59"));
  const [SMA, setSMA] = useState(0);
  const [list, setList] = useState([]);

  const search = async () => {
    if (valueStart <= valueEnd && valueStart < Date.now()) {
      try {
        const dataAnalytics = await utils.getAnalyticsInfo({
          time_start: valueStart,
          time_end: valueEnd,
          sma: SMA,
        });
        setList(dataAnalytics);
        if (dataAnalytics.length == 0) {
          alert("not found data, try other dates");
        }
      } catch (err) {
        console.error("problem with getAnalyticsInfo", err);
      }
    } else {
      alert("incorrect Date");
    }
  };
  let sum_ele = 0;
  const listData =[]

     for(let index=0; index<list.length && SMA ; index++){
        let ele = list[index];
        sum_ele = (sum_ele + parseFloat(ele.price_close))
        listData.push(
          <Row key={ele.id}>
            <Cell>{ele.time_peroid_start}</Cell>
            <Cell>{ele.price_open}</Cell>
            <Cell>{ele.price_high}</Cell>
            <Cell>{ele.price_low}</Cell>
            <Cell>{ele.price_close}</Cell>
            <Cell>{ele.volume_traded}</Cell>
            <Cell>{ele.trades_count}</Cell>
            <Cell>{(sum_ele/(index+1)).toFixed(2)}</Cell>
          </Row>
        )
      }
   
  return list.length == 0 ? (
    <DivTable>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack spacing={3}>
          <DesktopDatePicker
            required
            label="from date"
            inputFormat="dd/MM/yyyy"
            value={valueStart}
            onChange={(e) => setValueStart(e)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DesktopDatePicker
            required
            label="to date"
            inputFormat="dd/MM/yyyy"
            value={valueEnd}
            onChange={(e) => {
              setValueEnd(e);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            onChange={(e) => setSMA(e.target.value)}
            type="number"
            required
            id="outlined-required"
            label="SMA"
            defaultValue="Enter Number"
          />

          <ButtonSearch onClick={() => search()}>SEARCH</ButtonSearch>
        </Stack>
      </LocalizationProvider>
    </DivTable>
  ) : (
    <Div>
      <Label>
        From Date :{" "}
        {valueStart.getDate() +
          "/" +
          (valueStart.getMonth() + 1) +
          "/" +
          valueStart.getFullYear()}
      </Label>
      <Label>
        To Date :
        {valueEnd.getDate() +
          "/" +
          (valueEnd.getMonth() + 1) +
          "/" +
          valueEnd.getFullYear()}
      </Label>
      <Label>SMA length: {SMA}</Label>
      <DivTable>
        <Table>
          <tbody>
            <HeaderRow>
              <HeaderCell>time_peroid</HeaderCell>
              <HeaderCell>price_open</HeaderCell>
              <HeaderCell>price_high</HeaderCell>
              <HeaderCell>price_low</HeaderCell>
              <HeaderCell>price_close</HeaderCell>
              <HeaderCell>volume_traded</HeaderCell>
              <HeaderCell>trades_count</HeaderCell>
              <HeaderCell>SMA</HeaderCell>
            </HeaderRow>
            {listData}
          </tbody>
        </Table>
      </DivTable>
      <GraphComp listData = {list}/>
    </Div>
  );
}
export default AnalizeComp;

const Div = styled.div``;

const DivTable = styled.div`
  display: flex;
  justify-content: center;
`;

const Label = styled.p`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

const ButtonSearch = styled.button`
  margin: 20px;
  padding: 10px;
  font-size: 20px;
  color: white;
  border-radius: 20px;
  cursor: pointer;
  background-color: #7809b0;
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

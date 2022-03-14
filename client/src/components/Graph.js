import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio: true
};

function GraphComp(props) {
  const [labels , setLabels] = useState([])
  const [pricesHigh , setPricesHigh] = useState([])
  const [pricesOpen , setPricesOpen] = useState([])
  const [pricesLow , setPricesLow] = useState([])
  const [pricesClosed , setPricesClosed] = useState([])
  useEffect(()=>{
    const get_labels = []
    const get_price_open = []
    const get_price_high = []
    const get_price_low = []
    const get_price_close = []
    props.listData.forEach(ele => {
        get_labels.push(ele.time_peroid_start);
        get_price_open.push(ele.price_open);
        get_price_high.push(ele.price_high);
        get_price_close.push(ele.price_close);
        get_price_low.push(ele.price_low);
    })
    setLabels(get_labels)
    setPricesOpen(get_price_open)
    setPricesHigh(get_price_high)
    setPricesLow(get_price_low)
    setPricesClosed(get_price_close)    
  } , [props])
  
  const data = {
    labels,
    datasets: [
      {
        label: "price_open",
        data: pricesOpen,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "price_high",
        data: pricesHigh,
        borderColor: "rgb(0,128,0)",
        backgroundColor: "rgba(0, 162, 235, 0.5)",
      },
      {
        label: "price_low",
        data: pricesLow,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "price_close",
        data: pricesClosed,
        borderColor: "rgb(128,0,128)",
        backgroundColor: "rgba(10, 102, 235, 0.6)",
      },
    ],
  };

  return <Div><Line options={options} data={data} /></Div>;
}
export default GraphComp;

const Div = styled.div`
    padding: 100px;
    display:flex;
    jutify-content: center;
`

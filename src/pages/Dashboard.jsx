import React, { useState, useEffect, useMemo } from "react";
import Chart from "react-apexcharts";

import { useSelector } from "react-redux";

import StatusCard from "../components/status-card/StatusCard";

import Table from "../components/table/Table";

import Badge from "../components/badge/Badge";

import statusCards from "../assets/JsonData/status-card-data.json";

import axios from "axios";

const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Store Customers",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};
const topCustomers = {
  head: ["user", "total orders", "total spending"],
  body: [
    {
      username: "john doe",
      order: "490",
      price: "$15,870",
    },
    {
      username: "frank iva",
      order: "250",
      price: "$12,251",
    },
    {
      username: "anthony baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "frank iva",
      order: "110",
      price: "$9,251",
    },
    {
      username: "anthony baker",
      order: "80",
      price: "$8,840",
    },
  ],
};

const renderCusomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCusomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.totalOrders}</td>
    <td>{item.totalSpending}</td>
  </tr>
);

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john doe",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer.mode);
  const d = new Date();
  const a = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
  const [data, setData] = useState([]);
  const [dataTotal, setDataTotal] = useState([
    {
      icon: "bx bx-dollar-circle",
      count: "0$",
      title: " Revenue",
    },

    {
      icon: "bx bx-receipt",
      count: "0",
      title: " orders",
    },
    {
      icon: "bx bx-user",
      count: "0",
      title: " users",
    },
    {
      icon: "bx bx-film",
      count: "0",
      title: "Movies",
    },
  ]);
  const [dataUser, setDataUser] = useState([]);
  const [dataOrder, setDataOrder] = useState([]);

  // fetchApi
  useEffect(() => {
    fetchApi1();
    fetchApi2();
    fetchApi3();
  }, []);

  const fetchApi1 = async () => {
    const { data } = await axios.get(
      `https://backend-boo.herokuapp.com/api/summing/summary/${a}`
    );
    await setData(data);
    await setDataTotal(data?.total);
  };
  console.log(data);
  const fetchApi2 = async () => {
    const { data } = await axios.get(
      `https://backend-boo.herokuapp.com/api/summing/top10user`
    );
    await setDataUser(data);
  };

  const fetchApi3 = async () => {
    const { data } = await axios.get(
      `https://backend-boo.herokuapp.com/api/summing/top10recent`
    );
    await setDataOrder(data);
  };
  const test = () => {
    console.log(dataUser);
    return (
      <Table
        headData={topCustomers.head}
        renderHead={(item, index) => renderCusomerHead(item, index)}
        bodyData={dataUser}
        renderBody={(item, index) => renderCusomerBody(item, index)}
      />
    );
  };
  const [dataTime, setdataTime] = useState([]);
  const handle = (e) => {
    const value = e.target.value;
    if (value === "mounth") return setdataTime(data?.mounth);
    if (value === "day") return setdataTime(data?.day);
    if (value === "total") return setdataTime(data?.total);
  };
  console.log("dataTime", dataTime);
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div style={{ fontSize: "20px" }}>
        Revenue and Orders by:&emsp;
        <select name="" id="" onChange={handle} className="select">
          <option value="total">Total</option>
          <option value="day">Day</option>
          <option value="mounth">Mounth</option>
        </select>
      </div>
      <div className="row">
        <div className="col-6">
          <div className="row">
            {dataTime.length > 0
              ? dataTime?.map((item, index) => (
                  <div className="col-6" key={index}>
                    <StatusCard
                      icon={item.icon}
                      count={item.count}
                      title={item.title}
                    />
                  </div>
                ))
              : dataTotal?.map((item, index) => (
                  <div className="col-6" key={index}>
                    <StatusCard
                      icon={item.icon}
                      count={item.count}
                      title={item.title}
                    />
                  </div>
                ))}
          </div>
        </div>
        <div className="col-6">
          <div className="card full-height">
            {/* chart */}
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card__header">
              <h3>top 10 users</h3>
            </div>
            <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={dataUser}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div>
            {/* <div className="card__footer">
              <Link to="/">view all</Link>
            </div> */}
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card__header">
              <h3>latest 10 orders</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={dataOrder.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            {/* <div className="card__footer">
              <Link to="/">view all</Link>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import Badge from "../components/badge/Badge";
import StatusCard from "../components/status-card/StatusCard";

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
	const [chartOptionss, setChartOptions] = useState();
	const [pageSize, setPageSize] = useState(5);

	const columnsUser = useMemo(
		() => [
			{ field: "stt", headerName: "", width: 10 },
			{ field: "username", headerName: "Full Name", width: 130 },
			{ field: "totalOrders", headerName: "Total Order", width: 100 },
			{ field: "totalSpending", headerName: "Total Spending", width: 120 },
		],
		[]
	);
	const columnsOrder = useMemo(
		() => [
			{ field: "stt", headerName: "", width: 10 },
			{ field: "idorder", headerName: "Id", width: 100 },
			{
				field: "username",
				headerClassName: "super-app-theme--header",
				headerName: "Full Name",
				width: 130,
			},
			{ field: "date", headerName: "Date", width: 130 },
			{ field: "totalSPrice", headerName: "Price", width: 120 },
		],
		[]
	);
	const chartOptions = {
		series: [
			{
				name: "Current Year",
				// data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1250, 700],
				data: chartOptionss?.series[0].data,
			},
			{
				name: "Last Year",
				data: chartOptionss?.series[1].data,
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
					"Oct",
					"Nov",
					"Dec",
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
	// fetchApi
	useEffect(() => {
		fetchApi1();
		fetchApi2();
		fetchApi3();
		fetchApi4();
	}, []);

	const fetchApi1 = async () => {
		const { data } = await axios.get(
			`https://backend-boo.vercel.app/api/summing/summary/${a}`
		);
		await setData(data);
		await setDataTotal(data?.total);
	};
	const fetchApi2 = async () => {
		const { data } = await axios.get(
			`https://backend-boo.vercel.app/api/summing/top10user`
		);
		await setDataUser(data);
	};
	const fetchApi3 = async () => {
		const { data } = await axios.get(
			`https://backend-boo.vercel.app/api/summing/top10recent`
		);
		await setDataOrder(data);
	};
	const fetchApi4 = async () => {
		const { data } = await axios.get(
			`https://backend-boo.vercel.app/api/summing/summaryMoneyInThisYearAndLastYear`
		);
		await setChartOptions(data);
	};
	const [dataTime, setdataTime] = useState([]);
	const handle = (e) => {
		const value = e.target.value;
		switch (value) {
			case "total":
				return setdataTime(data?.total);
			case "day":
				return setdataTime(data?.day);
			case "currentweek":
				return setdataTime(data?.currentweek);
			case "mounth":
				return setdataTime(data?.mounth);
			case "onemounthago":
				return setdataTime(data?.onemounthago);
			default:
				return 0;
		}
	};
	return (
		<div>
			<h2 className='page-header'>Dashboard</h2>
			<div style={{ fontSize: "20px" }}>
				Revenue and Orders by:&emsp;
				<select name='' id='' onChange={handle} className='select'>
					<option value='total'>Total</option>
					<option value='day'>In Day</option>
					<option value='currentweek'>In Week</option>
					<option value='mounth'>In Month</option>
					<option value='onemounthago'>Month ago</option>
				</select>
			</div>
			<div className='row'>
				<div className='col-6'>
					<div className='row'>
						{dataTime.length > 0
							? dataTime?.map((item, index) => (
									<div className='col-6' key={index}>
										<StatusCard
											icon={item.icon}
											count={item.count}
											title={item.title}
										/>
									</div>
							  ))
							: dataTotal?.map((item, index) => (
									<div className='col-6' key={index}>
										<StatusCard
											icon={item.icon}
											count={item.count}
											title={item.title}
										/>
									</div>
							  ))}
					</div>
				</div>
				<div className='col-6'>
					<div className='card full-height'>
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
							type='line'
							height='100%'
						/>
					</div>
				</div>
				<div className='col-4'>
					<div className='card'>
						<div className='card__header'>
							<h3>top 10 users</h3>
						</div>
						<DataGrid
							autoHeight
							rows={dataUser}
							getRowId={(row) => row.stt}
							columns={columnsUser}
							rowsPerPageOptions={[5, 10, 20]}
							pageSize={pageSize}
							onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
						/>
						{/* <div className="card__body">
              <Table
                headData={topCustomers.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData={dataUser}
                renderBody={(item, index) => renderCusomerBody(item, index)}
              />
            </div> */}
						{/* <div className="card__footer">
              <Link to="/">view all</Link>
            </div> */}
					</div>
				</div>
				<div className='col-8'>
					<div className='card'>
						<div className='card__header'>
							<h3>latest 10 orders</h3>
						</div>
						<DataGrid
							autoHeight
							rows={dataOrder}
							getRowId={(row) => row.stt}
							columns={columnsOrder}
							rowsPerPageOptions={[5, 10, 20]}
							pageSize={pageSize}
							onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
						/>
						{/* <div className="card__body">
              <Table
                headData={latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={dataOrder.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div> */}
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

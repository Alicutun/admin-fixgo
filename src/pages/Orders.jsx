import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import OrderByDay from "../components/subComponent/OrderByDay";
import OrderByCinema from "../components/subComponent/OrderByCinema";
import { Container, Grid } from "@mui/material";
const Orders = () => {
	const [data, setData] = useState([]);
	const [pageSize, setPageSize] = useState(10);
	useEffect(() => {
		const fetchOrders = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies/listBillManage`
			);
			setData(data);
		};
		fetchOrders();
	}, []);
	const columns = useMemo(
		() => [
			{ field: "idBill", headerName: "ID", width: 50 },
			{ field: "fullName" || "username", headerName: "Full name", width: 120 },
			{ field: "createDate", headerName: "Date Order", width: 100 },
			{ field: "movie", headerName: "Movie", width: 120 },
			{ field: "cinema", headerName: "Cinema", width: 100 },
			{ field: "date", headerName: "Date", width: 100 },
			{ field: "session", headerName: "Session", width: 70 },
			{ field: "listItem", headerName: "Seat ", width: 150 },
			{ field: "totalMoney", headerName: "Price", width: 100 },

			// {
			//   field: "isActive",
			//   headerName: "Active",
			//   width: 100,
			//   type: "boolean",
			//   // edittable: true,
			// },
		],
		[]
	);
	const [open, setOpen] = useState(true);

	return (
		<div>
			<h2 className='page-header' onClick={() => setOpen(!open)}>
				Orders <i class='bx bxs-caret-down-circle'></i>
			</h2>
			{open && (
				<div className='row'>
					<div className='col-12'>
						<div className='card'>
							<div className='card__body'>
								<DataGrid
									autoHeight
									rows={data}
									getRowId={(row) => row.idBill}
									columns={columns}
									rowsPerPageOptions={[5, 10, 20]}
									pageSize={pageSize}
									onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
			<Container>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<OrderByDay />
					</Grid>
					<Grid item xs={6}>
						<OrderByCinema />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Orders;

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const OrderByCinema = () => {
	// by Day
	// Date
	const [day1, setDay1] = useState([]);
	const [id1, setId1] = useState("");
	useEffect(() => {
		const fetchApi = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies/findMovieCinemaStep1`
			);
			await setDay1(data);
		};
		fetchApi();
	}, []);
	// movie
	const [day2, setDay2] = useState([]);
	const [id2, setId2] = useState("");
	useEffect(() => {
		const fetchMovie = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies/findMovieCinemaStep2/${id1}`
			);
			await setDay2(data);
		};
		fetchMovie();
	}, [id1]);
	// Date
	const [day3, setDay3] = useState([]);
	const [id3, setId3] = useState("");
	useEffect(() => {
		const fetchSesscion = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies/findMovieCinemaStep3/${id1}/${id2}`
			);

			await setDay3(data[0].movieDate);
		};
		fetchSesscion();
	}, [id2]);

	/////
	const [dataT, setDataT] = useState([]);
	const [pageSize, setPageSize] = useState(10);
	useEffect(() => {
		const fetchOrders = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies/findMovieCinemaStep4/${id1}/${id2}/${id3}`
			);
			await setDataT(data);
		};
		fetchOrders();
	}, [id3]);

	const columns = useMemo(
		() => [
			// { field: "idSession", headerName: "idSession", width: 200 },
			{ field: "nameSession", headerName: "Session", width: 200 },
			{ field: "seat", headerName: "Available Seat ", width: 200 },
		],
		[]
	);
	return (
		<div>
			<h2 className='page-header'>By Cinema</h2>
			{/* rạp */}
			<div style={{ fontSize: "20px" }}>
				Cinema:&emsp;
				<select
					className='select'
					id='time'
					onChange={(e) => setId1(e.target.value)}
				>
					<option value=''>-- None --</option>
					{day1?.map((items, index) => (
						<option key={index} value={items._id}>
							{items.name}
						</option>
					))}
				</select>
			</div>
			{/* phim */}
			<div style={{ fontSize: "20px" }}>
				Movie:&emsp;
				<select
					className='select'
					id='cinema'
					onChange={(e) => setId2(e.target.value)}
				>
					<option value=''> -- Select Movie --</option>
					{day2?.map((items, index) => (
						<option key={index} value={items.idMovie}>
							{items.nameMovie}
						</option>
					))}
				</select>
			</div>
			{/* ngày */}
			<div style={{ fontSize: "20px" }}>
				Date:&emsp;
				<select
					className='select'
					id='time'
					onChange={(e) => setId3(e.target.value)}
				>
					<option value=''>-- None --</option>
					{day3?.map((items, index) => (
						<option key={index} value={items}>
							{items}
						</option>
					))}
				</select>
			</div>
			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card__body'>
							<DataGrid
								autoHeight
								rows={dataT}
								getRowId={(row) => row.idSession}
								columns={columns}
								rowsPerPageOptions={[5, 10, 20]}
								pageSize={pageSize}
								onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderByCinema;

/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Stack,
	TextField,
} from "@mui/material";
const orderByDay = () => {
	// by Day
	// Date
	const [day1, setDay1] = useState([]);
	const [id1, setId1] = useState("");
	useEffect(() => {
		const fetchSesscion = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies/findMovieDayStep1`
			);
			await setDay1(data);
		};
		fetchSesscion();
	}, []);
	// cinema
	const [day2, setDay2] = useState([]);
	const [id2, setId2] = useState("");
	useEffect(() => {
		const fetchMovie = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies/findMovieDayStep2/${id1}`
			);
			await setDay2(data);
		};
		fetchMovie();
	}, [id1]);

	// movie
	const [day3, setDay3] = useState([]);
	const [id3, setId3] = useState("");
	useEffect(() => {
		const fetchMovie = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies/findMovieDayStep3/${id2}/${id1}`
			);
			await setDay3(data);
		};
		fetchMovie();
	}, [id2]);

	const [dataT, setDataT] = useState([]);
	const [pageSize, setPageSize] = useState(10);
	useEffect(() => {
		const fetchOrders = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies/findMovieDayStep4/${id2}/${id1}/${id3}`
			);
			await setDataT(data);
		};
		fetchOrders();
	}, [id3]);

	// console.log("day 4 ", dataT);
	const columns = useMemo(
		() => [
			{ field: "nameSession", headerName: "Session", width: 200 },
			{ field: "seat", headerName: "Available Seat ", width: 200 },
		],
		[]
	);
	return (
		<div>
			<h2 className='page-header'>By Day</h2>
			<Grid container direction='column' spacing={2} alignItems='center'>
				{/* ngày */}
				<Grid item width='80%'>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Date</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={id1}
							label='Date'
							onChange={(event) => {
								setId1(event.target.value);
							}}
						>
							{day1?.map((item) => (
								<MenuItem value={item}>{item}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				{/* rạp */}
				<Grid item width='80%'>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Cinema</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={id2}
							label='Cinema'
							onChange={(event) => {
								setId2(event.target.value);
							}}
						>
							{day2?.map((item) => (
								<MenuItem value={item._id}>{item.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				{/* phim */}

				<Grid item width='80%' mb={2}>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Movie</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={id3}
							label='Movie'
							onChange={(event) => {
								setId3(event.target.value);
							}}
						>
							{day3?.map((item) => (
								<MenuItem value={item.idMovie}>{item.nameMovie}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
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

export default orderByDay;

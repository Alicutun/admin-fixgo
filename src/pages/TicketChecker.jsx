import { Box, Grid, Stack, Typography } from "@mui/material";
import "../components/topnav/topnav.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TicketChecker = () => {
	const [value, setValue] = useState("");
	const [dataA, setData] = useState([]);
	const [open, setOpen] = useState(false);
	console.log("value", value);
	console.log("data", dataA);

	const fetchData = async () => {
		await setData([]);
		const { data } = await axios.get(
			`https://backend-boo.vercel.app/api/checkBill/billToday/${value}/`
		);
		await setData(data);
	};
	const handleSubmit = () => {
		setOpen(true);
		fetchData();
	};

	return (
		<div>
			<Stack direction='row' justifyContent='center'>
				<Box className='topnav__search' width='50%'>
					<input
						id='input'
						type='text'
						placeholder='Checking tickets...'
						onChange={(e) => setValue(e.target.value)}
					/>
					<i
						className='bx bx-search'
						style={{ cursor: "pointer" }}
						onClick={handleSubmit}
					></i>
				</Box>
			</Stack>

			{open &&
				(dataA.length > 0 ? (
					<Stack
						direction='column'
						alignItems='center'
						justifyContent='center'
						marginTop='30px'
						spacing={2}
					>
						<Typography>Data: {dataA[0].at}</Typography>
						<Typography>Cinema: {dataA[0].cinema}</Typography>
						<Typography>Movie: {dataA[0].movie}</Typography>
						<Typography>Seat: {dataA[0].seat}</Typography>
					</Stack>
				) : (
					<Typography> Not found </Typography>
				))}
		</div>
	);
};

export default TicketChecker;

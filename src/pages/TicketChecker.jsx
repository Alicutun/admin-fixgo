import { Box, Grid, Stack } from "@mui/material";
import "../components/topnav/topnav.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TicketChecker = () => {
	const [value, setValue] = useState("");
	const [dataa, setData] = useState([]);
	console.log("value", value);
	console.log("data", dataa);
	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/checkBill/billToday/6380cf7343d0a2a65ce8a3a5/`
			);
			setData(data);
		};
		fetchData();
	}, [value]);
	return (
		<div>
			<Stack direction='row' justifyContent='center'>
				<Box className='topnav__search' width='50%'>
					<input
						type='text'
						placeholder='Checking tickets...'
						onChange={(e) => setValue(e.target.value)}
					/>
					<i className='bx bx-search'></i>
				</Box>
			</Stack>
		</div>
	);
};

export default TicketChecker;

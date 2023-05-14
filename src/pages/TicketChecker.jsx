import { Box, Stack, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import "../components/topnav/topnav.css";

const TicketChecker = () => {
	const [value, setValue] = useState("");
	const [data, setData] = useState([]);
	console.log("data:", data);
	const [openModal, setOpenModal] = useState(false);

	const fetchData = async () => {
		try {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/checkBill/billToday/${value}/`
			);
			await setData(data);
		} catch {
			setData([]);
		}
	};
	const handleSubmit = () => {
		setOpenModal(true);
		fetchData();
	};
	const handleSearchEnter = (event) => {
		if (event.key === "Enter") {
			handleSubmit();
		}
	};

	const mapSeat = data
		.map((item) => {
			return item.seat;
		})
		.join(", ");

	return (
		<div>
			<Stack direction='row' justifyContent='center'>
				<Box className='topnav__search' width='50%'>
					<input
						id='input'
						type='text'
						placeholder='Checking tickets...'
						onChange={(e) => setValue(e.target.value)}
						onKeyUp={(e) => handleSearchEnter(e)}
					/>
					<i
						className='bx bx-search'
						style={{ cursor: "pointer" }}
						onClick={handleSubmit}
					></i>
				</Box>
			</Stack>

			{openModal &&
				(data?.length > 0 ? (
					<Stack
						direction='column'
						alignItems='center'
						justifyContent='center'
						marginTop='30px'
						spacing={2}
					>
						<Typography>Data: {data[0].at}</Typography>
						<Typography>Cinema: {data[0].cinema}</Typography>
						<Typography>Movie: {data[0].movie}</Typography>
						<Typography>
							Seat:&nbsp;
							{mapSeat}
						</Typography>
					</Stack>
				) : (
					<Stack
						direction='column'
						alignItems='center'
						justifyContent='center'
						marginTop='30px'
					>
						<Typography fontWeight='bold' fontSize={20}>
							Not found
						</Typography>
					</Stack>
				))}
		</div>
	);
};

export default TicketChecker;

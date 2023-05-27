import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";

const Showtimes = () => {
	const [movie, setMovie] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState("");

	const [cinema, setCinema] = useState([]);
	const [selectedCinema, setSelectedCinema] = useState("");

	const [room, setRoom] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState("");

	const [session, setSession] = useState([]);
	const [selectedSession, setSelectedSession] = useState("");

	const [price, setPrice] = useState(10);

	const [showDate, setShowDate] = useState(dayjs(new Date()));

	const fetchMovies = async () => {
		const { data } = await axios.get(
			`https://backend-boo.vercel.app/api/movies`
		);
		setMovie(data.reverse());
	};

	const fetchCinema = async () => {
		const { data } = await axios.get(
			`https://backend-boo.vercel.app/api/movies/cinemas`
		);
		setCinema(data.reverse());
	};

	const fetchRoom = async () => {
		const { data } = await axios.get(
			`https://backend-boo.vercel.app/api/movies/cinemaHalls/${selectedCinema}`
		);
		setRoom(data.reverse());
	};

	const fetchSession = async () => {
		const { data } = await axios.get(
			`https://backend-boo.vercel.app/api/movies/idrom`
		);
		setSession(data);
	};

	useEffect(() => {
		fetchMovies();
		fetchCinema();
		return () => {};
	}, []);

	useEffect(() => {
		if (selectedCinema !== "") fetchRoom();
		return () => {};
	}, [selectedCinema]);

	useEffect(() => {
		fetchSession();
		return () => {};
	}, [selectedRoom]);

	const addShowtimes = async () => {
		const data = {
			idCinema: selectedCinema,
			time: selectedSession,
			idMovie: selectedMovie,
			price: price,
			idHall: selectedRoom,
			startTime: showDate.length
				? moment(dayjs(showDate).toISOString()).format("YYYY-MM-DD")
				: moment(dayjs(new Date()).toISOString()).format("YYYY-MM-DD"),
			status: true,
		};
		try {
			await axios.post(
				`https://backend-boo.vercel.app/api/movies/showing/add`,
				data
			);
			alert("add showtime success!");
			window.location.reload();
		} catch (err) {
			alert(err.message);
		}
	};

	return (
		<div>
			<h2 className='page-header'>Showtimes</h2>
			<Grid
				container
				direction='row'
				spacing={2}
				padding='0 120px'
				justifyContent='center'
			>
				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Movie</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={selectedMovie}
							label='Movie'
							onChange={(event) => {
								setSelectedMovie(event.target.value);
							}}
						>
							{movie?.map((item) => (
								<MenuItem value={item._id}>{item.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>

				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Cinema</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={selectedCinema}
							label='Cinema'
							onChange={(event) => {
								setSelectedCinema(event.target.value);
							}}
						>
							{cinema?.map((item) => (
								<MenuItem value={item._id}>{item.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12}>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Room</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={selectedRoom}
							label='Room'
							onChange={(event) => {
								setSelectedRoom(event.target.value);
							}}
						>
							{room?.map((item) => (
								<MenuItem value={item._id}>
									{item.name} -&nbsp; <b>{item.totalSeats} seats </b>
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={4}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							sx={{ width: "100%" }}
							label='Show Date'
							value={showDate}
							onChange={(newValue) => setShowDate(newValue.toISOString())}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid item xs={4}>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Session</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={selectedSession}
							label='Session'
							onChange={(event) => {
								setSelectedSession(event.target.value);
							}}
						>
							{session.map((item) => (
								<MenuItem value={item}>{item}</MenuItem>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={4}>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Price</InputLabel>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={price}
							label='Price'
							onChange={(event) => {
								setPrice(event.target.value);
							}}
						>
							<MenuItem value={10}>10</MenuItem>
							{/* <MenuItem value={15}>15</MenuItem> */}
						</Select>
					</FormControl>
				</Grid>

				<Button sx={{ mt: "20px", width: "200px" }} onClick={addShowtimes}>
					Add showtimes
				</Button>
			</Grid>
		</div>
	);
};

export default Showtimes;

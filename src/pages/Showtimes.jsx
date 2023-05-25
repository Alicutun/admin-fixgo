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

const Showtimes = () => {
	const [movie, setMovie] = useState([]);
	const [selectedMovie, setSelectedMovie] = useState("");

	const [cinema, setCinema] = useState([]);
	const [selectedCinema, setSelectedCinema] = useState("");

	const [room, setRoom] = useState([]);
	const [selectedRoom, setSelectedRoom] = useState("");

	const [session, setSession] = useState([]);
	const [selectedSession, setSelectedSession] = useState("");

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
			`https://backend-boo.vercel.app/api/movies/cinemaHalls`
		);
		setRoom(data.reverse());
	};

	useEffect(() => {
		fetchMovies();
		fetchCinema();
		fetchRoom();
	}, []);

	const addShowtimes = async () => {
		const data = {
			idCinema: selectedCinema,
			time: selectedSession,
			idMovie: selectedMovie,
			price: 10,
			image: "https://image.tmdb.org/t/p/w1280/qVYE8g6zNbTbaptUyWkCN7njkC3.jpg",
			idHall: selectedRoom,
			startTime: showDate.length ? showDate : dayjs(new Date()).toISOString(),
			status: true,
		};
		try {
			await axios.post(
				`https://backend-boo.vercel.app/api/movies/showing/add`,
				data
			);
			alert("add showtime success!");
		} catch {
			alert("err!");
		}
	};

	return (
		<div>
			<h2 className='page-header'>Showtimes</h2>
			<Grid container direction='column' spacing={2} padding='0 120px'>
				<Grid item>
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

				<Grid item>
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
				<Grid item>
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
				<Grid item>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label='Show Date'
							value={showDate}
							onChange={(newValue) => setShowDate(newValue.toISOString())}
						/>
					</LocalizationProvider>
				</Grid>
				<Grid item>
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
							<MenuItem value='9:00'>9:00</MenuItem>
							<MenuItem value='10:30'>10:30</MenuItem>
							<MenuItem value='1:00'>1:00</MenuItem>
							<MenuItem value='2:30'>2:30</MenuItem>
						</Select>
					</FormControl>
				</Grid>

				<Button sx={{ mt: "20px" }} onClick={addShowtimes}>
					Add showtimes
				</Button>
			</Grid>
		</div>
	);
};

export default Showtimes;

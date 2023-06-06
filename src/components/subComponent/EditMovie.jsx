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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const EditMovie = ({ setActions, actions, setOpenEdit, _id }) => {
	const [movie, setMovie] = useState();

	const [name, setName] = useState("");
	const [image, setImage] = useState("");
	const [genre, setGenre] = useState("");
	const [direction, setDirection] = useState("");
	const [cast, setCast] = useState("");
	const [describe, setDescribe] = useState("");
	const [price, setPrice] = useState(0);
	const [runningTime, setRunningTime] = useState("");
	const [releaseTime, setReleaseTime] = useState(dayjs(new Date()));
	const [language, setLanguage] = useState("");
	const [linkReview, setLinkReview] = useState("");

	const fetchMovie = async () => {
		try {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies/filterId/${_id}`
			);
			setMovie(data);
			setActions(!actions);
			alert("add showtime success!");
			window.location.reload();
		} catch (err) {
			console.log(err.message);
		}
	};

	useEffect(() => {
		fetchMovie();
	}, [_id]);

	useEffect(() => {
		setName(movie?.name);
		setImage(movie?.image);
		setCast(movie?.cast);
		setDescribe(movie?.describe);
		setDirection(movie?.director);
		setGenre(movie?.genre);
		setLanguage(movie?.language);
		setPrice(movie?.price);
		setLinkReview(movie?.linkReview);
		setReleaseTime(dayjs(movie?.releaseTime));
		setRunningTime(movie?.runningTime);
	}, [movie]);

	const handleEdit = async () => {
		const post = {
			_id,
			image,
			name,
			genre,
			director: direction,
			cast,
			describe,
			releaseTime,
			runningTime,
			language,
			linkReview,
			price: price,
		};

		try {
			await axios.post(
				`https://backend-boo.vercel.app/api/movies/update`,
				post
			);
			setActions(!actions);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<>
			<Stack direction='row' justifyContent='center'>
				<Button
					onClick={() => setOpenEdit(false)}
					sx={{ marginBottom: "20px", fontSize: "16px" }}
				>
					Close Edit
				</Button>
			</Stack>
			<Stack
				mb='30px'
				padding='0 120px'
				rowGap={2}
				// width='80%'
			>
				<TextField
					label='Name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					label='Link image'
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>
				<Grid container width='100%' columnSpacing={2}>
					<Grid item xs={3}>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>Genre</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={genre}
								label='Genre'
								onChange={(event) => {
									setGenre(event.target.value);
								}}
							>
								<MenuItem value='Action'>Action</MenuItem>
								<MenuItem value='Thrill'>Thrill</MenuItem>
								<MenuItem value='Horror'>Horror</MenuItem>
								<MenuItem value='Adventure'>Adventure</MenuItem>
								<MenuItem value='Animation'>Animation</MenuItem>
								<MenuItem value='Music'>Music</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3}>
						<FormControl fullWidth>
							<InputLabel id='demo-simple-select-label'>
								Running Time
							</InputLabel>
							<Select
								labelId='demo-simple-select-label'
								id='demo-simple-select'
								value={runningTime}
								label='Running Time'
								onChange={(event) => {
									setRunningTime(event.target.value);
								}}
							>
								<MenuItem value={90}>90</MenuItem>
								<MenuItem value={120}>120</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3}>
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
								<MenuItem value={15}>15</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={3}>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DatePicker
								label='Release Time'
								value={releaseTime}
								onChange={(newValue) => setReleaseTime(newValue)}
							/>
						</LocalizationProvider>
					</Grid>
				</Grid>

				<TextField
					label='Direction'
					value={direction}
					onChange={(e) => setDirection(e.target.value)}
				/>
				<TextField
					value={cast}
					label='Name Cast'
					onChange={(e) => setCast(e.target.value)}
				/>
				<TextField
					value={describe}
					label='Describe'
					onChange={(e) => setDescribe(e.target.value)}
				/>

				<TextField
					value={language}
					label='Language'
					onChange={(e) => setLanguage(e.target.value)}
				/>
				<TextField
					value={linkReview}
					label='LinkReview'
					onChange={(e) => setLinkReview(e.target.value)}
				/>
				<Button onClick={handleEdit}>Submit</Button>
			</Stack>
		</>
	);
};

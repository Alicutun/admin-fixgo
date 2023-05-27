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
import React, { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const CreateMovie = ({ setActions, actions }) => {
	const [price, setPrice] = useState(10);
	const [name, setName] = useState("Movie Name");
	const [image, setImage] = useState(
		"https://cdn.cgv.id/uploads/movie/compressed/22020200.jpg"
	);
	const [genre, setGenre] = useState("Action");
	const [direction, setDirection] = useState("Jaume Collet-Serra");
	const [cast, setCast] = useState("Dwayne Johnson, Viola Davis, Sarah Shahi");
	const [describe, setDescribe] = useState(
		"Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods-and imprisoned just as quickly-Black Adam (Johnson) is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world."
	);
	const [runningTime, setRunningTime] = useState(90);
	const [releaseTime, setReleaseTime] = useState(dayjs(new Date()));

	const [language, setLanguage] = useState(
		"Korean with Vietnamese and English subtitle"
	);
	const [linkReview, setLinkReview] = useState(
		"https://www.youtube.com/embed/174AjBZHkkU"
	);

	const postMovie = async () => {
		const post = {
			rate: 0,
			image: image,
			name: name,
			genre: genre,
			director: direction,
			cast: cast,
			describe: describe,
			releaseTime: releaseTime,
			runningTime: runningTime,
			language: language,
			linkReview: linkReview,
			price: 10,
			isActive: 1,
		};

		try {
			const { data } = await axios.post(
				`https://backend-boo.vercel.app/api/movies/add`,
				post
			);
			await axios.get(
				`https://backend-boo.vercel.app/api/recommend/sendRecommend/${data._id}`
			);
			setActions(!actions);
		} catch (err) {
			console.log(err.message);
		}
	};

	return (
		<Stack
			mb='30px'
			padding='0 120px'
			rowGap={2}
			// width='80%'
		>
			<TextField label='Name' onBlur={(e) => setName(e.target.value)} />
			<TextField label='Link image' onBlur={(e) => setImage(e.target.value)} />
			<Grid container columnSpacing={2}>
				<Grid item xs={4}>
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
				<Grid item xs={4}>
					<FormControl fullWidth>
						<InputLabel id='demo-simple-select-label'>Running Time</InputLabel>
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
				{/* <Grid item xs={3}>
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
				</Grid> */}
				<Grid item xs={4}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							sx={{ width: "100%" }}
							label='Release Time'
							value={releaseTime}
							onChange={(newValue) => setReleaseTime(newValue)}
						/>
					</LocalizationProvider>
				</Grid>
			</Grid>

			<TextField
				label='Direction'
				onBlur={(e) => setDirection(e.target.value)}
			/>
			<TextField label='Name Cast' onBlur={(e) => setCast(e.target.value)} />
			<TextField label='Describe' onBlur={(e) => setDescribe(e.target.value)} />

			<TextField label='Language' onBlur={(e) => setLanguage(e.target.value)} />
			<TextField
				label='LinkReview'
				onBlur={(e) => setLinkReview(e.target.value)}
			/>
			<Button onClick={postMovie}>Submit</Button>
		</Stack>
	);
};

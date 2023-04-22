import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Button, Grid, Input, Stack, Typography } from "@mui/material";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Users = () => {
	const [data, setData] = useState([]);
	const [price, setPrice] = useState(150000);
	const [suc, setSuc] = useState(false);

	const [pageSize, setPageSize] = useState(10);
	const [openAdd, setOpenAdd] = useState(false);
	const [name, setName] = useState("Movie Name");
	const [image, setImage] = useState(
		"https://cdn.cgv.id/uploads/movie/compressed/22020200.jpg"
	);
	const [genre, setGenre] = useState("ACTION");
	const [direction, setDirection] = useState("Jaume Collet-Serra");
	const [cast, setCast] = useState("Dwayne Johnson, Viola Davis, Sarah Shahi");
	const [describe, setDescribe] = useState(
		"Nearly 5,000 years after he was bestowed with the almighty powers of the Egyptian gods-and imprisoned just as quickly-Black Adam (Johnson) is freed from his earthly tomb, ready to unleash his unique form of justice on the modern world."
	);
	const [runningTime, setRunningTime] = useState(120);
	const [releaseTime, setReleaseTime] = useState("08/23/2022");

	const [language, setLanguage] = useState(
		"Korean with Vietnamese and English subtitle"
	);
	const [linkReview, setLinkReview] = useState(
		"https://www.youtube.com/embed/174AjBZHkkU"
	);
	useEffect(() => {
		const fetchUsers = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies`
			);
			setData(data);
		};
		fetchUsers();
	}, [suc]);
	console.log(data);
	console.log("aa");
	const fetchUsers = async () => {
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
			price: price,
			isActive: 1,
		};
		await axios.post(`https://backend-boo.vercel.app/api/movies/add`, post);
		await setSuc(true);
	};

	console.log(data);
	const columns = useMemo(
		() => [
			{ field: "name", headerName: "Movie Name", width: 300 },
			{ field: "genre", headerName: "Genre", width: 100 },
			{ field: "rate", headerName: "Rate", width: 100 },
			{ field: "price", headerName: "Price", width: 100 },
			{ field: "totalOrder", headerName: "Total order", width: 100 },
			{ field: "revenue", headerName: "Revenue", width: 100 },
		],
		[]
	);

	return (
		<div>
			<h2 className='page-header'>Movies</h2>
			<Stack direction='row' justifyContent='center'>
				<Button
					onClick={() => setOpenAdd(!openAdd)}
					sx={{ marginBottom: "20px", fontSize: "16px" }}
				>
					Add Movie
				</Button>
			</Stack>
			{openAdd ? (
				<Stack mb='30px' rowGap={2}>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							Name:
						</Typography>
						<Input
							placeholder={name}
							sx={{ width: "50%" }}
							onChange={(e) => setName(e.target.value)}
						/>
					</Grid>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							Image:
						</Typography>
						<Input
							placeholder={image}
							sx={{ width: "50%" }}
							onChange={(e) => setImage(e.target.value)}
						/>
					</Grid>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							Genre:
						</Typography>
						<Input
							placeholder={genre}
							sx={{ width: "50%" }}
							onChange={(e) => setGenre(e.target.value)}
						/>
					</Grid>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							Direction:
						</Typography>
						<Input
							placeholder={direction}
							sx={{ width: "50%" }}
							onChange={(e) => setDirection(e.target.value)}
						/>
					</Grid>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							Cast:
						</Typography>
						<Input
							placeholder={cast}
							sx={{ width: "50%" }}
							onChange={(e) => setCast(e.target.value)}
						/>
					</Grid>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							Describe:
						</Typography>
						<Input
							placeholder={describe}
							sx={{ width: "50%" }}
							onChange={(e) => setDescribe(e.target.value)}
						/>
					</Grid>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							ReleaseTime:
						</Typography>
						<Input
							placeholder={releaseTime}
							sx={{ width: "50%" }}
							onChange={(e) => setReleaseTime(e.target.value)}
						/>
					</Grid>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							RunningTime:
						</Typography>
						<Input
							placeholder={runningTime}
							sx={{ width: "50%" }}
							onChange={(e) => setRunningTime(e.target.value)}
						/>
					</Grid>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							Language:
						</Typography>
						<Input
							placeholder={language}
							sx={{ width: "50%" }}
							onChange={(e) => setLanguage(e.target.value)}
						/>
					</Grid>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							LinkReview:
						</Typography>
						<Input
							placeholder={linkReview}
							sx={{ width: "50%" }}
							onChange={(e) => setLinkReview(e.target.value)}
						/>
					</Grid>
					<Grid container>
						<Typography
							fontWeight='bold'
							paddingRight='20px'
							width='150px'
							fontSize='18px'
						>
							Price:
						</Typography>
						<Input
							placeholder={price}
							sx={{ width: "50%" }}
							onChange={(e) => setPrice(e.target.value)}
						/>
					</Grid>
					<Stack direction='row' justifyContent='center' width='60%'>
						<Button onClick={fetchUsers} sx={{ fontSize: "16px" }}>
							Add
						</Button>
						<Typography color='blue'>
							{suc ? "------> Successful" : ""}
						</Typography>
					</Stack>
				</Stack>
			) : (
				""
			)}
			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card__body'>
							<DataGrid
								autoHeight
								rows={data}
								getRowId={(row) => row.name}
								columns={columns}
								rowsPerPageOptions={[5, 10, 20]}
								pageSize={pageSize}
								onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
							/>
						</div>
					</div>
				</div>
			</div>
			{/* <ToastContainer /> */}
		</div>
	);
};

export default Users;

import { Button, Stack } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import { CreateMovie } from "../components/subComponent/CreateMovie";
import { EditMovie } from "../components/subComponent/EditMovie";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const Users = () => {
	const [data, setData] = useState([]);

	const [pageSize, setPageSize] = useState(10);
	const [openAdd, setOpenAdd] = useState(false);
	const [openEdit, setOpenEdit] = useState(false);
	const [actions, setActions] = useState(false);
	const [id, setId] = useState("");

	useEffect(() => {
		const fetchMovies = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/movies`
			);
			setData(data.reverse());
		};
		fetchMovies();
	}, [actions]);

	// const handleEditClick = (name) => {
	// 	console.log("name", name);

	// };
	// const handleDeleteClick = (id) => {};

	const columns = useMemo(
		() => [
			{ field: "_id", headerName: "IdMovie", width: 250 },
			{ field: "name", headerName: "Movie Name", width: 250 },
			{ field: "genre", headerName: "Genre", width: 100 },
			{ field: "rate", headerName: "Rate", width: 100 },
			{ field: "price", headerName: "Price", width: 100 },
			{ field: "totalOrder", headerName: "Total order", width: 100 },
			{ field: "revenue", headerName: "Revenue", width: 100 },
			{
				field: "actions",
				type: "actions",
				headerName: "Actions",
				width: 100,
				cellClassName: "actions",
				getActions: ({ id }) => {
					return [
						<GridActionsCellItem
							icon={<Button sx={{ width: "50px" }}>Edit</Button>}
							label='Edit'
							className='textPrimary'
							onClick={() => {
								setOpenEdit(true);
								setId(id);
							}}
						/>,
						// <GridActionsCellItem
						// 	icon={<Button sx={{ width: "50px" }}>Delete</Button>}
						// 	label='Delete'
						// 	onClick={handleDeleteClick(id)}
						// />,
					];
				},
			},
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
			{openAdd && <CreateMovie setActions={setActions} actions={actions} />}
			{openEdit && (
				<EditMovie
					setActions={setActions}
					actions={actions}
					_id={id}
					setOpenEdit={setOpenEdit}
				/>
			)}
			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card__body'>
							<DataGrid
								autoHeight
								rows={data}
								getRowId={(row) => row._id}
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

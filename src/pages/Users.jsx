import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Users = () => {
	const [data, setData] = useState([]);
	const [pageSize, setPageSize] = useState(10);
	useEffect(() => {
		const fetchUsers = async () => {
			const { data } = await axios.get(
				`https://backend-boo.vercel.app/api/user`
			);
			setData(data);
		};
		fetchUsers();
	}, []);
	const columns = useMemo(
		() => [
			{ field: "id", headerName: "ID", width: 250 },
			{ field: "name", headerName: "Username", width: 100 },
			{ field: "email", headerName: "Email", width: 250 },
			{ field: "totalOrder", headerName: "Total Order", width: 100 },
			{ field: "totalSpending", headerName: "Total Spending", width: 120 },
			{ field: "createdAt", headerName: "Create", width: 110 },
			{
				field: "isActive",
				headerName: "Active",
				width: 100,
				type: "boolean",
				// edittable: true,
			},
		],
		[]
	);
	return (
		<div>
			<h2 className='page-header'>Users</h2>

			<div className='row'>
				<div className='col-12'>
					<div className='card'>
						<div className='card__body'>
							<DataGrid
								autoHeight
								rows={data}
								getRowId={(row) => row.id}
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

export default Users;

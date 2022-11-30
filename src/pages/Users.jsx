import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Users = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(
        `https://backend-boo.herokuapp.com/api/user`
      );
      setData(data);
    };
    fetchUsers();
  }, []);
  console.log(data);
  const columns = useMemo(
    () => [
      { field: "id", headerName: "ID", width: 50 },
      { field: "fullname", headerName: "Full Name", width: 150 },
      { field: "name", headerName: "Username", width: 100 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "totalOrder", headerName: "Total Order", width: 100 },
      { field: "totalSpending.sum", headerName: "Total Spending", width: 100 },
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
      <h2 className="page-header">Users</h2>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
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

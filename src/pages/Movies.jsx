import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Users = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    const fetchUsers = async () => {
      const { data } = await axios.get(
        `https://backend-boo.herokuapp.com/api/movies`
      );
      setData(data);
    };
    fetchUsers();
  }, []);
  console.log(data);
  const columns = useMemo(
    () => [
      { field: "name", headerName: "Movie Name", width: 200 },
      { field: "genre", headerName: "Genre", width: 150 },
      { field: "rate", headerName: "Rate", width: 100 },
      { field: "price", headerName: "Price", width: 100 },
      { field: "totalorders", headerName: "Total order", width: 100 },
      { field: "revenue", headerName: "Revenue", width: 100 },

      // {
      //   field: "isActive",
      //   headerName: "Active",
      //   width: 100,
      //   type: "boolean",
      //   // edittable: true,
      // },
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
    </div>
  );
};

export default Users;
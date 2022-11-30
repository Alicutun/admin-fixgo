import React, { useState, useEffect, useMemo } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Orders = () => {
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(5);
  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(
        `https://backend-boo.herokuapp.com/api/movies/listBillManage`
      );
      setData(data);
    };
    fetchOrders();
  }, []);
  console.log(data);
  const columns = useMemo(
    () => [
      { field: "idBill", headerName: "ID", width: 50 },
      { field: "fullName", headerName: "User name", width: 100 },
      { field: "createDate", headerName: "Date Order", width: 100 },
      { field: "movie", headerName: "Movie", width: 100 },
      { field: "cinema", headerName: "Cinema", width: 100 },
      { field: "date", headerName: "Date", width: 100 },
      { field: "session", headerName: "Session", width: 80 },
      { field: "listItem", headerName: "Seat ", width: 120 },
      { field: "totalMoney", headerName: "Toltal Order", width: 100 },

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
      <h2 className="page-header">Orders</h2>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <DataGrid
                autoHeight
                rows={data}
                getRowId={(row) => row.idBill}
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

export default Orders;

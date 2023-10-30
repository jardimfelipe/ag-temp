/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid, Switch } from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";

import useAllBarbershopQuery from "../services/useAllBarbershopQuery";
import useChangeBarbershopStatus from "../services/useChangeBarbershopStatus";
import { IBarbershop } from "../types";

const AllBarbershopsList = () => {
  const { data = [], isLoading } = useAllBarbershopQuery();
  const changeBarbershopStatus = useChangeBarbershopStatus();

  const changeStatus = (barbershop: IBarbershop) => {
    changeBarbershopStatus.mutate({
      barbershopId: barbershop.id,
      isActive: !barbershop.isActive,
    });
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Nome da barbearia",
      width: 300,
      pinnable: true,
    },
    {
      field: "create_at",
      headerName: "Criado em",
      valueGetter: ({ value }: any) => value && new Date(value),
      type: "dateTime",
      width: 200,
    },
    {
      field: "action",
      headerName: "Ativo",
      sortable: false,
      renderCell: ({ row }: Partial<GridRowParams>) => (
        <Switch onClick={() => changeStatus(row)} checked={row.isActive} />
      ),
    },
  ];
  return (
    <Grid container item xs={12}>
      <Grid item xs={12}>
        <DataGrid
          loading={isLoading}
          columns={columns}
          rows={data}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          pageSizeOptions={[5, 10, 25]}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              printOptions: { disableToolbarButton: true },
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default AllBarbershopsList;

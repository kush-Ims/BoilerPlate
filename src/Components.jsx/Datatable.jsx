import React from "react"; 
import { MaterialReactTable } from "material-react-table";
import { IconButton, Tooltip } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

const DataTable = ({ columns, data, onEdit, onDelete, ...rest }) => {
  // add an extra actions column
  const finalColumns = [
    ...columns,
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit && onEdit(row.original)}
            >
              <Edit fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete && onDelete(row.original.id)}
            >
              <Delete fontSize="small" />
            </IconButton>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <MaterialReactTable
      columns={finalColumns}
      data={data}
      {...rest} // ✅ forward all extra props (disable menus, etc.)
    />
  );
};

export default DataTable;

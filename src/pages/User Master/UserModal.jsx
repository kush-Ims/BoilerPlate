// UserModal.jsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Divider,
  Backdrop,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  borderRadius: 8, // less rounded
  boxShadow: 24,
  p: 4,
};

const UserModal = ({ open, onClose, title, fields, onSubmit }) => {
  const [formValues, setFormValues] = useState({});

  // initialize values from props
  useEffect(() => {
    const initialValues = {};
    fields.forEach((f) => {
      initialValues[f.name] = f.value || "";
    });
    setFormValues(initialValues);
  }, [fields]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backdropFilter: "blur(10px)", // background blur
          backgroundColor: "rgba(0,0,0,0.1)", // light gray overlay
        },
      }}
    >
      <Box sx={style}>
        {/* Title */}
        <Typography variant="h6" className="font-bold text-gray-800">
          {title}
        </Typography>
        <Divider sx={{ my: 2 }} /> {/* spacing + visual separation */}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {fields.map((field) => (
              <Grid item key={field.name} style={{ width: "100%" }}>
                <TextField
                  fullWidth
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  placeholder={field.placeholder || ""}
                  value={formValues[field.name]}
                  onChange={handleChange}
                  required={field.required || false}
                  className="bg-white rounded-md"
                />
              </Grid>
            ))}
          </Grid>

          {/* Action Buttons */}
          <Box mt={4} display="flex" justifyContent="flex-end" gap={1}>
            <Button
              onClick={onClose}
              className="!border !border-gray-300 !text-gray-600 !rounded-md !px-4 !py-2 hover:!bg-gray-100 transition"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="!bg-[#FFD369] hover:!bg-[#e6c055] !text-black !font-semibold !rounded-md !px-5 !py-2 shadow-md transition"
            >
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModal;

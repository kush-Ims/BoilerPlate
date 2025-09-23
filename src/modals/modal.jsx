// CommonModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button, Grid, Switch, FormControlLabel } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const CommonModal = ({ open, onClose, title, apiResponse, onSubmit }) => {
  const [formValues, setFormValues] = useState({});

  // Populate form values from API response
  useEffect(() => {
    if (apiResponse) {
      setFormValues({
        accessToken: apiResponse.accessToken || "",
        refreshToken: apiResponse.refreshToken || "",
        userId: apiResponse.user?.userId || "",
        employeeCode: apiResponse.user?.employeeCode || "",
        userName: apiResponse.user?.userName || "",
        emailId: apiResponse.user?.emailId || "",
        isActive: apiResponse.user?.isActive || false,
        roleId: apiResponse.user?.roleId || "",
      });
    }
  }, [apiResponse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (e) => {
    const { name, checked } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues); // Send updated data back
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>
          {title}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee Code"
                name="employeeCode"
                value={formValues.employeeCode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="User Name"
                name="userName"
                value={formValues.userName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email ID"
                name="emailId"
                value={formValues.emailId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formValues.isActive}
                    onChange={handleToggle}
                    name="isActive"
                  />
                }
                label="Active"
              />
            </Grid>
          </Grid>

          <Box mt={3} display="flex" justifyContent="flex-end" gap={1}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default CommonModal;

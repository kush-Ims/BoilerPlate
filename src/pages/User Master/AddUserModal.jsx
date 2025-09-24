// AddUserModal.jsx
import React, { useState } from "react";
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
  width: 400,
  bgcolor: "background.paper",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
};

const UserModal = ({ open, onClose }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://10.11.5.23:5268/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error("Failed to add user");
      }

      const result = await response.json();
      console.log("✅ User added:", result);

      // reset form & close modal
      setFormValues({ username: "", password: "" });
      onClose();
    } catch (error) {
      console.error("❌ Error adding user:", error);
      alert("Failed to add user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 300,
        sx: {
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(0,0,0,0.1)",
        },
      }}
    >
      <Box sx={style}>
        <Typography variant="h6" className="font-bold text-gray-800">
          Add User
        </Typography>
        <Divider sx={{ my: 2 }} />

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                type="text"
                value={formValues.username}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                required
              />
            </Grid>
          </Grid>

          {/* Action Buttons */}
          <Box mt={4} display="flex" justifyContent="flex-end" gap={1}>
            <Button
              onClick={onClose}
              disabled={loading}
              className="!border !border-gray-300 !text-gray-600 !rounded-md !px-4 !py-2 hover:!bg-gray-100 transition"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="!bg-[#FFD369] hover:!bg-[#e6c055] !text-black !font-semibold !rounded-md !px-5 !py-2 shadow-md transition"
            >
              {loading ? "Saving..." : "Save"}
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default UserModal;

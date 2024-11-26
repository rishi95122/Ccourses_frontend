import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import axios from "axios";
import { toast } from "react-toastify";

function MemberEditModal({ open, setOpen, item, onRefresh }) {
  const [formState, setFormState] = React.useState({
    usertype: item?.user || "",
    status: item?.status || "",
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACK_API}/members`,
        {
          user: formState.usertype,
          status: formState.status,
          userId: item?._id,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);

        onRefresh();
        handleClose();
      }
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  const handleChange = (field) => (event) => {
    setFormState((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            handleUpdate();
          },
        }}
      >
        <DialogTitle>User Information</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            type="text"
            fullWidth
            variant="outlined"
            disabled
            defaultValue={item?.username}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            disabled
            defaultValue={item?.email}
          />
          <FormControl fullWidth margin="dense">
            <InputLabel id="usertype-label">User Type</InputLabel>
            <Select
              labelId="usertype-label"
              id="usertype"
              name="usertype"
              label="User Type"
              value={formState.usertype}
              onChange={handleChange("usertype")}
            >
              <MenuItem value="Student">Student</MenuItem>
              <MenuItem value="Teacher">Teacher</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              id="status"
              name="status"
              label="Status"
              value={formState.status}
              onChange={handleChange("status")}
            >
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default MemberEditModal;

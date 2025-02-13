import { useState, useCallback } from "react";
import { 
  TableRow, TableCell, Checkbox, IconButton, 
  Popover, MenuList, MenuItem, Dialog, DialogTitle, 
  DialogContent, TextField, DialogActions, Button 
} from "@mui/material";
import { Iconify } from "src/components/iconify/iconify"
import { deleteUser, updateUser } from "../../api/Users"



export function UserTableRow({ row, selected, onSelectRow }) {
  const [openPopover, setOpenPopover] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [userData, setUserData] = useState({ ...row });

  const handleOpenPopover = useCallback(event => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await deleteUser(row.id, token);
      if (response.status === 204) {
        handleClosePopover();
        window.location.reload();
      }
    } catch (error) {
      console.log(error.status);
      handleClosePopover();
    }
  };

  const handleOpenEditModal = () => {
    setUserData({ ...row });
    setOpenEditModal(true);
    handleClosePopover();
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await updateUser(userData.id, userData, token);
      if (response.status === 200) {
        setOpenEditModal(false);
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.first_name}</TableCell>
        <TableCell>{row.last_name}</TableCell>
        <TableCell>{row.username}</TableCell>
        <TableCell>{row.role}</TableCell>
        <TableCell align="center">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* Popover Menu */}
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 140,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <MenuItem onClick={handleOpenEditModal}>
            <Iconify icon="solar:pen-bold" />
            ویرایش
          </MenuItem>
          <MenuItem onClick={handleDeleteUser} sx={{ color: "error.main" }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            حذف
          </MenuItem>
        </MenuList>
      </Popover>

      {/* Edit User Modal */}
      <Dialog closeAfterTransition={false}  open={openEditModal} onClose={handleCloseEditModal} fullWidth maxWidth="sm">
        <DialogTitle>ویرایش اطلاعات کاربر</DialogTitle>
        <DialogContent dividers sx={{ direction: "rtl" }}>
        <TextField 
          fullWidth 
          margin="dense" 
          label="نام" 
          name="first_name"
          value={userData.first_name} 
          onChange={handleChange} 
          InputLabelProps={{ sx: { textAlign: "right", direction: "rtl" } }} 
        />
        <TextField 
          fullWidth 
          margin="dense" 
          label="نام خانوادگی" 
          name="last_name"
          value={userData.last_name} 
          onChange={handleChange} 
          InputLabelProps={{ sx: { textAlign: "right", direction: "rtl" } }} 
        />
        <TextField 
          fullWidth 
          margin="dense" 
          label="نام کاربری" 
          name="username"
          value={userData.username} 
          onChange={handleChange} 
          InputLabelProps={{ sx: { textAlign: "right", direction: "rtl" } }} 
        />
        <TextField 
          fullWidth 
          margin="dense" 
          label="نقش" 
          name="role"
          value={userData.role} 
          onChange={handleChange} 
          InputLabelProps={{ sx: { textAlign: "right", direction: "rtl" } }} 
        />
      </DialogContent>
        <DialogActions sx={{display: "flex", justifyContent: "space-around"}}>
          <Button variant="text" onClick={handleCloseEditModal} sx={{ color: "error.main" }}>لغو</Button>
          <Button variant="contained" onClick={handleSaveChanges}>
            ذخیره تغییرات
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

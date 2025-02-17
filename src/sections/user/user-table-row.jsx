import { useState, useCallback } from "react";
import { 
  TableRow, TableCell, Checkbox, IconButton, 
  Popover, MenuList, MenuItem, Dialog, DialogTitle, 
  DialogContent, TextField, DialogActions, Button, FormControlLabel, 
  Box
} from "@mui/material";
import { Iconify } from "src/components/iconify/iconify"
import toast, { Toaster } from "react-hot-toast";
import { deleteUser, updateUser } from "../../api/Users"

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));


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

  const handleCheckBoxChange = (e) => {
    setUserData((prev)=> ({ ...prev, [e.target.name]: e.target.checked }));
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("access");
      const response = await updateUser(userData.id, userData, token);
      if (response.status === 200) {
        toast.success("اطلاعات کاربر با موفقیت ویرایش شد.");
        await sleep(1500);
        setOpenEditModal(false);
        window.location.reload(); 
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("خطا در ویرایش اطلاعات کاربر");
    }
  };
console.log(row);
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>
        <TableCell align="center">{row.id}</TableCell>
        <TableCell align="center">{row.first_name}</TableCell>
        <TableCell align="center">{row.last_name}</TableCell>
        <TableCell align="center">{row.email}</TableCell>
        <TableCell align="center">{row.password}</TableCell>
        <TableCell align="center">{row.phone_number}</TableCell>
        <TableCell align="center">{row.username}</TableCell>
        <TableCell align="center">{row.is_staff ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}</TableCell>
        <TableCell align="center">{row.is_active ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}</TableCell>
        <TableCell align="center">{row.is_superuser ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}</TableCell>
        <TableCell align="center">{row.last_login&&row.last_login.toString()}</TableCell>
        <TableCell align="center">{row.date_joined&&row.date_joined.toString()}</TableCell>
        <TableCell align="center">{row.role}</TableCell>
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
        <Box display="flex" justifyContent="space-evenly">
        <FormControlLabel
          label="is_staff"

          control={
            <Checkbox  
            margin="dense" 
            label="is_staff" 
            name="is_staff"
            checked={userData.is_staff} 
            onChange={handleCheckBoxChange} 
        />
          }
        />
        <FormControlLabel
          label="is_active"
          
          control={
            <Checkbox  
            margin="dense" 
            label="is_active" 
            name="is_active"
            checked={userData.is_active} 
            onChange={handleCheckBoxChange} 
        />
          }
        />
        <FormControlLabel
          label="is_superuser"
          
          control={
            <Checkbox  
            margin="dense" 
            label="is_superuser" 
            name="is_superuser"
            checked={userData.is_superuser} 
            onChange={handleCheckBoxChange} 
        />
          }
        />
      <Toaster/>
        </Box>
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

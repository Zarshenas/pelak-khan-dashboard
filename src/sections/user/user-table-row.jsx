import { useState, useCallback } from "react"

import Popover from "@mui/material/Popover"
import TableRow from "@mui/material/TableRow"
import Checkbox from "@mui/material/Checkbox"
import MenuList from "@mui/material/MenuList"
import TableCell from "@mui/material/TableCell"
import IconButton from "@mui/material/IconButton"
import MenuItem, { menuItemClasses } from "@mui/material/MenuItem"

import { Label } from "src/components/label/label"
import { Iconify } from "src/components/iconify/iconify"

export function UserTableRow({ row, selected, onSelectRow }) {
  const [openPopover, setOpenPopover] = useState(null)

  const handleOpenPopover = useCallback(event => {
    setOpenPopover(event.currentTarget)
  }, [])

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null)
  }, [])

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>{row.id}</TableCell>

        <TableCell>{row.first_name}</TableCell>

        <TableCell>{row.last_name}</TableCell>

        <TableCell>
          <Label >
            {row.username}
          </Label>
        </TableCell>
        <TableCell>
          <Label color="success">
            {row.role}
          </Label>
        </TableCell>


        {/* <TableCell align="center">
          {row.is_active ? (
            <Iconify
              width={22}
              icon="solar:check-circle-bold"
              sx={{ color: "success.main" }}
            />
          ) : (
            "-"
          )}
        </TableCell> */}
        <TableCell align="center">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

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
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: "action.selected" }
            }
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            ویرایش
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: "error.main" }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            حذف
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  )
}

import Box from "@mui/material/Box"
import TableRow from "@mui/material/TableRow"
import TableCell from "@mui/material/TableCell"
import Typography from "@mui/material/Typography"

export function TableNoData({ searchQuery, ...other }) {
  return (
    <TableRow {...other}>
      <TableCell align="center" colSpan={7}>
        <Box sx={{ py: 15, textAlign: "center" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            کاربر پیدا نشد
          </Typography>

          <Typography variant="body2">
            برای  &nbsp;
            <strong>&quot;{searchQuery}&quot;</strong>
            &nbsp;نتیجه ای پیدا نشد.
          </Typography>
        </Box>
      </TableCell>
    </TableRow>
  )
}

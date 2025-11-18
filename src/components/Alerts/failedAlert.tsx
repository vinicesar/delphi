import { Alert, Snackbar } from "@mui/material";

export type typeAlert = "error" | "warning" | "info" | "success";

type AllAlertProps = {
    open: boolean,
    message: string,
    type?: typeAlert,
    onClose: () => void
}

function AllAlert({ open, message, type = "info", onClose }: AllAlertProps) {
    return (
        <Snackbar
            open={open}
            onClose={onClose}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
            <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    )
}
export default AllAlert
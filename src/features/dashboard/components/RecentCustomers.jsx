import {
    Card,
    CardContent,
    Typography,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip
} from "@mui/material";

const customers = [
    {
        id: 1,
        name: "Ganesh Bhojane",
        email: "ganesh@gmail.com",
        status: "Active"
    },
    {
        id: 2,
        name: "John Smith",
        email: "john@gmail.com",
        status: "Pending"
    },
    {
        id: 3,
        name: "Emma Watson",
        email: "emma@gmail.com",
        status: "Active"
    }
];

function RecentCustomers() {

    return (

        <Card sx={{ mt: 4 }}>

            <CardContent>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                >
                    Recent Customers
                </Typography>

                <Table>

                    <TableHead>

                        <TableRow>

                            <TableCell>Name</TableCell>

                            <TableCell>Email</TableCell>

                            <TableCell>Status</TableCell>

                        </TableRow>

                    </TableHead>

                    <TableBody>

                        {customers.map(customer => (

                            <TableRow key={customer.id}>

                                <TableCell>{customer.name}</TableCell>

                                <TableCell>{customer.email}</TableCell>

                                <TableCell>

                                    <Chip
                                        label={customer.status}
                                        color={
                                            customer.status === "Active"
                                                ? "success"
                                                : "warning"
                                        }
                                        size="small"
                                    />

                                </TableCell>

                            </TableRow>

                        ))}

                    </TableBody>

                </Table>

            </CardContent>

        </Card>

    );

}

export default RecentCustomers;
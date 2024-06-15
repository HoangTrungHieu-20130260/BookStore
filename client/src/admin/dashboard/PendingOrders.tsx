import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import {Person} from "@mui/icons-material";
import {Link} from "react-router-dom";
import React from "react";
import {Order, User} from "../../models";
interface Props {
    pendingOrdersCount: number;
    pendingOrders: Order[];
}
export const PendingOrders = ({pendingOrdersCount, pendingOrders}: Props) => {
    return (
        <Card>
            <CardHeader
                avatar={<Avatar><Person/></Avatar>}
                title={"Đơn hàng chờ duyệt"}
                subheader={pendingOrdersCount}
                component={Link}
                to="/admin/user"
                sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    },
                }}/>
            <CardContent>
                <Box>
                    <Typography variant="h6" align="center">Đơn hàng đang chờ</Typography>
                    <List>
                        {pendingOrders.map(order => (
                            <ListItem key={order.id} component={Link} to={`/admin/orders/${order.id}`}>
                                <ListItemAvatar>
                                    <Avatar src={order.fullName} />
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <>
                                        <Typography variant={"subtitle2"}>{order.fullName}</Typography>
                                        <Typography variant={"caption"}>{order.createdAt}</Typography>
                                    </>
                                }/>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
}
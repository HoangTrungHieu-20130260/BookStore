import React, {useMemo} from "react";
import {endOfMonth, startOfDay, startOfMonth, subDays, subMonths} from "date-fns";
import {useGetList} from "react-admin";
import {Order, User} from "../../models";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Avatar, Box, Card, CardContent, Grid, Typography} from "@mui/material";
import  {PersonAdd} from "@mui/icons-material"
import {NewUserStats} from "./NewUserStats";
import {PendingOrders} from "./PendingOrders";

const Dashboard = () => {
    const firstDayOfMonth  = startOfMonth(subMonths(new Date(), 1))
    const lastDayOfMonth = endOfMonth(subMonths(new Date(), 1));
    const { data: users } = useGetList<User>('user', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'createdAt', order: 'DESC' },
        filter: {},
    });
    const { data: orders } = useGetList<Order>('order', {
        pagination: { page: 1, perPage: 1000 },
        sort: { field: 'createdAt', order: 'DESC' },
        filter: {},
    });
    const currentMonth = new Date().getMonth() + 1;
    const useUsersByMonth = () => {
        return useMemo(() => {
            if (!users) return [];

            return users.filter((user) => {
                const createdAt = new Date(user.createdAt);
                return createdAt.getMonth() + 1 === currentMonth;
            });
        }, [users, currentMonth]);
    };
    const usePendingOrders = useMemo(() => {
        if (!orders) return [];

        return orders.filter((order) => order.orderStatus.id === 1);
    }, [orders, currentMonth]);
    const getRevenueOfDay = useMemo(()=> {
        if (!orders) return [];
        const revenueByDate = orders
            .filter(order => order.orderStatus.id !== 7)
            .reduce((accumulator, order) => {
                const date = new Date(order.createdAt).toLocaleString()
                if (!accumulator[date]) {
                    accumulator[date] = {date, revenue: 0}
                }
                accumulator[date].revenue += order.total_amount;
                return accumulator;
            }, {} as { [date: string]: { date: string; revenue: number } })
        return Object.keys(revenueByDate).sort().map((date)=> ({
            date,
            revenue: revenueByDate[date].revenue,
        }));
    }, [orders, firstDayOfMonth, lastDayOfMonth])


    return (
        <>
            <ResponsiveContainer width="80%" height={400}>
                <LineChart data={getRevenueOfDay}
                       margin={{top: 5, right: 30, left:10, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
            </ResponsiveContainer>
            <Box>
                <Grid container spacing={2}>
                    <Grid item md={4}>
                        <NewUserStats newUsersCount={useUsersByMonth().length} newUsersList={useUsersByMonth()}/>
                    </Grid>
                    <Grid item md={4}>
                        <PendingOrders pendingOrdersCount={usePendingOrders.length} pendingOrders={usePendingOrders}/>
                    </Grid>
                    <Grid item md={4}>
                        <Typography>1</Typography>
                    </Grid>

                </Grid>
            </Box>
        </>
        
        

    )
}
export default Dashboard;
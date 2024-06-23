
import React, {useEffect, useState} from "react";
import {Rate, User} from "../../models";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    CardHeader, List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
export const PendingReviews = ({pendingReviews} : {pendingReviews: Rate[]}) => {

    return (
        <Card>
            <CardContent>
                <Box>
                    <Typography variant="h6" align="center">Đánh giá đang chờ</Typography>
                    <List>
                        {pendingReviews.map(rate => (
                            <ListItem key={rate.id}>
                                <ListItemAvatar>
                                    <Avatar src={rate.createdAt} />
                                </ListItemAvatar>
                                <ListItemText primary={
                                    <>
                                        <Typography variant={"subtitle2"}>{rate.createdAt}</Typography>
                                    </>} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
};
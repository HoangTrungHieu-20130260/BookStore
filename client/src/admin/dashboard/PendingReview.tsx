
import React, {useEffect, useState} from "react";
import {User} from "../../models";
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
import {Person} from "@mui/icons-material"
import {Link} from "react-router-dom";
interface Props {
    pendingReviewsCount: number;
    pendingReviews: User[];
}
export const NewUserStats = ({pendingReviewsCount, pendingReviews} : Props) => {

    return (
        <Card>
            <CardHeader
                avatar={<Avatar><Person/></Avatar>}
                title={"Đánh giá chờ duyệt"}
                subheader={pendingReviewsCount}
                component={Link}
                to="/admin/revive"
                sx={{
                    textDecoration: 'none',
                    color: 'inherit',
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.08)',
                    },
                }}/>
            <CardContent>
                <Box>
                    <Typography variant="h6" align="center">Người dùng mới gần đây</Typography>
                    <List>
                        {pendingReviews.map(user => (
                            <ListItem key={user.id}>
                                <ListItemAvatar>
                                    <Avatar src={user.avatar} />
                                </ListItemAvatar>
                                <ListItemText primary={user.username} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
};
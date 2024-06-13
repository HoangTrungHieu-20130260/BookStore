import {useMemo} from "react";
import {startOfDay, subDays} from "date-fns";

const Dashboard = () => {
    const aMonthAgo = useMemo(() => subDays(startOfDay(new Date()), 30), []);

}
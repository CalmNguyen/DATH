import React, { memo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);


const Chart = ({ data, label }) => {
    // console.log('in')
    const chartData = {
        labels: label,
        datasets: [
            {
                data: data,
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A'],
            },
        ],
    };

    return <Doughnut width={400} height={400} data={chartData} />;
};

export default memo(Chart);

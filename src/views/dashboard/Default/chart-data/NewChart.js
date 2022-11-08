import { useEffect } from 'react';
import Chart from 'react-apexcharts';

export default function NewChar() {
    const categorias = ['Proteina', 'Energia', 'Carboidrato', 'Gord Total', 'Fibras', 'Energia'];
    const valoresSomados = [0, 0, 0, 0, 0, 0];

    const chartData = {
        height: 480,
        type: 'bar',
        options: {
            chart: {
                id: 'bar-chart',
                stacked: false,
                toolbar: {
                    show: true
                },
                zoom: {
                    enabled: true
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0
                        }
                    }
                }
            ],
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '50%',
                    dataLabels: {
                        position: 'top'
                    }
                }
            },
            xaxis: {
                type: 'category',
                categories: categorias
            },
            legend: {
                show: true,
                fontSize: '14px',
                fontFamily: `'Roboto', sans-serif`,
                position: 'bottom',
                offsetX: 20,
                labels: {
                    useSeriesColors: false
                },
                markers: {
                    width: 16,
                    height: 16,
                    radius: 5
                },
                itemMargin: {
                    horizontal: 15,
                    vertical: 8
                }
            },
            fill: {
                type: 'solid'
            },
            dataLabels: {
                enabled: false
            },
            grid: {
                show: true
            }
        },

        series: [
            {
                name: 'Ingerido',
                data: valoresSomados
            },
            {
                name: 'Sugerido',
                data: [135, 15, 15, 35, 65, 40]
            }
        ]
    };
    return <Chart options={chartData.options} series={chartData.series} type="bar" width="100%" />;
}

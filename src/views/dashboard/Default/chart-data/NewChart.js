import { useEffect } from 'react';
import Chart from 'react-apexcharts';

export default function NewChar() {
    const categorias = ['Proteina', 'Energia', 'Carboidrato', 'Gord Total', 'Fibras', 'Cálcio'];
    const valoresSomados = [0, 0, 0, 0, 0, 0];

    const chartData = {
        height: 480,
        type: 'bar',
        options: {
            chart: {
                id: 'bar-chart',
                stacked: false,
                stackType: '100%',
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
                categories: categorias,
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    show: false,
                    formatter(val) {
                        // eslint-disable-next-line prefer-template
                        return val + '%';
                    }
                }
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
                enabled: true,
                formatter(val) {
                    // eslint-disable-next-line prefer-template
                    return val + '%';
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ['#304758']
                }
            },
            grid: {
                show: true
            }
        },

        /*
        Os valores que serão inseridos dentro desse grafico essa no arquivo "CardConsumido.js"
        */
        series: [
            {
                name: 'Ingerido',
                data: valoresSomados
            }
        ]
    };
    return <Chart options={chartData.options} series={chartData.series} type="bar" width="100%" />;
}

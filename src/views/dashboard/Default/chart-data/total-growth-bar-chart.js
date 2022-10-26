import { render } from "sass";

// ===========================|| DASHBOARD - TOTAL GROWTH BAR CHART ||=========================== //
const categorias = ['Proteina', 'Carboidrato', 'Gordura sat', 'Calcio', 'Energia', 'VitaminaC', 'Cálcio', 'Ferro'];

const valor1 = JSON.parse(localStorage.getItem('consumido'));
console.log(valor1);

class chartData{
    const teste = {
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
                name: 'Sugerido',
                data: [34, 125, 35, 35, 35, 80, 35, 20],
                goals: [10, 10, 101, 10]
            },
            {
                name: 'Ingerido',
                data: [35, 15, 15, 35, 65, 40, 80, 25]
            }
        ]
    };
    render(){
        return teste;
    }
};
export default chartData;

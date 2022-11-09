import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import useLocalStorage from 'BD/useLocalStorage';
// material-ui
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Button, CardContent, Divider, Grid, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import axios from 'axios';
// project imports
import ApexCharts from 'apexcharts';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 2 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};
function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const PopularCard = ({ isLoading }) => {
    const [value, setValue] = React.useState(0);
    const [nutrientes, setNutrientes] = useState([{}]);
    const [nutrientesSelecionados, setNutrientesSelecionados] = useLocalStorage('Consumido', []);
    const valoresSomados = [0, 0, 0, 0, 0, 0];
    const categorias = ['Proteina', 'Energia', 'Carboidrato', 'Gord Total', 'Fibras', 'Energia'];

    useEffect(() => {
        axios.get(`https://javiercuba.github.io/NutrientesTeste/nutrientes.JSON`).then((res) => {
            const response = res.data;
            setNutrientes(response);
        });
    }, []);

    // const chart = new ApexCharts(`bar-chart`, 'updateSeries');
    const novoAlimento = (name) => {
        try {
            setNutrientesSelecionados([...nutrientesSelecionados, name]);
        } catch (error) {
            alert('Erro ao inserir alimento');
        }
    };
    console.log(nutrientesSelecionados);

    const removeAlimento = (Alimento) => {
        try {
            let aux = [];
            aux = nutrientesSelecionados.filter((data) => data[0].Nome !== Alimento[0].Nome);
            setNutrientesSelecionados(aux);
        } catch (error) {
            alert('Erro ao remover alimento');
        }
    };
    // Isso tem que estar no final

    nutrientesSelecionados.forEach((alimento) => {
        console.log(alimento[0].Proteina);
        valoresSomados[0] += alimento[0].Proteina;
        valoresSomados[1] += alimento[0].Energia;
        valoresSomados[2] += alimento[0].Carboidrato;
        valoresSomados[3] += alimento[0].GordTotal;
        valoresSomados[4] += alimento[0].Fibras;
        valoresSomados[5] += alimento[0].Energia;
    });

    useEffect(() => {
        ApexCharts.exec(
            'bar-chart',
            'updateSeries',
            [
                {
                    name: 'Ingerido',
                    data: valoresSomados
                },
                {
                    name: 'Sugerido',
                    data: [135, 15, 15, 35, 65, 40]
                }
            ],
            true,
            true
        );
    }, [valoresSomados]);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                            <Tab label="Consumido" {...a11yProps(0)} />
                            <Tab label="Adicionar Alimento" {...a11yProps(1)} />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <CardContent>
                            <Grid container spacing={gridSpacing}>
                                {nutrientesSelecionados.length ? (
                                    nutrientesSelecionados.map((value) => (
                                        <Grid item xs={12}>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle1" color="inherit">
                                                                {value[0].Nome}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Button
                                                                        variant="subtitle2"
                                                                        color="inherit"
                                                                        onClick={() => {
                                                                            removeAlimento(value);
                                                                        }}
                                                                    >
                                                                        Remover
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                                        Proteina {value[0].Proteina} mg
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                                        Carboidratos {value[0].Carboidrato} mg
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    ))
                                ) : (
                                    <div>
                                        <Typography variant="alignCenter" fontSize="16px">
                                            Adicione um Alimento
                                        </Typography>
                                    </div>
                                )}
                            </Grid>
                        </CardContent>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={nutrientes.map((option) => option.Nome)}
                            renderInput={(params) => <TextField {...params} label="Escolha um alimento" />}
                            onChange={(e, value) => {
                                if (value != null) {
                                    const alimento = nutrientes.filter((alimento) => alimento.Nome === value);

                                    novoAlimento(alimento); // passando como objeto
                                }
                            }}
                        />
                    </TabPanel>
                    <Divider sx={{ my: 1.5 }} />
                </MainCard>
            )}
        </>
    );
};

PopularCard.propTypes = {
    isLoading: PropTypes.bool
};

export default PopularCard;

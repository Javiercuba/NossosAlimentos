import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import useLocalStorage from 'BD/useLocalStorage';
// material-ui
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Menu, MenuItem, Typography } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import axios from 'axios';
// project imports
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
    const [listConsumida, setlistConsumida] = useState([{}]);

    useEffect(() => {
        axios.get(`https://javiercuba.github.io/NutrientesTeste/nutrientes.JSON`).then((res) => {
            const response = res.data;
            setNutrientes(response);
        });
    }, []);

    // Condicional caso não tenha nenhum alimento
    function passToJSON() {
        setlistConsumida(nutrientesSelecionados ? nutrientesSelecionados.map((x) => x[0]) : [{}]);
    }

    const novoAlimento = (name) => {
        try {
            setNutrientesSelecionados([...nutrientesSelecionados, name]);
            setlistConsumida(nutrientesSelecionados);
            // passToJSON();
        } catch (error) {
            alert('Erro ao inserir alimento');
        }

        // setTeste(nutrientesSelecionados);
        // console.log([nutrientesSelecionados]);
    };

    const removeAlimento = (Alimento) => {
        try {
            let aux = [{}];
            aux = listConsumida.filter((data) => data.Nome !== Alimento.Nome);
            // setNutrientesSelecionados(aux);
            setlistConsumida(aux);
            console.log(aux);
        } catch (error) {
            alert('Erro ao remover alimento');
        }
        // passToJSON();
        // console.log(nutrientesSelecionados.filter((data) => data.Nome !== Alimento.Nome));
    };

    const users = localStorage.getItem('Consumido');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Area de teste

    // acaba aqui ............
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
                                {listConsumida.map((value, key) => {
                                    const { Nome } = value;
                                    return (
                                        <Grid item xs={12} key={key}>
                                            <Grid container direction="column">
                                                <Grid item>
                                                    <Grid container alignItems="center" justifyContent="space-between">
                                                        <Grid item>
                                                            <Typography variant="subtitle1" color="inherit" key={value.Nome}>
                                                                {value.Nome}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Grid container alignItems="center" justifyContent="space-between">
                                                                <Grid item>
                                                                    <Button variant="subtitle2" color="inherit">
                                                                        Editar
                                                                    </Button>
                                                                    <Button
                                                                        variant="subtitle2"
                                                                        color="inherit"
                                                                        onClick={() => removeAlimento(value)}
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
                                                        Proteina {value.Proteina} mg
                                                    </Typography>
                                                    <Typography variant="subtitle2" sx={{ color: 'success' }}>
                                                        Carboidratos {value.Carboidrato} mg
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                            <Divider sx={{ my: 1.5 }} />
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </CardContent>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Autocomplete
                            id="combo-box-demo"
                            options={nutrientes.map((option) => option.Nome)}
                            renderInput={(params) => <TextField {...params} label="Escolha um alimento" />}
                            onChange={(e, value) => {
                                // modificar isso daqui pra salvar no local storage
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

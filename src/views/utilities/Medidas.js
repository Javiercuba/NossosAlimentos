/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable default-case */
import { Grid, Link, TextField, Divider, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { Form } from 'semantic-ui-react';
import useLocalStorage from 'BD/useLocalStorage';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';

const Medidas = () => {
    const [age, setAge] = useLocalStorage('Idade', '');
    const [weight, setWeight] = useLocalStorage('Peso', '');
    const [height, setHeight] = useLocalStorage('Altura', '');
    const [activity, setActivity] = useLocalStorage('Atividade', '');
    const [name, setName] = useLocalStorage('Nome', '');
    const [gender, setGender] = useLocalStorage('Genero', '');
    const [calories, setCalories] = useLocalStorage('Calorias', '');
    const [IMC, setIMC] = useLocalStorage('IMC', '');

    const calculateIMC = () => {
        const imc = (weight / (height * height)) * 10000;
        setIMC(imc.toFixed(2));

        return imc.toFixed(2);
    };

    const calculateCalories = () => {
        let bmr = 0;
        // use equation to get bmr (calroies burned at rest)
        if (gender === 'male') {
            bmr = 66.473 + 13.75116 * weight + 5.033 * height - 6.755 * age;
        } else {
            bmr = 655.0955 + 9.5634 * weight + 1.8496 * height - 4.6756 * age;
        }

        switch (activity) {
            case 'none':
                bmr *= 1.2;
                break;
            case 'moderate':
                bmr *= 1.55;
                break;
            case 'heavy':
                bmr *= 1.725;
                break;
        }
        setCalories(Math.round(bmr));

        return Math.round(bmr);
    };

    const ValidEntry = () => {
        const fields = [gender, age, weight, height, activity];
        let i;

        for (i in fields) {
            console.log(fields[i]);
            if (fields[i].length === 0) {
                return false;
            }
        }

        // check each field is in a valid range
        if (age < 0 || age > 120) {
            return false;
        }
        if (weight < 0) {
            return false;
        }
        if (height < 0) {
            return false;
        }

        return true;
    };

    return (
        <div>
            <Box sx={{ p: 2.25 }}>
                <Grid direction="column">
                    <Grid item sx={{ mb: 0.75 }}>
                        <Grid container alignItems="center">
                            <Grid item xs={4}>
                                <Typography sx={{ fontSize: '1.525rem', fontWeight: 600, mr: 1, mt: 1.75, mb: 0.75 }}>
                                    Cadastro de informações
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={gridSpacing}>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            fluid
                            label="Nome"
                            placeholder="Nome"
                            type="string"
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            value={name}
                        />
                    </FormControl>
                </Grid>

                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            fluid
                            label="Peso"
                            type="number"
                            placeholder="Peso"
                            onChange={(event) => {
                                setWeight(event.target.value);
                            }}
                            value={weight}
                        />
                    </FormControl>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            fluid
                            label="Altura"
                            placeholder="cm"
                            type="number"
                            onChange={(event) => {
                                setHeight(event.target.value);
                            }}
                            value={height}
                        />
                    </FormControl>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                        <TextField
                            fluid
                            label="Idade"
                            placeholder="idade"
                            type="number"
                            onChange={(event) => {
                                setAge(event.target.value);
                            }}
                            value={age}
                        />
                    </FormControl>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"> Genero </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Gender"
                            onChange={(event) => {
                                setGender(event.target.value);
                            }}
                            value={gender}
                        >
                            <MenuItem value="male"> Masculino </MenuItem>
                            <MenuItem value="female"> Feminino </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label"> Atividade fisica </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Ativity"
                            onChange={(event) => {
                                setActivity(event.target.value);
                            }}
                            value={activity}
                        >
                            <MenuItem value="none"> Baixa </MenuItem>
                            <MenuItem value="moderate"> Moderada </MenuItem>
                            <MenuItem value="heavy"> Alta </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Divider variant="middle" />
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Button
                            href="/"
                            variant="contained"
                            onClick={() => {
                                if (ValidEntry()) {
                                    calculateCalories();
                                    calculateIMC();
                                } else {
                                    alert('Preencha todos os campos');
                                }
                            }}
                        >
                            Atualizar dados
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </div>
    );
};
export default Medidas;

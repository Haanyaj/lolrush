import { Card, Container } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import Page from '../Page';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { API_KEY } from './const';

const SummonerRow = ({joueur, name }) => {
  const [summonerData, setSummonerData] = useState({});

  useEffect(() => {
    const fetchSummoner = async () => {
      try {
        const response = await fetch(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}${API_KEY}`);
        const data = await response.json();
        const summon_id = data.id;
        const fetchSummonerData = async () => {
          try {
            const response = await fetch(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summon_id}${API_KEY}`);
            const res = await response.json();
            if (res[0].queueType ==  "RANKED_FLEX_SR") {
                setSummonerData(res[1]);
            } else {
                setSummonerData(res[0]);
            }
          } catch (error) {
            console.error(error);
          }
        };
        fetchSummonerData();
      } catch (error) {
        console.error(error);
      }
    };
    fetchSummoner();
  }, [name]);

  const rankImg = `/img/${summonerData.tier}.png`;

  return (
    <TableRow sx={{ 'td, th': { border: 0, color: 'white' } }}>
      <TableCell component="th" scope="row">
        {joueur}
      </TableCell>
      <TableCell align="right">{name}</TableCell>
      <TableCell align="right"> {<img src={rankImg}  style={{ height: '1.5rem', marginRight: '0.5rem' }} />}{summonerData?.tier} {summonerData?.rank}</TableCell>
      <TableCell align="right">{summonerData?.wins}</TableCell>
      <TableCell align="right">{summonerData?.losses}</TableCell>
      <TableCell align="right">{summonerData?.leaguePoints}</TableCell>
    </TableRow>
  );
};

const Home = () => {
  const players = [
    { joueur: "Alvyn", name: "Haaaan" },
    { joueur: "Alvyn", name: "ogfcnxb" },
    { joueur: "Alvyn", name: "Haaaan" },
  ];
  

  return (
    <Page title="DB Ranking">
      <Container>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650, bgcolor: '#2F4F4F' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: 'white' }}>Player</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">Summoner Name</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">Rank</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">W</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">L</TableCell>
                <TableCell sx={{ color: 'white' }} align="right">LP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {players.map((players) => (
                <SummonerRow key={players.name} name={players.name} joueur= {players.joueur} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Page>
  );
};

export default Home;

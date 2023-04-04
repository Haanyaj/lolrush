import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ToggleMenu from './ToggleMenu';
import { Button, IconButton, ClickAwayListener, Box, InputBase } from '@material-ui/core';
import { Link } from "react-router-dom";
import menu from "../globals/Menu"
import { useStore } from 'react-hookstore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from "@material-ui/icons/Search";

import NotificationButton from './NotificationButton';
import { useForm } from 'react-hook-form';



const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    margin: theme.spacing(1),
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  iconContainer: {
    display: 'flex',
  },
  menuBar: {
    marginRight: '50px',
  },
  signInButton: {
    margin: theme.spacing(1),
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  searchField: {
    width: '100%',
  },
  backButton: {
    margin: theme.spacing(1),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
}));


function SearchField() {
  const { handleSubmit } = useForm();
  const classes = useStyles();
  const onSubmit = data => {
    // Link to the API
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <form onSubmit={handleSubmit(onSubmit)} >
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </form>
    </div>
  );
}

function SearchNavBar(props) {
  const classes = useStyles();

  const handleClickAway = () => {
    props.setSearchActive(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <Toolbar>
        <IconButton color="inherit" onClick={() => props.setSearchActive(false)} className={classes.backButton} >
          <ArrowBackIcon />
        </IconButton>
        <SearchField />
      </Toolbar>
    </ClickAwayListener>
  );
}

function AuthMenuBar() {
  return (
    <div style={{ display: 'flex' }}>
      <NotificationButton />
    </div>
  )
}

function NonAuthMenuBar() {
  const classes = useStyles();
  return (
    <div style={{ display: 'flex' }}>
	    <div>{"LoL Ranking"}</div>
    </div>
  )
}

function BaseNavBar(props) {
  const classes = useStyles();
  const [auth, setAuth] = useStore('authStore');

  return (
    <Toolbar >
      <div className={classes.sectionMobile}>
        <ToggleMenu side='left' menu={menu} auth={auth} />
      </div>
      <Typography className={classes.title} variant="h6" noWrap>
        LoL Ranking
    </Typography>
      <div className={classes.sectionDesktop}>
        <div className={classes.menuBar}>
          {menu.map((item) => (
            ((auth && !item.public) || item.public) && <Button color="inherit" component={Link} to={item.route}>{item.title}</Button>
          ))}
        </div>
      </div>
      {props.search && <div className={classes.sectionDesktop}>
        <SearchField />
      </div>}
      <div className={classes.grow} />
      {props.search && <IconButton color="inherit" className={classes.sectionMobile} onClick={() => props.setSearchActive(true)}>
        <SearchIcon />
      </IconButton>}
      <div className={classes.iconContainer}>
        {auth ? <AuthMenuBar setAuth={setAuth} /> : <NonAuthMenuBar />}
      </div>
    </Toolbar>
  );
}

export default function NavBar(props) {
  const [searchActive, setSearchActive] = useState(false)
  return (
    <div>
      <AppBar position={!props.sticky ? "static" : 'fixed'}>
        {searchActive ? <SearchNavBar setSearchActive={setSearchActive} /> : <BaseNavBar {...props} setSearchActive={setSearchActive} />}
      </AppBar>
      {props.sticky && <Box height="64px"></Box>}
    </div>
  );
}

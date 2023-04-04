import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid, IconButton, Box } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Link } from 'react-router-dom';
import landscape from '../landscape.png'

const useStyles = makeStyles(theme => ({
    mainCenter: {
        display: 'flex',
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
        flexGrow: 1,
    },
    main: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(8),
    },
    title: {
        textAlign: 'center',
        color: theme.palette.secondary.main,
        marginBottom: theme.spacing(3),
        textTransform: 'uppercase'
    },
    backgroundContainer: {
        position: 'fixed',
        zIndex: -1,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundBlendMode: 'darken',
        backgroundPosition: 'center center',
      },
}));

function BackgroundImage(props) {
    const classes = useStyles();

    return (
        <div className={classes.backgroundContainer} style={{
            backgroundColor: 'rgba(255,255,255,' + (1 - props.opacity) + ')',
            backgroundImage: 'url(' + props.src + ')',
            filter: 'blur(' + props.blur + ')',
        }} />
    );
}

BackgroundImage.defaultProps = {
    opacity: 1,
    src: landscape,
    blur: '0px'
}

export default function Page(props) {
    const classes = useStyles()
    return (
        <Container className={props.center ? classes.mainCenter : classes.main}>
            {props.background && <BackgroundImage {...props}/>}
            {props.center ?
                <Box
                    display="flex"
                    flexDirection="column"
                    flex="1"
                >
                    {(props.back || props.title) && <Box
                        flex={1}
                        justifyContent="flex-start"
                    >
                        {props.back && <Box style={{ position: 'absolute' }}>
                            <IconButton color="secondary" component={Link} to={props.back}>
                                <ArrowBackIcon fontSize="large" />
                            </IconButton>
                        </Box>}
                        {props.title && <Box>
                            <h1 className={classes.title}>{props.title}
                            </h1>
                        </Box>}
                    </Box>}
                    <Box
                        display="flex"
                        flex={1}
                        alignItems="center"
                        alignSelf="center"
                    >
                        <Grid item >
                            {props.children}
                        </Grid>
                    </Box >
                    {(props.back || props.title) && <Box
                        display="flex"
                        flex={1}
                    />}
                </Box>
                :
                <div>
                    {(props.back || props.title) && <Box>
                        {props.back && <Box style={{ position: 'absolute' }}>
                            <IconButton color="secondary" component={Link} to={props.back}>
                                <ArrowBackIcon fontSize="large" />
                            </IconButton>
                        </Box>}
                        {props.title && <Grid container justify="center">
                            <h1 className={classes.title}>{props.title}
                            </h1>
                        </Grid>}
                    </Box>}
                    {props.children}
                </div>
            }
        </Container>


    );
}
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Container, Card, Typography, Button, } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    Container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: window.innerHeight + 'px',
    },
    card: {
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '30px',
        textAlign: 'center',
    },
    button: {
        marginTop: '50px',

    },
}));

function VerifyEmailPage(props) {
    const classes = useStyles();

    const handleClick = () => {
        window.location.reload();
    }

    return (
        <Container className={classes.Container}>
            <Card className={classes.card}>
                <Typography variant="h3">Verifica tu casilla de correo y confirma tu cuenta</Typography>
                <Button onClick={handleClick} className={classes.button} variant="contained" color="primary">Ya lo hice</Button>
            </Card>
        </Container>
    );
}

export default VerifyEmailPage;
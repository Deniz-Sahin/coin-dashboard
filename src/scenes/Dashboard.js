import {
	AppBar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	CssBaseline,
	Grid,
	Hidden,
	IconButton,
	InputAdornment,
	TextField,
	Toolbar,
	Typography,
	makeStyles,
} from "@material-ui/core";
import { Error, LockOpen, Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { handleErrors, useAuth } from "../services";

const useStyles = makeStyles((theme) => ({

}));

export default function Dashboard() {

    const history = useHistory();

    const classes = useStyles();
	const { user, setUser } = useAuth();

    useEffect(() => {
        if(!user || user === null)
        {
            history.push("/login");
        }
    }, []);

    return (
        <>
        </>
    )
}
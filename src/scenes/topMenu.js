import {
	AppBar,
	Box,
	Button,
	Grid,
	Hidden,
	IconButton,
	InputAdornment,
	TextField,
	Toolbar,
	Typography,
	makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { handleErrors, useAuth } from "../services";

import jwt from 'jwt-decode';

export default function TopMenu() {
    const history = useHistory();
    const token = localStorage.getItem("token");
    
    const [admin , setAdmin] = useState(false);
    
    useEffect(() => {
        if(token !== undefined && token !== null)
        {
            var decoded = jwt(token);
            if(decoded?.role === "admin")
                setAdmin(true);
        }
        else
        {
            history.push("/login");
        }
    }, []);

    return (
        <AppBar position="static">
        <Toolbar>
            <Button color="inherit" onClick={() => history.push("/")}>Dashboard</Button>
            {admin && (
                <Button color="inherit" onClick={() => history.push("/admin-page")}>Admin Page</Button>
            )}
            <Button color="inherit" onClick={() => history.push("/logout")}>Logout</Button>
        </Toolbar>
      </AppBar>
    )
}
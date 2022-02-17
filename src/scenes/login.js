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
import React, { useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { handleErrors, useAuth } from "../services";

import MultilineString from "../components/MultilineString"
import logo from "../images/paratica.jpg";

const useStyles = makeStyles((theme) => ({
	loginBox: {
		width: 400,
		margin: "0 auto",
		display: "flex !important",
		flexDirection: "column",
		[theme.breakpoints.down("xs")]: {
			margin: 0,
			minHeight: "100vh",
			minWidth: "100%",
			width: "auto",
		},
	},
	header: {
		backgroundColor: theme.palette.primary.main,
	},
	headerContent: {
		display: "flex",
        justifyContent: "center",
	},
	footer: {
		backgroundColor: theme.palette.primary.main,
		display: "flex",
		flexDirection: "row",
		justifyContent: "center",
		margin: 0,
		padding: "1rem 0",
	},
	footerText: {
		color: theme.palette.common.white,
	},
	headerImage: {
		height: "5rem",
	},
	content: {
		margin: "1rem",
		display: "flex",
		flexDirection: "column",
		flexGrow: 1,
		[theme.breakpoints.down("xs")]: {
			padding: "1rem",

			"&:before, &:after": {
				boxFlex: 1,
				flexGrow: 1,
				content: "''",
				display: "block",
				height: "24px",
			},
		},
	},
	root: {
		display: "flex",
	},
	container: {
		display: "flex !important",
		flexDirection: "column",
		minHeight: "100vh",
		position: "relative",
		[theme.breakpoints.up("sm")]: {
			flexGrow: 1,
			"&:before, &:after": {
				boxFlex: 1,
				flexGrow: 1,
				content: "''",
				display: "block",
				height: "24px",
			},
		},
	},
	button: {
		marginTop: "2rem",
	},
	bottomBar: {
		top: "auto",
		bottom: 0,
	},
	bottomBarContent: {
		justifyContent: "center",
	},
	errorBox: {
		height: "2rem",
		marginBottom: "0.5rem",
	},
	errorIcon: {
		display: "flex",
	},
	errorText: {
		display: "flex",
		alignItems: "center",
	},
	iconButton: {
		backgroundColor: "transparent !important",
		color: [theme.palette.text.secondary, "!important"],
		"&:hover": {
			backgroundColor: "rgba(33, 107, 170, 0.04)  !important",
			color: [theme.palette.text.main, "!important"],
		},
	},
}));

export default function Login() {
    const [state, setState] = useState({
		username: "",
		password: "",
		usernameRequired: false,
		processing: false,
		error: null,
	});

    const location = useLocation();
	const history = useHistory();

    const classes = useStyles();
	const { user, setUser } = useAuth();

    const setUsername = (value) => {
		setState({
			...state,
			username: value,
			usernameRequired: false,
		});
	};

    const onSubmit = (e) => {

        e.preventDefault();

		if (state.processing) {
			return;
		}

		if (state.username === "") {
			setState({ ...state, usernameRequired: true });
			document.getElementById("username").focus();
			return;
		}

		setState({
			...state,
			processing: true,
			usernameRequired: false,
		});

        const { username, password, returnLink } = state;

		fetch(`https://interview.paratica.com/auth`, {
			method: "POST",
			headers: { "Content-Type": "application/json;charset=UTF-8" },
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		})
			.then(handleErrors)
			.then((response) => response.json())
			.then((data) => {
				localStorage.setItem("token", JSON.stringify(data.token));
				setUser(data);
			})
			.then((roles) => {
				let from = location?.state?.from;
				if (!from) {
					from = "/";
				}
				history.push(from);
			})
			.catch((error) => {
				console.log(error);
				setState({
					...state,
					processing: false,
					error: error.message,
				});

			});

    };

    const { username, password, error, showPassword, processing, usernameRequired } = state;

    const content = (
		<form onSubmit={(e) => onSubmit(e)}>
			<Typography color="error" component="div" className={classes.errorBox}>
				<Grid container wrap="nowrap" spacing={1}>
					<Grid item justify="center" direction="column" className={classes.errorIcon}>
						{error && <Error />}
					</Grid>
					<Grid item className={classes.errorText}>
						<span>{error && <MultilineString>{error}</MultilineString>}</span>
					</Grid>
				</Grid>
			</Typography>
			<TextField
				id="username"
				label="User Name"
				margin="normal"
				variant="filled"
				value={username}
				autoFocus
				inputProps={{
					autocapitalize: "off",
				}}
				fullWidth={true}
				onChange={(e) => setUsername(e.target.value)}
				disabled={processing}
				error={usernameRequired}
			/>
			<TextField
				id="password"
				label="Password"
				margin="normal"
				type={showPassword ? "text" : "password"}
				variant="filled"
				value={password}
				fullWidth={true}
				onChange={(e) => setState({ ...state, password: e.target.value })}
				disabled={processing}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton
								edge="end"
								aria-label="Toggle password visibility"
								className={classes.iconButton}
								onClick={() => setState({ ...state, showPassword: !showPassword })}
							>
								{showPassword ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>
			<Button
				variant="contained"
				fullWidth={true}
				className={classes.button}
				color="secondary"
				aria-label="Login"
				type="submit"
				disabled={processing}
			>
				{processing ? <CircularProgress size={24} color="inherit" /> : <LockOpen />}
			</Button>
		</form>
	);

	 if (user && user !== undefined) {
	 	return <Redirect to="/" />;
	 }

    return (
		<div className={classes.root}>
			<CssBaseline />
			<Hidden smUp implementation="js">
				<AppBar position="fixed">
					<Toolbar>
						<img className={classes.headerImage} src={logo} alt="" />
					</Toolbar>
				</AppBar>
				<div className={classes.container}>
					<div className={classes.content}>{content}</div>
				</div>
				<AppBar className={classes.bottomBar} position="fixed">
					<Toolbar className={classes.bottomBarContent}>
						<Typography variant="subtitle1">Deniz's Coin Dashboard App</Typography>
					</Toolbar>
				</AppBar>
			</Hidden>
			<Hidden xsDown implementation="js">
				<div className={classes.container}>
					<Card className={classes.loginBox}>
						<CardHeader
							className={classes.header}
							title={
								<div className={classes.headerContent}>
									<img className={classes.headerImage} src={logo} alt="" />
								</div>
							}
						/>
						<CardContent className={classes.content}>{content}</CardContent>
						<CardActions className={classes.footer}>
							<Typography variant="subtitle1" className={classes.footerText}>
                                Deniz's Coin Dashboard App
							</Typography>
						</CardActions>
					</Card>
				</div>
			</Hidden>
		</div>
	);
}
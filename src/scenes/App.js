import { JwtProvider, SnackbarProvider } from "../services";
import { MuiThemeProvider, createTheme } from "@material-ui/core";
import { default as ReduxProvider, configureRedux } from "../utils/Redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

import Login from "./login"
import Logout from "./logout"
import Main from "./Main";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import {PageCenteredProgress} from "../components/CenteredProgress";
import React from "react";
import { create } from "jss";
import jssExpand from "jss-plugin-expand";
import reducer from "../actions";

let jssPlugins = [...jssPreset().plugins];
jssPlugins.splice(5, 0, jssExpand());
const jss = create({
	plugins: jssPlugins,
});

const COLOR_PRIMARY = "#F7B926";
const COLOR_SECONDARY = "#45BBA2";

const defaultTheme = createTheme();
const theme = createTheme({
	palette: {
		primary: {
			main: COLOR_PRIMARY,
		},
		secondary: {
			main: COLOR_SECONDARY,
		},
		tertiary: {
			main: "#3B3C3E",
		},
		text: {
			primary: "#5f616f",
		},
	},
	typography: { useNextVariants: true },
	menu: {
		width: 250,
		collapsedWidth: 65,
	},
	main: { spacing: "16px" },
	overrides: {
		MuiToolbar: {
			gutters: {
				paddingRight: `${defaultTheme.spacing(1)}px !important`,
				paddingLeft: `${defaultTheme.spacing(1)}px !important`,
			},
		},
		MuiSelect: {
			root: {
				paddingRight: defaultTheme.spacing(6),
			},
			icon: {
				padding: "inherit",
				paddingRight: 4,
			},
		},
		MuiFilledInput: {
			underline: {
				"&:after": {
					borderBottomColor: COLOR_SECONDARY,
				},
			},
		},
		MuiInputLabel: {
			root: {
				"&$focused": {
					color: COLOR_SECONDARY,
				},
			},
			focused: {},
		},
		MuiListItem: {
			button: {
				"&:hover": {
					color: `${COLOR_PRIMARY} !important`,
				},
			},
		},
		MuiCardHeader: {
			action: {
				marginRight: "-8px !important",
			},
		},
		MuiCardActions: {
			root: {
				padding: "8px 4px !important",
			},
		},
		MuiButtonBase: {
			root: {
				outline: "0 !important",
			},
		},
		MuiButton: {
			root: {
				fontSize: "13px",
			},
			containedPrimary: {
				color: "#faebd7",
			},
		},
		FontAwesomeIcon: {
			root: {
				fontSize: "64px",
			},
		},
		MuiPickersToolbarText: {
			toolbarTxt: {
				whiteSpace: "nowrap",
			},
		},
		MuiGrid: {
			root: {
				fontSize: "12px",
			},
		},
	},
});

const { persistor, store } = configureRedux(reducer, {
	key: "deniz:coin-dashboard",
	whitelist: ["coins", "favorites"],
});

export default function App() {

	return (
        <ReduxProvider persistor={persistor} store={store}>
            <StylesProvider jss={jss}>
                <MuiThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <React.Suspense fallback={<PageCenteredProgress />}>
                            <JwtProvider>
                                <SnackbarProvider>
                                    <Router>
                                        <React.Fragment>
                                            <Switch>
                                                <Route exact path="/login" component={Login} />
                                                <Route exact path="/logout" component={Logout} />
												<Route path="*" component={Main} />
                                            </Switch>
                                        </React.Fragment>
                                    </Router>
                                </SnackbarProvider>
                            </JwtProvider>
                        </React.Suspense>
                    </MuiPickersUtilsProvider>
                </MuiThemeProvider>
            </StylesProvider>
        </ReduxProvider>
    )
}
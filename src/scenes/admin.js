import {
	AppBar,
	Avatar,
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
import { useDispatch, useSelector } from "react-redux";

import { setCoins } from "../actions/coinsActions";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
		margin: theme.spacing(4),
	},
	cardHeader: {
		marginLeft: theme.spacing(2),
		marginTop: theme.spacing(1),
		width: "31vw",
		[theme.breakpoints.up("sm")]: {
			width: "20vw",
		},
		[theme.breakpoints.up("md")]: {
			// width: "9vw",
		},
	},
	cardButton: {
		marginTop: theme.spacing(2),
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(1),
		marginLeft: "auto",
	},
    coinCard: {
		width: "25rem",
	},
    coinAvatar: {
		width: "25rem",
	},
}));

export default function AdminPage() {

    const { coins: selectedCoins } = useSelector((state) => state.coins);
    const [systemCoins, setSystemCoins] = useState();
	const [topCoins, setTopCoins] = useState();

    const dispatch = useDispatch();
    const classes = useStyles();

    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${selectedCoins.join()}&order=volume_desc&per_page=10&page=1&sparkline=false`, {
			headers: {
				"Content-type": "application/json",
			},
		})
            .then((resp) => resp.json())
            .then((coins) => {
                setSystemCoins(coins);
            })
            .catch((e) => {
                console.log(e);
            });
	}, [selectedCoins]);

    const handleRemoveCoin = (coin) => {
		dispatch(setCoins(selectedCoins.filter(x=> x !== coin.id)));
    };

    const handleAddCoin = (coin) => {
		dispatch(setCoins([...selectedCoins,coin.id]));
    }
    
	useEffect(() => {

		fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&category=asset-backed-tokens&order=volume_desc&per_page=10&page=1&sparkline=false" , {
			headers: {
				"Content-type": "application/json",
			},
		})            
		.then((resp) => resp.json())
		.then((coins) => {
			setTopCoins(coins.slice(0,10));
		})
		.catch((e) => {
			console.log(e);
		});

	}, []);

    const CoinCard = ({ coin }) => (
		<Grid item xs={4}>
			<Card className={classes.coinCard}>
				<CardHeader
					title={coin?.name}
                    avatar={ <Avatar> <img className={classes.coinAvatar} src={coin?.image} alt="" /> </Avatar>}
				/>
				<CardContent>
                    <Grid item xs={10}>
                        <Typography noWrap className={classes.cardHeader} variant="h7">
                            Current Price:{coin?.current_price}
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography noWrap className={classes.cardHeader} variant="h7">
                            Market Cap:{coin?.market_cap}
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography noWrap className={classes.cardHeader} variant="h7">
                            Total Volume:{coin?.total_volume}
                        </Typography>
                    </Grid>
				</CardContent>
				<CardActions className={classes.projectCardActions}>
                    <Grid item xs={2} className={classes.cardButton}>
                        <Button
                            onClick={() => {
                                selectedCoins.includes(coin.id) ?
                                handleRemoveCoin(coin) :
                                handleAddCoin(coin);
                            }}
                        >
                        {selectedCoins.includes(coin.id) ? "Remove Coin" : "Add Coin"}
                        </Button>
                    </Grid>
				</CardActions>
			</Card>
		</Grid>
	);

    return (

    <Grid container alignItems="stretch" className={classes.gridContainer} spacing={4}>
        <Grid item xs={12}>
			<Typography variant="h5">System Coins</Typography>
        </Grid>
        <Grid container spacing={2}>
        {systemCoins &&
					systemCoins?.map((coin, index) => <CoinCard key={index} coin={coin} />)}
        </Grid>
		<Grid item xs={12}>
			<Typography variant="h5">Top Coins</Typography>
        </Grid>
        <Grid container spacing={2}>
        {topCoins &&
					topCoins?.map((coin, index) => <CoinCard key={index} coin={coin} />)}
        </Grid>
    </Grid>

    )
}
import {
	AppBar,
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	CircularProgress,
	CssBaseline,
	FormControl,
	Grid,
	Hidden,
	IconButton,
	InputAdornment,
	InputLabel,
	MenuItem,
	OutlinedInput,
	Select,
	TextField,
	Toolbar,
	Typography,
	makeStyles,
} from "@material-ui/core";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Error, LockOpen, Visibility, VisibilityOff } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { handleErrors, useAuth } from "../services";
import { useDispatch, useSelector } from "react-redux";

import { setFavorites } from "../actions/favoritesActions"

const useStyles = makeStyles((theme) => ({
	gridContainer: {
		margin: theme.spacing(4),
	},
	coinSelect: {
		width: "25rem",
	}
}));

export default function Dashboard() {

	const { coins: systemCoins } = useSelector((state) => state.coins);
	const { favorites: selectedFavorites } = useSelector((state) => state.favorites);
	
	const [selectedCoin, setSelectedCoin] = useState();
	const [chartData, setChartData] = useState();

	const dispatch = useDispatch();
    const classes = useStyles();

	useEffect(() => {
		if(selectedCoin){
			fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily`, {
				headers: {
					"Content-type": "application/json",
				},
			})
				.then((resp) => resp.json())
				.then((data) => {
					console.log(data);
					let fixedData = [];
					for(var i = 30; i >= 0 ; i--)
					{
						let now = new Date();
						const backdate = new Date(now.setDate(now.getDate() - i));
						var date = backdate.toDateString();
						fixedData.push(
							{
								date : date,
								price: data?.prices[i][1],
								marketCap: data?.market_caps[i][1],
								totalVolume: data?.total_volumes[i][1],
							}
						)
					}
					setChartData(fixedData);

				})
				.catch((e) => {
					console.log(e);
				});
		}
	}, [selectedCoin]);

	const handleRemoveCoin = (coin) => {
		dispatch(setFavorites(selectedFavorites?.filter(x=> x !== coin)));
    };

    const handleAddCoin = (coin) => {
		if(selectedFavorites)
			dispatch(setFavorites([...selectedFavorites,coin]));
		else
			dispatch(setFavorites([coin]));
	};

    return (
		<Grid container alignItems="center" className={classes.gridContainer} spacing={4}>
			<Grid item xs={12} sm={6}>
				<FormControl className={classes.coinSelect}>
					<InputLabel >System Coins</InputLabel>
					<Select
						fullWidth
						value={selectedCoin}
						onChange={(e) => setSelectedCoin(e.target.value) }
						input={<OutlinedInput label="System Coins" />}
					>
					{systemCoins.map((coin) => (
						<MenuItem
						key={coin}
						value={coin}
						>
						{coin}
						</MenuItem>
					))}
					</Select>
				</FormControl>
			</Grid>
			<Grid item xs={12} className={classes.button}>
				<Button
					onClick={() => {
						selectedFavorites?.includes(selectedCoin) ?
						handleRemoveCoin(selectedCoin) :
						handleAddCoin(selectedCoin);
					}}
				>
				{selectedFavorites?.includes(selectedCoin) ? "Remove from Favorites" : "Add to Favorites"}
				</Button>
			</Grid>
			<Grid item xs={12}>
				<LineChart width={1500} height={500} data={chartData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="price" stroke="#8884d8" />
				</LineChart>
			</Grid>
			<Grid item xs={12}>
				<LineChart width={1500} height={500} data={chartData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="marketCap" stroke="#82ca9d" />
				</LineChart>
			</Grid>
			<Grid item xs={12}>
				<LineChart width={1500} height={500} data={chartData}
					margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="totalVolume" stroke="#F7B926" />
				</LineChart>
			</Grid>
		</Grid>
    )
}
import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
	root: {
		width: "40px",
		height: "40px",
		margin: "0 auto",
		marginTop: "40vh",
	},
	rootCentered: {
		display: "flex",
		justifyContent: "center",
		paddingTop: "1rem",
	},
	backDropContainer: {
		zIndex: 1000,
		position: "fixed",
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
	},
});

class _PageCenteredProgress extends PureComponent {
	render() {
		const { classes, backdrop } = this.props;

		if (backdrop) {
			return (
				<div className={classes.backDropContainer}>
					<Backdrop open={true} />
					<div className={classes.root}>
						<CircularProgress color="inherit" />
					</div>
				</div>
			);
		} else {
			return (
				<div className={classes.root}>
					<CircularProgress color="inherit" />
				</div>
			);
		}
	}
}

class _CenteredProgress extends PureComponent {
	render() {
		const { classes } = this.props;

		return (
			<div className={classes.rootCentered}>
				<CircularProgress color="inherit" />
			</div>
		);
	}
}

_PageCenteredProgress.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

_CenteredProgress.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

const PageCenteredProgress = withStyles(styles, { withTheme: true })(_PageCenteredProgress);
const CenteredProgress = withStyles(styles, { withTheme: true })(_CenteredProgress);

export { PageCenteredProgress, CenteredProgress };

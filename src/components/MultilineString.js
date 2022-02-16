import React from "react";

import PropTypes from "prop-types";

const MultilineString = (props) => {
	const { children } = props;

	return children.split("\n").map((value, ix) => (ix ? [<br key={ix} />, value] : value));
};

MultilineString.PropTypes = {
	children: PropTypes.string.isRequired,
};

export default MultilineString;

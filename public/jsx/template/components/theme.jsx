import {Styles, Utils} from 'material-ui';

const
	{ Colors,
		Spacing, 
		Typography } 				= Styles,
	{ ColorManipulator }	= Utils
;

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.green500,
    primary2Color: Colors.grenn700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.orangeA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3),
  },
};

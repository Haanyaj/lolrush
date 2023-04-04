import React from "react";

import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import InputAdornment from '@material-ui/core/InputAdornment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { IconButton } from "@material-ui/core";

const styles = theme => ({
    formControl: {
        left: 30, // this moves our label to the left, so it doesn't overlap when shrunk.
        top: 0,
    },
    disabled: {},
});

class TextFieldIcon extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shrink: false, // this is used to shrink/unshrink ( is this a correct word? ) the label
            passwordVisible: false,
        }
        this.handlePassword = this.handlePassword.bind(this);
    }

    shrinkLabel = (event) => {
        const { onFocus } = this.props;
        this.setState({ shrink: true });
        onFocus && onFocus(event); // let the child do it's thing
    };

    unShrinkLabel = (event) => {
        const { onBlur } = this.props;
        if (event.target.value.length === 0) {
            this.setState({ shrink: false }) //gotta make sure the input is empty before shrinking the label
        }
        onBlur && onBlur(event); // let the child do it's thing
    };

    handlePassword = () => {
        this.setState({ passwordVisible: !this.state.passwordVisible })
    }


    render() {
        // make sure to check endIcon and startIcon, we don't need errors in our console
        const { classes, endIcon, autoComplete, startIcon, type, ...other } = this.props;
        return <TextField {...other}
            type={type !== 'password' ? type : (this.state.passwordVisible ? 'text' : 'password')}
            onFocus={this.shrinkLabel}
            onBlur={this.unShrinkLabel}
            InputLabelProps={{ shrink: this.state.shrink, classes: classes }}
            InputProps={{
                autoComplete,
                endAdornment: this.props.type === 'password' && (
                    <InputAdornment position={"end"}>
                        <IconButton onClick={this.handlePassword}>
                            {this.state.passwordVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                    </InputAdornment>
                ),
                startAdornment: startIcon && (
                    <InputAdornment position={"start"}>
                        {startIcon}
                    </InputAdornment>
                )
            }}
        />;
    }
}

export default withStyles(styles)(TextFieldIcon);
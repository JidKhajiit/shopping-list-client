import React from 'react';
import TextField from '@material-ui/core/TextField';
import '../../app.scss';
import '../../styles/inputText.scss'
import './SignIn.scss'
import { Container, InputAdornment, IconButton, InputLabel, OutlinedInput, FormControl } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Link } from 'react-router-dom';
import MyButton from '../smallComponents/Button'
import { useSelector } from 'react-redux';


export default props => {
    const { myUser: { login = "", password = "" } } = useSelector(state => state.users)
    const [values, setValues] = React.useState({
        login,
        password,
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Container className="card sign-in-page" >
            <div className="card-body">
                <h2 className="card-tytle">Welcome</h2>
                <TextField
                    // required
                    id="outlined-login-input"
                    label="Login"
                    variant="outlined"
                    value={values.login}
                    onChange={handleChange('login')}
                />
                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={values.password}
                        onChange={handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        labelWidth={70}
                    />
                </FormControl>
                <MyButton>LOGIN</MyButton>
                <div className="link-to-sing-up">
                    <p className="card-text" style={{ display: "inline" }}>Don't have an account? </p>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>
        </Container>
    )
}
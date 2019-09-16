import React from 'react'
import './Login.css'
import groupImg from '../assets/svg 1.svg'

const Login = () =>{
	return(
		<div className="Login">
			<div className="form-con">
			<form action="">
				<h1 className="text-primary">Login</h1>
				<label htmlFor="username" className="label-brk">Username</label>
				<input type="text" name="username" id="username"/>
				<label htmlFor="password" className="label-brk">Password</label>
				<input type="text" name="password" id="password"/>
				
				<label htmlFor="remember" className="label-brk"><input type="checkbox" name="remember" id="remember"/>Remember Me</label>
				<button className="btn-primary">Login</button>
				<button className="btn-transparent-default">Forgot Password</button>
				<button className="btn-transparent-primary">Don't have an account?</button>
			</form>
			</div>
			<div className="img-con">
				<img src={groupImg} alt=""/>
			</div>
		</div>
	)
}

export default Login
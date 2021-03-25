import React, { useState } from "react";
import { Link } from "react-router-dom";

export const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
	}

	return (
		<div>
			<div className="container">
				<div className="boxLogin col-md-4">
					<h3 className="text-center">Iniciar Sesión</h3>
					<form onSubmit={handleSubmit}>
						<div className="form-group " controlId="email">
							<label>Correo Electronico</label>
							<input
								className="form-control"
								autoFocus
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</div>
						<div className="form-group" controlId="password">
							<label>Contraseña</label>
							<input
								className="form-control"
								type="password"
								value={password}
								onChange={e => setPassword(e.target.value)}
								required
							/>
						</div>
						<div className="text-center" style={{ marginBottom: "10px" }}>
							<button className="btn btn-info center-button" type="submit">
								{/*  disabled={!validateForm()} */}
								Iniciar Sesión
							</button>
						</div>

						<div className="text-center">
							<Link to="/">
								<span className="btn btn-outline-info" href="#" role="button">
									Regresa
								</span>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

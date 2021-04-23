import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const ResetPassword = () => {
	const { store, actions } = useContext(Context);
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const [token, setToken] = useState(location.pathname.split("/")[2]);

	const handlerSubmit = () => {
		e.preventDefault();
		actions.resetPassword(confirmNewPassword, token);
	};

	return (
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-4 col-md-offset-4">
					<div className="panel panel-default">
						<div className="panel-body">
							<div className="text-center">
								<h3>
									<i className="fa fa-lock fa-4x" />
								</h3>
								<h2 className="text-center">Ingresa tu nueva contraseña</h2>
								<p>Nueva contraseña</p>
								<div className="panel-body">
									<form
										id="register-form"
										role="form"
										autoComplete="off"
										className="form"
										method="post"
										onSubmit={e => handlerSubmit(e)}>
										<div className="form-group">
											<div className="input-group">
												<div className="input-group-prepend">
													<span className="input-group-text bg-white px-4 border-md border-right-0">
														<i className="fa fa-lock text-muted" />
													</span>
												</div>
												<input
													id="email"
													name="email"
													placeholder="Ingrese su Nueva Contraseña"
													className="form-control border-left-0"
													type="password"
													value={newPassword}
													onChange={e => setNewPassword(e.target.value)}
												/>
											</div>
										</div>
										<div className="form-group">
											<div className="input-group">
												<div className="input-group-prepend">
													<span className="input-group-text bg-white px-4 border-md border-right-0">
														<i className="fa fa-lock text-muted" />
													</span>
												</div>
												<input
													id="email"
													name="email"
													placeholder="Confirme su nueva Contraseña"
													className="form-control border-left-0"
													type="password"
													value={confirmNewPassword}
													onChange={e => setConfirmNewPassword(e.target.value)}
												/>
											</div>
										</div>

										<div className="form-group">
											<input
												name="recover-submit"
												className="btn btn-lg btn-info btn-block"
												value="Crear Nueva Contraseña"
												type="submit"
											/>
										</div>

										<input type="hidden" className="hide" name="token" id="token" value="" />
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

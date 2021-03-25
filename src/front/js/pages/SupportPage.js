import React from "react";

export const SupportPage = () => {
	return (
		<div className="container">
			<h2 className="text-center">Si tienes dudas, escribenos!!</h2>
			<div className="boxSupport col-sm-8">
				<form>
					<div className="form-group">
						<label className="inputEmail1">Correo Electronico</label>
						<input
							type="email"
							className="form-control"
							id="inputEmail1"
							aria-describedby="emailHelp"
							placeholder="Enter email"
							required
						/>
					</div>
					<div className="form-group">
						<label className="formControlTextarea1">Escribe Aqui</label>
						<textarea className="form-control" id="formControlTextarea1" style={{ height: "10rem" }} />
					</div>
					<div className="text-center">
						<button type="submit" className="btn btn-info center-button">
							Enviar Consulta
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

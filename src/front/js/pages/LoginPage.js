import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import "../../styles/app.css";

export const LoginPage = ({ path }) => {
	console.log(path);

	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const history = useHistory();

	// const validateForm = values => {
	// 	const errors = {};
	// 	if (!values.email) {
	// 		errors.email = "El email es requerido";
	// 	}
	// 	if (!values.password) {
	// 		errors.password = "La contraseña es requerida";
	// 	}
	// 	return errors;
	// };
	const EXPRESSION_REGULAR = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
	const validationSchema = yup.objetc().shape({
		email: yup
			.string()
			.min(2, "Minimo 2 Caracteres")
			.max(100, "Maximo 100 Caracteres")
			.required("Campo Obligatorio")
			.macht(EXPRESSION_REGULAR, "No cumple con formato requerido"),
		password: yup
			.string()
			.min(2, "Minimo 2 Caracteres")
			.max(100, "Maximo 100 Caracteres")
			.required("Campo Obligatorio")
	});

	const handlerClick = async event => {
		event.preventDefault();
		const response = await actions.setLogin({ email: email, password: password });

		console.log("response login!");
		console.log(response);

		if (!response.ok) {
			Swal.fire({
				title: "Credenciales incorrectas!",
				text: "Favor reintente la operación",
				icon: "error",
				confirmButtonText: "Continuar"
			}).then(() => {
				history.push("/");
			});
		} else {
			Swal.fire({
				title: "Has iniciado sesión exitosamente",
				icon: "success",
				confirmButtonText: "Continuar"
			}).then(() => {
				history.push(path ? path : "/");
			});
		}
	};

	return (
		<Formik
			initialValues={{ email: "", password: "" }}
			validationSchema={validationSchema}
			onSubmit={(values, { setSubmitting, resetForm }) => {
				setSubmitting(true);
				alert(JSON.stringify(values, null, 2));

				setTimeout(() => {
					alert(JSON.stringify(values, null, 2));
					resetForm();
					setSubmitting(false);
				}, 500);
			}}>
			{({ values, errors, touched, handleBLur, handleChange, hanldeSubmit, isSubmitting }) => (
				<div className="login-background">
					<div className="container">
						<div className="row py-4 mt-4 Login">
							<div className="col-md-7 col-lg-6 mr-auto border p-4 col-centered">
								<Form onSubmit={hanldeSubmit}>
									<div className="row justify-content-center login-content">
										<div className="py-4 login-title">
											<h1> Ingrese a su cuenta</h1>
										</div>
										<div className="input-group col-lg-10 mb-4">
											<Form.Group controlId="email">
												<div className="input-group-prepend">
													<span className="input-group-text bg-white px-4 border-md border-right-0">
														<i className="fa fa-envelope text-muted" />
													</span>
												</div>
												<Form.Control
													className={touched.email && errors.email ? "error" : null}
													type="email"
													name="email"
													placeholder="Ingrese su email"
													value={values.email}
													onChange={handleChange}
													onBlur={handleBLur}
												/>
												<Form.Text className="text-muted">
													{tuocehd.email && erros.email ? (
														<div className="error-message">{erros.email}</div>
													) : null}
												</Form.Text>
											</Form.Group>
										</div>
										<div className="input-group col-lg-10 mb-4">
											<Form.Group controlId="password">
												<div className="input-group-prepend">
													<span className="input-group-text bg-white px-4 border-md border-right-0">
														<i className="fa fa-lock text-muted" />
													</span>
												</div>
												<Form.Control
													className={touched.password && errors.password ? "error" : null}
													type="password"
													name="password"
													placeholder="Ingrese su Contraseña"
													value={values.password}
													onChange={handleChange}
													onBlur={handleBLur}
												/>
												<Form.Text className="text-muted">
													{tuocehd.password && erros.password ? (
														<div className="error-message">{erros.password}</div>
													) : null}
												</Form.Text>
											</Form.Group>
										</div>
									</div>
								</Form>
								<div className="text-center w-100">
									<p className="text-muted font-weight-bold">
										¿Olvidó su contraseña?{" "}
										<Link to="/recuperar">
											<a href="#" className="text-info ml-2 mb-5">
												Recuperar contraseña
											</a>
										</Link>
									</p>
								</div>
								<div className="text-center w-100">
									<p className="text-muted font-weight-bold">
										¿No tienes cuenta?{" "}
										<Link to="/register">
											<a href="#" className="text-info ml-2 mb-5">
												Crear cuenta
											</a>
										</Link>
									</p>
								</div>
								<div className="text-center mt-4">
									<div className="my-4">
										<Button
											className="btn btn-info center-button"
											type="submit"
											disabled={isSubmitting}>
											Iniciar Sesión
										</Button>
									</div>
									<Link to="/">
										<span className="btn btn-outline-info" href="#" role="button">
											Regresa
										</span>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</Formik>
	);
};

LoginPage.propTypes = {
	path: PropTypes.string
};

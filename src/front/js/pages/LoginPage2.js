import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import "../../styles/app.css";


const EXPRESION_REGULAR = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const validationSchema= yup.object().shape({
	formformEmail: yup.string()
        .min(2, "Minimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("* Campo requerido")
        .matches( EXPRESION_REGULAR, "No cumple formato esperado" ),
	formformPassword: yup.string()
        .min(2, "Minimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("* Campo requerido")
});


export const LoginPage22 = ({ path }) => {
	console.log(path);

	// const { store, actions } = useContext(Context);
	// const [formEmail, setformEmail] = useState("");
	// const [formPassword, setformPassword] = useState("");

	// const history = useHistory();

	// const validateForm = values => {
	// 	const errors = {};
	// 	if (!values.formEmail) {
	// 		errors.formEmail = "El formEmail es requerido";
	// 	}
	// 	if (!values.formPassword) {
	// 		errors.formPassword = "La contraseña es requerida";
	// 	}
	// 	return errors;
	// };

	// const handlerClick = async event => {
	// 	event.preventDefault();
	// 	const response = await actions.setLogin({ formEmail: formEmail, formPassword: formPassword });

	// 	console.log("response login!");
	// 	console.log(response);

	// 	if (!response.ok) {
	// 		Swal.fire({
	// 			title: "Credenciales incorrectas!",
	// 			text: "Favor reintente la operación",
	// 			icon: "error",
	// 			confirmButtonText: "Continuar"
	// 		}).then(() => {
	// 			history.push("/");
	// 		});
	// 	} else {
	// 		Swal.fire({
	// 			title: "Has iniciado sesión exitosamente",
	// 			icon: "success",
	// 			confirmButtonText: "Continuar"
	// 		}).then(() => {
	// 			history.push(path ? path : "/");
	// 		});
	// 	}
	// };

	return (
		<Formik
			initialValues={{ formEmail: "", formPassword: "" }}
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
			{({ values, errors, touched, handleBLur, handleChange, handleSubmit, isSubmitting }) => (
				<div className="login-background">
					<div className="container">
						<div className="">
							<div className="col-md-7 col-lg-6 mr-auto border p-4 col-centered">
								<Form onSubmit={handleSubmit}>
									
									<div className="row justify-content-center login-content">
										<div className="py-4 login-title">
											<h1> Ingrese a su cuenta</h1>
										</div>
										<div className="input-group col-lg-12 mb-8">
											<Form.Group controlId="formEmail">
												<div className="">
													{/* <span className="input-group-text bg-white px-4 border-md border-right-0">
														<i className="fa fa-envelope text-muted" />
													</span> */}
												</div>
												<Form.Control
                                                    type="text"
													name="formEmail"
													placeholder="Ingrese su Email"
													value={values.formEmail}
													onChange={handleChange}
													onBlur={handleBLur}
													className={touched.formEmail && errors.formEmail ? "error" : null}
												/>
												<Form.Text className="text-muted">
													{touched.formEmail && errors.formEmail ? (
														<div className="error-message">{errors.formEmail}</div>
													) : null}
												</Form.Text>
											</Form.Group>
										</div>
										<div className="input-group col-lg-12 mb-8">
											<Form.Group controlId="formPassword">
												<div className="input-group-prepend">
													{/* <span className="input-group-text bg-white px-4 border-md border-right-0">
														<i className="fa fa-lock text-muted" />
													</span> */}
												</div>
												<Form.Control
													className={touched.formPassword && errors.formPassword ? "error" : null}
													type="formPassword"
													name="formPassword"
													placeholder="  Ingrese su Contraseña"
													value={values.formPassword}
													onChange={handleChange}
													onBlur={handleBLur}
												/>
												<Form.Text className="text-muted">
													{touched.formPassword && errors.formPassword ? (
														<div className="error-message">{errors.formPassword}</div>
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

LoginPage22.propTypes = {
	path: PropTypes.string
};

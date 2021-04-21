import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
// import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import "../../styles/app.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


const EXPRESION_REGULAR = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
const validationSchema = yup.object().shape({
    formPassword: yup.string()
        .min(2, "Minimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("* Campo requerido"),
    formEmail: yup.string()
        .min(2, "Minimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("* Campo requerido")
        .matches(EXPRESION_REGULAR, "No cumple formato esperado")
});


export const LoginPage = () => {
    return (
        <Formik
            initialValues={{ formEmail: "", formPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {

                setSubmitting(true);
                alert(JSON.stringify(values, null, 2));
                setTimeout(() => {
                    console.log(JSON.stringify(values, null, 2));
                    resetForm();
                    setSubmitting(false);
                }, 500);

            }}

        >
            {/* Callback function containing Formik state and helpers that handle common form actions */}
            {({ values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting }) => (
                    <div className="login-background">
                        <div className="container">
                            <div className="col-md-7 col-lg-6 mr-auto border p-4 col-centered">
                                <Form onSubmit={handleSubmit} className='p-lg-4'>
                                    {console.log('<VALUES>: ', values)}
                                    <div className="row justify-content-center login-content">
                                        <div className="py-4 login-title">
                                            <h1> Ingrese a su cuenta</h1>
                                        </div>
                                        <div className="col-lg-12 mb-8">
                                            <Form.Group controlId="formEmail">
                                                <Form.Control
                                                    type="text"
                                                    name="formEmail"
                                                    placeholder="Ingrese su Correo"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.formEmail}
                                                    className={touched.formEmail && errors.formEmail ? "error" : null}
                                                />
                                                <Form.Text className="text-muted">
                                                    {touched.formEmail && errors.formEmail ? (
                                                        <div className="error-message">{errors.formEmail}</div>
                                                    ) : null}
                                                </Form.Text>
                                            </Form.Group>


                                            <Form.Group controlId="formPassword">
                                                <Form.Control
                                                    type="password"
                                                    name="formPassword"
                                                    placeholder="Ingrese Contraseña"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.formPassword}
                                                    className={touched.formPassword && errors.formPassword ? "error" : null}
                                                />
                                                <Form.Text className="text-muted">
                                                    {touched.formPassword && errors.formPassword ? (
                                                        <div className="error-message">{errors.formPassword}</div>
                                                    ) : null}
                                                </Form.Text>
                                            </Form.Group>
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
                            </div>
                        </div>
                    </div>
                )}
        </Formik>
    );
};
// export default LoginPage;
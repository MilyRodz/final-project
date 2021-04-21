import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useHistory } from "react-router-dom";
import GoogleLogin from "react-google-login";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";
import { Formik, Field } from "formik";
import * as yup from "yup";
import "../../styles/app.css";



const EXPRESION_REGULAR = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
//const CONDITION_NUMBER = /^(+?56)?(\s?)(0?9)(\s?)[987654]\d{7}$/

const validationSchema = yup.object().shape({
    formPassword: yup.string()
        .min(2, "Minimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("* Campo requerido"),
    formConfirmPassword: yup.string()
        .min(2, "Minimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("* Campo requerido"),
    formEmail: yup.string()
        .min(2, "Minimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("* Campo requerido")
        .matches(EXPRESION_REGULAR, "Ingrese un email valido"),
    formFirstName: yup.string()
        .min(2, "Minimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("* Campo requerido"),
    formLastName: yup.string()
        .min(2, "Minimo 2 caracteres")
        .max(100, "Máximo 100 caracteres")
        .required("* Campo requerido"),
    formPhoneNumber: yup.string()
        .min(2, "Minimo 2 caracteres")
        .max(100, "Máximo 10 caracteres")
        .required("* Campo requerido")
        //.matches(CONDITION_NUMBER, 'Ingrese un numero valido'),

});



export const RegisterPage = () => {
    const { store, actions } = useContext(Context);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const history = useHistory();

    const handlerClick = async e => {
        e.preventDefault();

        const isOk = await actions.setRegister({
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: phone,
            password: password,
            password: passwordConfirmation
        });

        if (!isOk) {
            Swal.fire({
                title: "Hubo un Error!",
                text: "Favor reintente la operación",
                icon: "error",
                confirmButtonText: "Continuar"
            }).then(() => {
                history.push("/register");
            });
        } else {
            Swal.fire({
                title: "Usuario registrado con exito",
                text: "¿Deseas continuar?",
                icon: "success",
                confirmButtonText: "Continuar"
            }).then(() => {
                history.push("/login");
            });
        }
    };
    return (
        <Formik
            initialValues={{ formEmail: "", formPassword: "", formFirstName: '', formLastName: '', formConfirmPassword: '', formPhoneNumber: '' }}
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
                    <div className="register-background">
                        <div className="container">
                            <div className="row py-4 my-4 align-items-center">
                                <div className="col-md-5 pr-lg-5 mb-5 mb-md-0" />
                                <div className="col-md-7 col-lg-6 ml-auto border text-center p-4">
                                    <div className="row justify-content-center login-content">
                                        <div className="py-4 register-title">
                                            <h1>Crea una cuenta</h1>
                                        </div>
                                        <Form onSubmit={handleSubmit} className='p-lg-4'>
                                            {console.log('<VALUES>: ', values)}
                                            <div className="row">
                                                <div className="firstName col-lg-6 mb-6 mx-auto">
                                                    <Form.Group controlId="formFirstName">
                                                        <Form.Control
                                                            type="text"
                                                            name="formFirstName"
                                                            placeholder="Ingrese su Nombre"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.formFirstName}
                                                            className={touched.formFirstName && errors.formFirstName ? "error" : null}
                                                        />
                                                        <Form.Text className="text-muted">
                                                            {touched.formFirstName && errors.formFirstName ? (
                                                                <div className="error-message">{errors.formFirstName}</div>
                                                            ) : null}
                                                        </Form.Text>
                                                    </Form.Group>
                                                </div>
                                                <div className="lastName col-lg-6 mb-6">
                                                    <Form.Group controlId="formLastName">
                                                        <Form.Control
                                                            type="text"
                                                            name="formLastName"
                                                            placeholder="Ingrese su Apellido"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.formLastName}
                                                            className={touched.formLastName && errors.formLastName ? "error" : null}
                                                        />
                                                        <Form.Text className="text-muted">
                                                            {touched.formLastName && errors.formLastName ? (
                                                                <div className="error-message">{errors.formLastName}</div>
                                                            ) : null}
                                                        </Form.Text>
                                                    </Form.Group>
                                                </div>
                                                <div className="email col-lg-12 mb-4">
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
                                                </div>
                                                <div className="col-lg-12 mb-4">
                                                    <Form.Group controlId="formPhoneNumber">
                                                        {/* <select
                                                            //className="custom-select form-control bg-white border-left-0 border-md h-100 font-weight-bold text-muted"
                                                            name="codeNumber"
                                                            value={values.color}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            style={{ display: 'block' }}
                                                            
                                                        >
                                                            <option value="">+56</option>
                                                            <option value="">+22</option>
                                                            <option value="">+44</option>
                                                            <option value="">+58</option>
                                                        </select> */}
                                                        <Form.Control
                                                            type="text"
                                                            name="formPhoneNumber"
                                                            placeholder="+56-9999999"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.formPhoneNumber}
                                                            className={touched.formPhoneNumber && errors.formPhoneNumber ? "error" : null}
                                                        />
                                                        <Form.Text className="text-muted">
                                                            {touched.formPhoneNumber && errors.formPhoneNumber ? (
                                                                <div className="error-message">{errors.formPhoneNumber}</div>
                                                            ) : null}
                                                        </Form.Text>
                                                    </Form.Group>
                                                </div>
                                                <div className="input-group col-lg-6 mb-4 mx-auto">
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
                                                </div>
                                                <div className="input-group col-lg-6 mb-4 mx-auto">
                                                    <Form.Group controlId="formConfirmPassword">
                                                        <Form.Control
                                                            type="password"
                                                            name="formConfirmPassword"
                                                            placeholder="Confirme Contraseña"
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            value={values.formConfirmPassword}
                                                            className={touched.formConfirmPassword && errors.formConfirmPassword ? "error" : null}
                                                        />
                                                        <Form.Text className="text-muted">
                                                            {touched.formConfirmPassword && errors.formConfirmPassword ? (
                                                                <div className="error-message">{errors.formConfirmPassword}</div>
                                                            ) : null}
                                                        </Form.Text>
                                                    </Form.Group>
                                                </div>
                                                    <div className="form-group col-lg-12 mx-auto mb-0">
                                                        <Button
                                                            className="btn btn-info center-button"
                                                            type="submit"
                                                            disabled={isSubmitting}>
                                                            <span className="font-weight-bold">Crea tu cuenta</span>
										                </Button>
                                                    </div>
                                                    <div className="form-group col-lg-12 mx-auto d-flex align-items-center my-4">
                                                        <div className="border-bottom w-100 ml-5" />
                                                        <span className="px-2 small text-muted font-weight-bold text-muted">O</span>
                                                        <div className="border-bottom w-100 mr-5" />
                                                    </div>
                                                    <div className="form-group col-lg-12 mx-auto">
                                                        <a href="#" className="btn btn-info btn-block py-2 btn-facebook">
                                                            <i className="fa fa-facebook-f mr-2" />
                                                            <span className="font-weight-bold">Continuar con Facebook</span>
                                                        </a>
                                                    </div>
                                                    <div className="form-group col-lg-12 mx-auto">
                                                        <a href="#" className="btn btn-info btn-block py-2 btn-facebook">
                                                            <i className="fa fa-facebook-f mr-2" />
                                                            <span className="font-weight-bold">Continuar con Google</span>
                                                        </a>
                                                    </div>

                                                    <div className="text-center w-100 mb-5">
                                                        <p className="text-muted font-weight-bold">
                                                            ¿Ya tienes cuenta?{" "}
                                                            <Link to="/login">
                                                                <a href="#" className="text-info ml-2 mb-5">
                                                                    Ingresa
											                    </a>
                                                            </Link>
                                                        </p>
                                                        <Link to="/">
                                                            <span className="btn btn-outline-info" href="#" role="button">
                                                                Regresa
									                	    </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            
                                        </Form>
                                    </div>
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
                    </div >
                )
            }
        </Formik >
    );
};
// export default LoginPage;
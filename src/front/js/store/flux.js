import emailjs from "emailjs-com";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: null,
			isLogged: false,
			appointment: null,
			appointments: [],
			dataEspecialities: null,
			listTimesAvailable: []
		},
		actions: {
			getToken: () => {
				const tokenLocal = localStorage.getItem("token");
				const userLocal = JSON.parse(localStorage.getItem("user"));
				setStore({
					user: {
						token: tokenLocal,
						user: userLocal
					}
				});
				console.log("-->", tokenLocal);
				console.log("-->", JSON.stringify(userLocal));
			},

			setLogin: async user => {
				const response = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					body: JSON.stringify(user),
					headers: { "Content-type": "application/json; charset=UTF-8" }
				});

				if (response.ok) {
					const json = await response.json();
					setStore({ user: json, isLogged: true });
					if (typeof Storage !== "undefined") {
						localStorage.setItem("token", json.token);
						localStorage.setItem("user", JSON.stringify(json.user));
					}
					return response;
				} else {
					await setStore({ user: null, isLogged: false });
					return response;
				}
			},

			logout: async () => {
				await setStore({ user: null, isLogged: false });
				return true;
			},

			setRegister: async request => {
				const response = await fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					body: JSON.stringify(request),
					headers: { "Content-type": "application/json; charset=UTF-8" }
				});

				if (response.ok) {
					const json = await response.json();
					return true;
				} else {
					return false;
				}
			},

			createNewAppointment: async request => {
				const settings = {
					method: "POST",
					headers: { "Content-type": "application/json; charset=UTF-8" },
					body: JSON.stringify(request)
				};
				const response = await fetch(process.env.BACKEND_URL + "/api/reservar", settings);
				return response;
			},

			deleteAppointment: async request => {
				const settings = {
					method: "DELETE",
					headers: { "Content-type": "application/json; charset=UTF-8" },
					body: JSON.stringify(request)
				};
				const response = await fetch(process.env.BACKEND_URL + "/api/reservar", settings);
			},

			editAppointment: async request => {
				const settings = {
					method: "PUT",
					headers: { "Content-type": "application/json; charset=UTF-8" },
					body: JSON.stringify(request)
				};
				const response = await fetch(process.env.BACKEND_URL + "/api/reservar", settings);
			},

			getAppointment: async id => {
				const settings = {
					method: "GET",
					headers: { "Content-type": "application/json; charset=UTF-8" },
					body: JSON.stringify(id)
				};
				const response = await fetch(process.env.BACKEND_URL + "/api/reservar", settings);
				const json = await response.json();
				setStore({ appointment: json });
			},

			getDataEspecialities: async () => {
				const settings = {
					method: "GET",
					headers: { "Content-type": "application/json; charset=UTF-8" }
				};
				const response = await fetch(process.env.BACKEND_URL + "/api/data-especialities", settings);
				const json = await response.json();
				setStore({ dataEspecialities: json });
			},
			getAvailableTimes: async request => {
				const settings = {
					method: "POST",
					headers: { "Content-type": "application/json; charset=UTF-8" },
					body: JSON.stringify(request)
				};
				const response = await fetch(process.env.BACKEND_URL + "/api/available-times", settings);
				const json = await response.json();
				setStore({ listTimesAvailable: json });
			},
			validation: email => {
				console.log(email);
				const token = 10000 + Math.floor(Math.random() * 90000);
				fetch(process.env.BACKEND_URL + "/api/validation", {
					method: "POST",
					body: JSON.stringify({
						email: email,
						tokenNumber: token
					}),
					headers: {
						"Content-Type": "applications/json"
					}
				})
					.then(resp => resp.json())
					.then(data => {
						console.log("funciono");
						if (data.msg == "Token Modificado") {
							emailjs.send(
								"service_2q632pb",
								"template_nqaa20u",
								{
									from_name: "Pets Vets",
									to_name: data.name,
									to_email: email,
									token: "https://3000-scarlet-gull-2w9qy4tl.ws-us03.gitpod.io/recuperar/" + token
								},
								"user_IuDqaG8dsQC4o3uUIoCvU"
							);
						}
					});
			},
			resetPassword: (pass, token) => {
				fetch(process.env.BACKEND_URL + "/api/reset-pass", {
					method: "POST",
					body: JSON.stringify({
						password: pass,
						tokenNumber: token
					}),
					headers: { "Content-type": "application/json" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log(data);
					});
			}
		}
	};
};

export default getState;

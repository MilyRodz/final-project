// const URL = process.env.BACKEND_URL;
const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: null,
			isLogged: false,
			appointment: null,
			appointments: []
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
					setStore({ user: null, isLogged: false });
				}
			},

			logout: async () => {
				await setStore({ user: null, isLogged: false });
				return true;
			},

			setRegister: async (request, history) => {
				fetch(process.env.BACKEND_URL + "/api/register", {
					method: "POST",
					body: JSON.stringify(request),
					headers: { "Content-type": "application/json; charset=UTF-8" }
				})
					.then(resp => resp.json())
					.then(data => {
						console.log("--data--", data);
						alert("Registro Exitoso");
						history.push("/login");
					})
					.catch(error => console.log("Error loading message from backend", error));
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
			}
		}
	};
};

export default getState;

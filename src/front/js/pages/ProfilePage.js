import React from "react";
import { useParams } from "react-router-dom";

export const PorfilePage = () => {
	const { username } = useParams();
	return (
		<div className="container">
			<h1>Prueba Perfil: {username}</h1>
		</div>
	);
};
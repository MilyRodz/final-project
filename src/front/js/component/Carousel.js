import React from "react";
import dogImg1 from "../../img/blog-title-pic.jpeg";
import dogImg2 from "../../img/portada-perro-t.jpeg";
import dogImg3 from "../../img/washing-your-dog1.jpeg";
import dogImg4 from "../../img/dog5.jpeg";

export const Carousel = () => {
	return (
		<div className="carousel slide" data-ride="carousel" id="myCarousel">
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img className="img-fluid" src={dogImg4} width="600" height="700" />
				</div>
				<div className="carousel-item">
					<img className="img-fluid" src={dogImg2} alt="Chicago" width="600" height="700" />
				</div>
				<div className="carousel-item">
					<img className="img-fluid" src={dogImg1} alt="New York" width="600" height="700" />
				</div>
			</div>
		</div>
	);
};

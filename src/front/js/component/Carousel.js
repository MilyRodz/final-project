import React from "react";
import dogImg1 from "../../img/blog-title-pic.jpeg";
import dogImg2 from "../../img/portada-perro-t.jpeg";
import dogImg4 from "../../img/dog5.jpeg";

export const Carousel = () => {
	return (
		<div className="carousel slide" data-ride="carousel" id="myCarousel">
			<div className="carousel-inner">
				<div className="carousel-item active">
					<img className="img-fluid" src={dogImg4} alt="dog3" style={{ width: 900, height: 400 }} />
				</div>
				<div className="carousel-item">
					<img className="img-fluid" src={dogImg2} alt="dog1" style={{ width: 900, height: 400 }} />
				</div>
				<div className="carousel-item">
					<img className="img-fluid" src={dogImg1} alt="dog2" style={{ width: 900, height: 400 }} />
				</div>
			</div>
			<a className="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
				<span className="carousel-control-prev-icon" aria-hidden="true" />
				<span className="sr-only">Previous</span>
			</a>
			<a className="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
				<span className="carousel-control-next-icon" />
				<span className="sr-only">Previous</span>
			</a>
		</div>
	);
};

window.onload = function(){
	let stage = document.getElementById('stage');
	let ctx = stage.getContext('2d');

	setInterval(game, 60); // atualiza o cenário a cada 60 milesegundos, executando a função game

	let vel = 1; // velocidade geral
	
	let vx = 0; // velocidade x
	let vy = 0; // velocidade y
	
	let px = 10; // ponto de inicio x
	let py = 15; // ponto de inicio y

	// formação das peças do cenário, que será dividio por quadrados
	let tp = 20; // tamanho da peça 
	let qp = 20; // quantidade de peças

	let ax = 15; // posição inicial da maça x
	let ay = 15; // posição inicial da maça y

	let trail = []; // array onde será armazenado o rastro da cobra
	tail = 5;

	function game(){
		px += vx;
		py += vy;

		if (px < 0) {
			px = qp - 1;
		} else if (px > qp - 1) {
			px = 0;
		} else if (py < 0) {
			py = qp -1;
		} else if (py > qp - 1) {
			py = 0;
		}

		ctx.fillStyle = 'black'; //define a cor do cenário como black = preta.
		ctx.fillRect(0, 0, stage.width, stage.height); //define que o cénario iniciará nos pontos 0, e que a largura e altura será do tamnaho do width e weight definidos no html
		
		ctx.fillStyle = 'red';
		ctx.fillRect(ax * tp, ay * tp, tp, tp);

		ctx.fillStyle = 'gray';
		for (let index = 0; index < trail.length; index++) {
			ctx.fillRect(trail[index].x * tp, trail[index].y * tp, tp - 1, tp - 1);
			
			if (trail[index].x == px && trail[index].y == py) {
				vx = 0;
				vy = 0;
				tail = 5;
			}
		}

		trail.push({x:px, y:py})
		while (trail.length > tail) {
			trail.shift();
		}

		if (ax == px && ay == py) {
			tail++;
			ax = Math.floor(Math.random() * qp);
			ay = Math.floor(Math.random() * qp);
		}

		document.addEventListener('keydown', (event) => { //evento que escuta quando uma tecla é pressionada
			switch (event.key) {
				case 'ArrowLeft': //left
					vx = -vel;
					vy = 0;
				break;
				case 'ArrowUp': //up
					vx = 0;
					vy = -vel;
				break;
				case 'ArrowRight': //right
					vx = vel;
					vy = 0;
				break;
				case 'ArrowDown': //down
					vx = 0;
					vy = vel;
				break;
				default:
				break;

			}
		});
	}
}
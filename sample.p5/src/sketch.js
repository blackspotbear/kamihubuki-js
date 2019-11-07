const p5 = require("p5");
const kh = require("kamihubuki-js");

const sketch = p => {
	const canvasWidth = 640;
	const canvasHeight = 480;
	let confetties = [];

	const createConfetti = (x, y) => {
		const vx = 0;
		const vy = 200;
		const angle = Math.PI * p.random(Math.PI);
		const fins = [
			{
				angle: p.random(-Math.PI / 2, Math.PI / 2),
				size: 30,
				armAngle: 0,
				armLength: 1
			},
			{
				angle: p.random(-Math.PI / 2, Math.PI / 2),
				size: 30,
				armAngle: p.random(Math.PI / 2, Math.PI),
				armLength: 1
			}
		];

		const co = new kh.Confetti({
			x: x, y: y,
			vx: vx, vy: vy,
			angle: angle,
			fins: fins,
			av: 0,
			M: 0.5,
			K: 0.02,
			I: 3,
			RD: 0.99
		});

		return {
			co: co,
			color: p.color(p.random(255), p.random(255), p.random(255))
		};
	};

	p.setup = () => {
		p.frameRate(30);
		p.resizeCanvas(canvasWidth, canvasHeight);
	};

	p.draw = () => {
		for (let i = 0; i < 2; i++) {
			confetties.push(createConfetti(p.random(0, canvasWidth), p.random(-64, 0)));
		}

		confetties = confetties.filter(confetti => {
			const co = confetti.co;
			co.update(1 / p.getFrameRate(), 0, 0, 0, 200);
			return co.x >= 0 && co.x <= canvasWidth && co.y <= canvasHeight;
		});

		p.background(0xBB, 0xBB, 0xFF);

		confetties.forEach(confetti => {
			const co = confetti.co;
			p.push();
			p.translate(co.x, co.y);
			p.rotate(co.angle);
			p.fill(confetti.color);
			p.rect(-10, -5, 20, 10);
			p.pop();
		});
	};
};

new p5(sketch);

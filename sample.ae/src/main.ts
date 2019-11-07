import * as kh from "kamihubuki-js";

let windX = 0;
let windY = 0;
const colors = [
	"blue",    "navy",  "teal",   "green",
	"lime",    "aqua",  "yellow", "red",
	"fuchsia", "olive", "purple", "maroon"
];
let colorIndex = 0;

function createConfetti(x: number, y: number): kh.Confetti {
	const vx = 0;
	const vy = 200;
	const angle = g.game.random.get(0, 100) / 100 * Math.PI;

	const fins: kh.Fin[] = [
		{
			angle: g.game.random.get(-100, 100) / 100 * (Math.PI / 2),
			size: 30,
			armAngle: 0,
			armLength: 1
		},
		{
			angle: g.game.random.get(-100, 100) / 100 * (Math.PI / 2),
			size: 30,
			armAngle: g.game.random.get(50, 100) / 100 * Math.PI,
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

	return co;
}

function createConfettiEntity(scene: g.Scene, co: kh.Confetti, noCollision: boolean): g.E {
	const w = 20;
	const h = 10;
	const w2 = w / 2;
	const h2 = h / 2;

	const rect = new g.FilledRect({
		scene: scene,
		width: w,
		height: h,
		x: co.x - w2,
		y: co.y - h2,
		cssColor: colors[colorIndex]
	});

	colorIndex = (colorIndex + 1) % colors.length;

	rect.update.add(() => {
		co.update(1 / g.game.fps, windX, windY, 0, 200);

		// collision detection and resolution.
		if (noCollision) {
			if (co.x < 0 || co.x > g.game.width || co.y > g.game.height) {
				rect.destroy();
			}
		} else {
			const k = 0.5;
			if (co.x < 0) {
				co.x = 0;
				co.vx = Math.abs(co.vx) * k;
			} else if (co.x > g.game.width) {
				co.x = g.game.width;
				co.vx = -Math.abs(co.vx) * k;
			}
			if (co.y < -g.game.height) {
				co.y = -g.game.height;
				co.vy = 0;
			} else if (co.y > g.game.height) {
				co.y = g.game.height;
				co.vy = -Math.abs(co.vy) * k;
			}
		}

		rect.x = co.x - w2;
		rect.y = co.y - h2;
		rect.angle = -co.angle / Math.PI * 180;
		rect.modified();
	});

	return rect;
}

function main(param: g.GameMainParameterObject): void {
	const scene = new g.Scene({game: g.game});

	scene.loaded.add(() => {

		const floor = new g.FilledRect({
			scene: scene,
			width: g.game.width,
			height: 4,
			x: 0,
			y: g.game.height - 4,
			cssColor: "green"
		});

		let pointDownCaptureCntr = 0;
		let pointDown = false;
		let mouseX = 0;
		let mouseY = 0;
		scene.pointDownCapture.add(ev => {
			if (ev.target) {
				return;
			}
			pointDown = true;
			mouseX = ev.point.x;
			mouseY = ev.point.y;
		});
		scene.pointUpCapture.add(ev => pointDown = false);
		scene.pointMoveCapture.add(ev => {
			mouseX = ev.point.x + ev.startDelta.x;
			mouseY = ev.point.y + ev.startDelta.y;
		});

		scene.update.add(() => {
			pointDownCaptureCntr++;

			if (! pointDown) {
				return;
			}

			if (pointDownCaptureCntr % 3 !== 0) {
				return;
			}

			const co = createConfetti(mouseX, mouseY);
			const confettiEntity = createConfettiEntity(scene, co, false);
			scene.append(confettiEntity);
		});

		const fanButton = new g.FilledRect({
			scene: scene,
			x: 8,
			y: g.game.height - 8 - 32,
			width: 32,
			height: 32,
			cssColor: "blue",
			touchable: true
		});

		const fanAngle = Math.PI / 2 * 1;
		const fanForce = -2000;
		let fanButtonPressed = false;
		fanButton.pointDown.add(() => {
			fanButtonPressed = true;
			windX = fanForce * Math.cos(fanAngle);
			windY = fanForce * Math.sin(fanAngle);
		});
		fanButton.pointUp.add(() => {
			fanButtonPressed = false;
			windX = 0;
			windY = 0;
		});

		fanButton.update.add(() => {
			if (fanButtonPressed) {
				fanButton.angle += -30;
				fanButton.modified();
			}
		});

		scene.append(floor);
		scene.append(fanButton);
	});

	g.game.pushScene(scene);
}

export = main;

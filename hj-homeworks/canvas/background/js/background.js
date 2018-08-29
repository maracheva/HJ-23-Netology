'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// Функция времени выбирается при создании объекта и не должна меняться в дальнейшем при анимации.
const timeFunctions = [
	function (x, y, time) {
		return {
			x: x + Math.sin((50 + x + (time / 10)) / 100) * 3,
			y: y + Math.sin((45 + x + (time / 10)) / 100) * 4
		};
	},
	function (x, y, time) {
		return {
			x: x + Math.sin((x + (time / 10)) / 100) * 5,
			y: y + Math.sin((10 + x + (time / 10)) / 100) * 2
		}
	}
];
// фоном будет пустой массив
let figures = [];
// функция случайных чисел
function random(min, max) {
	return Math.random() * (max - min) + min;
}

function randomRound(min, max) {
	return Math.round(random(min, max));
}

// Параметры объектов
class Figure {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = random(0.1, 0.6); // относительный размер size, случайное число от 0.1 до 0.6
		this.border = 5 * this.size; // толщина белой обводки
		this.motion = timeFunctions[randomRound(0, timeFunctions.length - 1)]; 
	}
}
// Окружность
class Circle extends Figure {
	constructor(x, y) {
		super(x, y);
		this.radius = 12 * this.size; // Радиус круга. Окружность закрашивать не нужно.
	}
}
// Крестик
class Cross extends Figure {
	constructor(x, y) {
		super(x, y);
		this.side = 20 * this.size; // Сторона крестика
		this.angle = random(0, 360); // угол поворота
		this.speedCross = random(-0.2, 0.2); // скорость поворота крестика в диапазоне -0.2 до 0.2 на тик (один этап перерисовки).

	}
}

function createFigures(amountFrom, amountTo) {
	for (let i = 0; i < randomRound(amountFrom, amountTo); i++) {
		figures.push(
			new Cross(randomRound(0, canvas.width), randomRound(0, canvas.height))
		);
	}

	for (let i = 0; i < randomRound(amountFrom, amountTo); i++) {
		figures.push(
			new Circle(randomRound(0, canvas.width), randomRound(0, canvas.height))
		);
	}
}
// рисуем крестик
function drawCross(cross) {
	const rad = cross.angle * Math.PI / 180;
	const halfSide = cross.side / 2;
	let {x, y} = cross.motion(cross.x, cross.y, Date.now());

	ctx.translate(x, y);
	ctx.rotate(rad);

	ctx.lineWidth = cross.border;
	ctx.strokeStyle = '#ffffff';
	ctx.beginPath();
	ctx.moveTo(0 - halfSide, 0);
	ctx.lineTo(0 + halfSide, 0);
	ctx.stroke();

	ctx.beginPath();
	ctx.moveTo(0, 0 - halfSide);
	ctx.lineTo(0, 0 + halfSide);
	ctx.stroke();

	ctx.rotate(-rad);
	ctx.translate(-x, -y);

	cross.angle += cross.speedCross;
}
// рисуем круг
function drawCircle(circle) {
	let {x, y} = circle.motion(circle.x, circle.y, Date.now());

	ctx.lineWidth = circle.border;
	ctx.strokeStyle = '#ffffff';
	ctx.beginPath();
	ctx.arc(x, y, circle.radius, 0, 2*Math.PI, false);
	ctx.stroke();
}


function tick() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	figures.forEach(figure => {
		if (figure instanceof Cross) {
			drawCross(figure);

		} else {
			drawCircle(figure);
		}
	});
}

createFigures(80, 150);
setInterval(tick, 1000 / 20); // Фон должен перерисовываться со скоростью 20 кадров в секунду.
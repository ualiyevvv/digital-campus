import {Point} from "../geometry";
import {add, subtract} from "../utils";

export class Viewport {

    ZOOM_FACTOR = 1.1
    constructor(canvas, isAnimated = true) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')

        this.width = canvas.width
        this.height = canvas.height

        this.center = {
            x: this.width / 2,
            y: this.height / 2
        }

        this.minZoom = 0.1
        this.maxZoom = 2
        this.state = this.#loadViewportState() || {
            zoom: 1,
            offset: new Point(0, 0),
            rotate: 0 // В градусах
        };

        this.pan = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            isActive: false,
        };

        this.rotateCoff = {
            isRotate: false,
            start: 0,
            end: 0,
        };

        this.isAnimated = isAnimated

        this.inertia = {
            isActive: false,
            velocity: new Point(0, 0),
            friction: 0.975 // Коэффициент трения, регулирующий замедление
        };

        this.zoomInertia = {
            isActive: false,
            velocity: 0, // Скорость изменения масштаба
            friction: 0.975, // Коэффициент трения для замедления
        };

        this.animation = {
            isActive: false,
            start: null,
            duration: 1000, // Длительность анимации в миллисекундах
            fromZoom: null,
            toZoom: null,
            fromOffset: null,
            toOffset: null,
        };

        this.rawOffset = null
        // this.lerpSteps=150;
        // this.lerpStep=this.lerpSteps;
        // this.zoomLerpSteps=150;
        // this.zoomLerpStep=this.zoomLerpSteps;
    }

    reset() {
        // console.log('reset', this.width, this.height)
        this.ctx.restore();
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.save();

        this.ctx.translate(this.center.x, this.center.y)
        this.ctx.scale(1 / this.state.zoom, 1 / this.state.zoom)

        this.ctx.rotate(this.state.rotate);
        const offset = this.getOffset()
        this.ctx.translate(offset.x, offset.y)
    }

    getOffset() {
        return add(this.state.offset, this.pan.offset)
    }

    setView(center, zoom, pan, rotate) {

    }

    _limitZoom(zoom) {
        return Math.max(this.minZoom, Math.min(this.maxZoom, zoom));
    }

    screenToWorld(e, subtractDragOffset = false) {
        // Переводим клиентские координаты в координаты относительно канваса
        const canvasX = e.clientX - this.canvas.offsetLeft;
        const canvasY = e.clientY - this.canvas.offsetTop;

        // Сдвигаем координаты так, чтобы центр вьюпорта был в (0, 0)
        let x = (canvasX - this.center.x);
        let y = (canvasY - this.center.y);

        const rotatedPan = this.calculateRotatedPan({x, y})

        // Возвращаем координаты на их исходное место и применяем масштабирование и смещение
        let worldX = (rotatedPan.x * this.state.zoom) - this.state.offset.x;
        let worldY = (rotatedPan.y * this.state.zoom) - this.state.offset.y;

        // Создаем новую точку с учетом смещения панорамирования, если это необходимо
        const p = new Point(
            Number(worldX.toFixed(1)),
            Number(worldY.toFixed(1))
        );

        return subtractDragOffset ? subtract(p, this.pan.offset) : p;
    }

    worldToScreen(point) {
        // Добавляем обратное смещение мира и применяем обратное масштабирование
        let canvasX = (point.x + this.state.offset.x) / this.state.zoom;
        let canvasY = (point.y + this.state.offset.y) / this.state.zoom;

        // Применяем обратный поворот
        const unrotatedPan = this.calculateRotatedPan({x: canvasX, y: canvasY}, true);

        // Корректируем координаты с учетом центра вьюпорта
        canvasX = unrotatedPan.x + this.center.x;
        canvasY = unrotatedPan.y + this.center.y;

        // Переводим координаты в систему координат канваса
        const screenX = canvasX + this.canvas.offsetLeft;
        const screenY = canvasY + this.canvas.offsetTop;


        // return { x: Number(screenX.toFixed(1)), y: Number(screenY.toFixed(1)) };
        return { x: screenX, y: screenY };
    }

    // Масштабирование
    zoom(coefficient) {
        // this.state.zoom *= zoomFactor;
        let zoomDelta;
        if (coefficient < 0) {
            zoomDelta = this.ZOOM_FACTOR;
            // this.lastZoomAction = 'zoomed in';
        } else {
            zoomDelta = 1 / this.ZOOM_FACTOR;
            // this.lastZoomAction = 'zoomed out';
        }


        if (this.isAnimated) {
            // Непосредственное применение зума изменено для использования скорости
            this.zoomInertia.velocity = (zoomDelta - 1) * 0.5; // Начальная скорость зума
            this.zoomInertia.isActive = true; // Активируем инерцию зума
            this.applyZoomInertia(); // Начинаем применение инерции зума
        } else {
            const newZoom = this.state.zoom * zoomDelta;
            this.state.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));
            this.#saveViewportState()
        }
    }

    setZoom(delta) {

    }

    zoomIn(steps=20) {
        this.setZoom(1,steps)
    }

    zoomOut(steps=20) {
        this.setZoom(this.maxZoom,steps)
    }

    applyZoomInertia() {
        // console.log('zoom inertia')
        if (!this.zoomInertia.isActive) return;

        // Применяем скорость инерции к текущему смещению
        const newZoom = this.state.zoom + this.zoomInertia.velocity / 3

        this.state.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, newZoom));

        // Замедляем инерцию
        this.zoomInertia.velocity *= this.zoomInertia.friction;

        // Проверяем, достаточно ли замедлилась инерция для остановки
        if (Math.abs(this.zoomInertia.velocity) < 0.001) {
            this.zoomInertia.isActive = false;
            this.#saveViewportState()
            return;
        }

        requestAnimationFrame(this.applyZoomInertia.bind(this));

    }
    // Панорамирование
    // panning(dx, dy) {
    //     this.state.offset.x += dx;
    //     this.state.offset.y += dy;
    // }

    startPan(mouse) {
        this.pan.isActive = true;
        this.pan.start = mouse
    }

    panning(mouse) {
        this.pan.end = mouse
        // this.pan.offset = subtract(this.pan.end, this.pan.start)

        // Расчет исходного смещения панорамирования
        this.rawOffset = subtract(this.pan.end, this.pan.start);

        this.pan.offset.x = this.rawOffset.x;
        this.pan.offset.y = this.rawOffset.y;

        this.state.offset = add(this.state.offset, this.pan.offset)
    }

    applyInertia() {
        // console.log('inertia')
        if (!this.inertia.isActive) return;

        // Применяем скорость инерции к текущему смещению
        this.state.offset = add(this.state.offset, this.inertia.velocity);
        // this.pan.offset = this.inertia.velocity;

        // Замедляем инерцию
        this.inertia.velocity.x *= this.inertia.friction;
        this.inertia.velocity.y *= this.inertia.friction;

        // Проверяем, достаточно ли замедлилась инерция для остановки
        if (Math.abs(this.inertia.velocity.x) < 0.0001 && Math.abs(this.inertia.velocity.y) < 0.0001) {
            this.inertia.isActive = false;
            this.#saveViewportState()
            return;
        }

        requestAnimationFrame(this.applyInertia.bind(this));

    }

    stopPanning() {
        this.inertia.velocity.x = this.pan.offset.x / 25
        this.inertia.velocity.y = this.pan.offset.y / 25

        this.pan = {
            start: new Point(0, 0),
            end: new Point(0, 0),
            offset: new Point(0, 0),
            isActive: false,
        };

        if (this.isAnimated) {
            // Инициируем инерцию после остановки панорамирования
            this.inertia.isActive = true;
            this.applyInertia();
        } else {
            this.#saveViewportState()
        }

    }

    stopInertia() {
        // this.inertia.velocity = new Point(0, 0);
        this.inertia.isActive = false;
        // if (this.inertiaAnimationId) {
        //     cancelAnimationFrame(this.inertiaAnimationId);
        //     this.inertiaAnimationId = null; // Сбрасываем идентификатор анимации
        // }
        // this.pan.offset = new Point(0, 0);
        // this.velocity = new Point(0, 0); // Обнуляем скорость
    }

    rotate(angle) {
        this.state.rotate += (angle * Math.PI / 180);
        // console.log('ANGLE',angle * Math.PI / 180)
        this.#saveViewportState()
    }

    // Функция для расчета новых значений панорамирования с учетом угла поворота
    calculateRotatedPan(point, reverse = false) {
        // Преобразуем угол поворота из градусов в радианы, если он хранится в градусах.
        // const angleInRadians = this.state.rotate * Math.PI / 180;

        const angleRadians = reverse ? this.state.rotate : -this.state.rotate; // Угол поворота уже должен быть в радианах
        const rotatedPanX = point.x * Math.cos(angleRadians) - point.y * Math.sin(angleRadians);
        const rotatedPanY = point.x * Math.sin(angleRadians) + point.y * Math.cos(angleRadians);
        return { x: rotatedPanX, y: rotatedPanY };
    }

    // нужно как то обернуть флай ту чтобы не вызывать его, а добавить метод setView и уже оттуда смотреть  типа такого
    flyTo(targetOffset, targetZoom) {
        if (!this.isAnimated) return;

        // Инициализация анимации
        this.animation.isActive = true;
        this.animation.start = Date.now();
        this.animation.fromZoom = this.state.zoom;
        this.animation.toZoom = targetZoom;
        this.animation.fromOffset = { ...this.state.offset };
        this.animation.toOffset = { ...targetOffset };

        // this.animation.toOffset.midZoom = this.calculateMidZoom(this.state.zoom, targetOffset)

        requestAnimationFrame(this.animateToTarget.bind(this));
    }

    animateToTarget() {
        if (!this.animation.isActive) return;

        const elapsedTime = Date.now() - this.animation.start;
        const progress = Math.min(elapsedTime / this.animation.duration, 1); // Прогресс от 0 до 1

        // Использование функции плавности для более плавного перехода
        const ease = this.easeInOutCubic(progress);

        // Расчет текущего масштаба в зависимости от прогресса анимации
        // if (progress <= 0.5) {
        //     // Первая половина анимации (zoom out)
        //     this.state.zoom = this.animation.fromZoom + (this.animation.midZoom - this.animation.fromZoom) * (ease * 2);
        // } else {
        //     // Вторая половина анимации (zoom in)
        //     this.state.zoom = this.animation.midZoom + (this.animation.toZoom - this.animation.midZoom) * ((ease - 0.5) * 2);
        // }

        // Плавно изменяем масштаб
        this.state.zoom = this.animation.fromZoom + (this.animation.toZoom - this.animation.fromZoom) * ease;

        // Плавно изменяем смещение
        this.state.offset.x = this.animation.fromOffset.x + (this.animation.toOffset.x - this.animation.fromOffset.x) * ease;
        this.state.offset.y = this.animation.fromOffset.y + (this.animation.toOffset.y - this.animation.fromOffset.y) * ease;

        if (progress < 1) {
            requestAnimationFrame(this.animateToTarget.bind(this));
        } else {
            this.animation.isActive = false;
        }
    }

    calculateMidZoom(fromZoom, toZoom) {
        // Определение промежуточного значения масштаба
        // Это может быть просто среднее значение, или можно ввести логику для определения оптимального "отскока"
        let midZoom = Math.min(fromZoom, toZoom) * 0.9; // Пример уменьшения масштаба на 10% для эффекта отскока
        return midZoom;
    }

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    #saveViewportState() {
        localStorage.setItem('viewport', JSON.stringify(this.state))
    }

    #loadViewportState() {
        return JSON.parse(localStorage.getItem('viewport'))
    }

}
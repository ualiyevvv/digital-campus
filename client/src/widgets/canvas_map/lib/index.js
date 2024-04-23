// import {Map} from "./map";
//
// const myCanvas = document.getElementById('myCanvas')
// myCanvas.width = window.innerWidth
// myCanvas.height = window.innerHeight
//
// const map = new Map(myCanvas)
// map.init()
//
//
//
// const controlsDiv = document.getElementById('controls')
//
// // Создаем кнопку save и добавляем ее в элемент DIV
// const saveButton = document.createElement('button');
// saveButton.innerText = 'Save';
// saveButton.addEventListener('click', map.world.save.bind(map.world));
// // saveButton.addEventListener('click', e => {
// //     // console.log(map.world.layers)
// //     map.world.save()
// // });
// controlsDiv.appendChild(saveButton);
//
// // Создаем кнопку save и добавляем ее в элемент DIV
// const graphEditorButton = document.createElement('button');
// graphEditorButton.innerText = 'Edit';
//
// if (map.editor.enabled()) {
//     graphEditorButton.classList.add('button-active')
// } else {
//     graphEditorButton.classList.remove('button-active')
// }
// graphEditorButton.addEventListener('click', e => {
//     if (graphEditorButton.classList.contains('button-active')) {
//         graphEditorButton.classList.remove('button-active')
//         map.editor.disable()
//     } else {
//         graphEditorButton.classList.add('button-active')
//         map.editor.enable('edit')
//     }
//
// });
// controlsDiv.appendChild(graphEditorButton);
//
//
//
//
// // Создаем кнопку save и добавляем ее в элемент DIV
// const graphDrawButton = document.createElement('button');
// graphDrawButton.innerText = 'Draw';
//
// // вообще я должен быть подписан на событие которое включает выключает редактор, чтобы это было реактивно
// // чтобы создать некое узкое горлышко, чтобы сохранить идемпотентость
// // так ли называется event sourcing? событийно-ориентированная архитектура
// if (map.editor.enabled()) {
//     graphDrawButton.classList.add('button-active')
// } else {
//     graphDrawButton.classList.remove('button-active')
// }
// graphDrawButton.addEventListener('click', e => {
//     if (graphDrawButton.classList.contains('button-active')) {
//         graphDrawButton.classList.remove('button-active')
//         map.editor.disable()
//     } else {
//         graphDrawButton.classList.add('button-active')
//         map.editor.enable('draw')
//     }
//
// });
// controlsDiv.appendChild(graphDrawButton);
//
//
//
//
//
// // map.startAnimation()
// // function animate() {
// //     map.render()
// //     requestAnimationFrame(animate)
// // }
// //
// // animate()
// // const world = new World()
// //
// // const layer1 = new Layer().create('Astana IT University', 'Университет информационных технологий', 'buildings')
// // const layer2 = new Layer().create('asdasdasd', 'asdasdasd', 'buildings')
// //
// // world.addLayer(layer1)
// // world.addLayer(layer2)
//
// // console.log(world.layers)
const canvas = document.getElementById("canvas");
canvas.height = 60;
canvas.width = 60;
const ctx = canvas.getContext("2d");

ctx.font = "bold 82px helvetica";
ctx.fillText("A", 0, 60);
const imageData = ctx.getImageData(0,0, 60, 60);

function Cell(x, y, size, value, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.color = color;
    this.draw = function() {
        context.fillStyle = this.color;
        context.fillRect(this.x*this.size, this.y*this.size, this.size, this.size);
    }
}

let cells = [];

for (let j = 0; j < imageData.height; j ++) {
    cells[j] = [];
    for (let i = 0; i < imageData.width; i ++) {
        const index = (j * imageData.width + i) * 4;
        cells[j][i] = new Cell(i, j, 10,0, "#202020");
        cells[j][i].value = imageData.data[index + 3] ? 1 : 0;
    }
}
console.log(cells);



// const canvas = document.getElementById("canvas");
// const ctx = canvas.getContext("2d");

// // Устанавливаем размеры канваса
// canvas.width = 200; // Пример ширины
// canvas.height = 100; // Пример высоты

// // Настройки стиля текста
// ctx.font = "30px Arial";
// ctx.fillStyle = "black";
// ctx.textAlign = "center";

// // Отрисовка текста на канвасе
// ctx.fillText("Привет!", canvas.width / 2, canvas.height / 2);

// // Получение данных изображения
// const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// // // Обработка каждого пикселя
// for (let i = 0; i < imageData.data.length; i += 4) {
//   // Получение компонентов цвета пикселя
//   let r = imageData.data[i]; // Красный
//   let g = imageData.data[i + 1]; // Зеленый
//   let b = imageData.data[i + 2]; // Синий
//   let a = imageData.data[i + 3]; // Альфа (прозрачность)

//   console.log(r, g, b, a);
// }
  // Пример обработки: инвертирование цвета
//   imageData.data[i] = 255 - r;
//   imageData.data[i + 1] = 255 - g;
//   imageData.data[i + 2] = 255 - b;
//   // Альфа-канал оставляем без изменений
// }

// // Возвращаем обработанные данные изображения на канвас
// ctx.putImageData(imageData, 0, 0);
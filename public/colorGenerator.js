export const colorGenerator = () => {
    let colors = {
        cell : randomColor(),
        noCell :  randomColor(),
        zombie : randomColor()
    }




    console.log(colors);

    return colors;
}

const randomColor = () => `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`       

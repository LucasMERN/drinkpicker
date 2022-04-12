document.querySelector('button').addEventListener('click', getDrink)

function getDrink(){
    let drink = document.querySelector('input').value

fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json())
    .then(data => {

        let drinkNames = [];
        let drinkInstruct = [];
        let drinkImage = [];
        let count = 0;

        for(let i = 0; i < data.drinks.length; i++){
            drinkNames.push(data.drinks[i].strDrink)
        }

        for(let i = 0; i < data.drinks.length; i++){
            drinkImage.push(data.drinks[i].strDrinkThumb)
        }

        for(let i = 0; i < data.drinks.length; i++){
            drinkInstruct.push(data.drinks[i].strInstructions)
        }

        document.querySelector('#prev').addEventListener('click', previous)

        function previous(){
            if(count < 0){
                count = drinkNames.length - 1
            }
            document.querySelector('h2').innerText = drinkNames[count]
            document.querySelector('img').src = drinkImage[count]
            document.querySelector('p').innerText = drinkInstruct[count]
            count--
        }

        document.querySelector('#next').addEventListener('click', next)

        function next(){
            if(count > drinkNames.length - 1){
                count = 0
            }
            document.querySelector('h2').innerText = drinkNames[count]
            document.querySelector('img').src = drinkImage[count]
            document.querySelector('p').innerText = drinkInstruct[count]
            count++
        }

        document.querySelector('h2').innerText = drinkNames[count]
        document.querySelector('img').src = drinkImage[count]
        document.querySelector('p').innerText = drinkInstruct[count]

    })

    .catch(err => {
        console.log(`error ${err}`)
    });
};
var count = 0;
var drinkObject;
window.onload = function() {
	document.querySelector('button').addEventListener('click', getDrink)

	async function getDrink(){
		let drink = document.querySelector('input').value
		let data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`).then(res => res.json()).catch(err => {
			console.log(`error ${err}`)
		});
		count = 0;
		drinkObject = data.drinks.map(drink => {
			let rObj = {
				name: drink.strDrink,
				image: drink.strDrinkThumb,
				instructions: drink.strInstructions,
			}
			return rObj;
		});
		document.querySelector('h2').innerText = drinkObject[count].name
		document.querySelector('img').src = drinkObject[count].image
		document.querySelector('p').innerText = drinkObject[count].instructions
	};

	document.getElementById('prev').addEventListener('click', previous)

	function previous(e){
		e.preventDefault();
		count--
		if (count < 0) count = drinkObject.length - 1;
		document.querySelector('h2').innerText = drinkObject[count].name
		document.querySelector('img').src = drinkObject[count].image
		document.querySelector('p').innerText = drinkObject[count].instructions
	};

	document.getElementById('next').addEventListener('click', next)

	function next(e){
		e.preventDefault();
		count++
		if (count > drinkObject.length - 1) count = 0;
		document.querySelector('h2').innerText = drinkObject[count].name
		document.querySelector('img').src = drinkObject[count].image
		document.querySelector('p').innerText = drinkObject[count].instructions
	};
};

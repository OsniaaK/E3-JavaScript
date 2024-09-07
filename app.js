const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const formSearch = document.querySelector("#askForPizza");
const inputSelector = document.querySelector("#inputSelector");
const buttonSend = document.querySelector("#sendNumber");
const containerPizza = document.querySelector("#containerPizza");

/* Helpers */

const create = (element, content, attributes) => {
  const tag = document.createElement(element);
  tag.innerHTML = content;
  Object.keys(attributes).forEach(attribute => tag.setAttribute(attribute,attributes[attribute]));
  return tag;
}

const read = (key) => JSON.parse(localStorage.getItem(key));
const save = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
  return read(key);
}

/*  */

const renderPizza = (pizza) => {
  let content = `<picture><img src="${pizza.imagen}" alt="${pizza.nombre}" /></picture>`
  content += `<aside><h1>${pizza.nombre}</h1><ul><li>$${pizza.precio}</li><li>${pizza.ingredientes.join("<br>")}</li></ul><aside>`
  const renderedPizza = create(`article`, content, {class:"cardPizza"})
  return renderedPizza;
}

let ExistPizza = read('pizza') || null;

if (ExistPizza) {
  containerPizza.innerHTML='';
  containerPizza.append(renderPizza(ExistPizza));
}

formSearch.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (inputSelector.value.trim().length == 0) {
    localStorage.removeItem('pizza')
    return containerPizza.innerHTML='<p>Selecciona un número válido</p>';
  }
  
  if (inputSelector.value > 5) {
    localStorage.removeItem('pizza')
    return containerPizza.innerHTML='<p>Selecciona un número menor a 6</p>'
  }
  
  if (inputSelector.value < 1) {
    localStorage.removeItem('pizza')
    return containerPizza.innerHTML='<p>Selecciona un número mayor a 0</p>'
  }
  containerPizza.innerHTML='';
  const findPizza = pizzas.find((pizza) => pizza.id == inputSelector.value)
  containerPizza.append(renderPizza(findPizza));
  save('pizza', findPizza);
})


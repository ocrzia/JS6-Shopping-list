// ==============================
// 🌱 Sélection des éléments
// ==============================
const shoppingItem = document.querySelector(".shopping-element");
const shoppingList = document.querySelector(".shopping-list");
const addButton = document.querySelector(".add");
const msg = document.querySelector('.message');
const itemsCount = document.querySelector('h2 span');

// ==============================
// 🧠 Variables globales
// ==============================
const shoppingListItems = [];

// ==============================
// 🎊 Fonctionnalités
// ==============================

const generateList = (item, indice) => {
  shoppingList.innerHTML += `
    <div class="bag-item">${item} <span class="delete" data-index="${indice}" title="Supprimer le ${item.toLowerCase()}">❌</span></div>
    `;
}

// ➕ Ajouter un élément ➕
const addItem = () => {
  // On vérifie s'il y a une value dans le champ utilisateur
  if (shoppingItem.value) {
    shoppingListItems.push(shoppingItem.value);    
    shoppingItem.value = "";
    let currentItem = shoppingListItems[shoppingListItems.length-1];
    generateList(currentItem, shoppingListItems.length-1);
    itemsCount.textContent = shoppingListItems.length;
  } else {
    msg.textContent = "🚨 N'oublie pas d'écrire quelque chose avant d'envoyer 🚨";
    setTimeout(() => {
      msg.textContent = ""
    }, 2000);
    shoppingItem.select();
  }
};



// On vérifie si la liste est vide
const checkEmpty = () => {
  if (shoppingListItems.length > 0) {
    msg.textContent = "";
  } else {
    msg.textContent = "Ma liste est vide 😿";
  }
}

// ➖ On enlève un élément ➖
const deleteItem = (sonIndex) => {
  shoppingListItems.splice(sonIndex, 1);
  shoppingList.innerHTML = "";

  // On est obligés de boucler pour regénérer les bons index
  shoppingListItems.forEach((item, index) => {
    generateList(item, index);
  });
}

// ==============================
// 🧲 Événements
// ==============================
checkEmpty();

addButton.addEventListener('click', function(e) {
  e.preventDefault();  
  addItem();
  checkEmpty();
  shoppingItem.focus();
});

// Délégation d'événement d'amour 🏩
shoppingList.addEventListener("click", function(event) {
  if (event.target.classList.contains("delete")) {
    const indexItem = event.target.dataset.index;
    deleteItem(indexItem);
    itemsCount.textContent = shoppingListItems.length;    
    checkEmpty();
  }
})
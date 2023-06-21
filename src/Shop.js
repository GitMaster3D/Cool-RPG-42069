// Definieren der Item-Klasse
class Item {
    constructor(name, price) {
      this.name = name;
      this.price = price;
    }
  }
  
  // Erstellen einiger Beispiel-Items
  const sword = new Item("Sword", 100);
  const shield = new Item("Shield", 50);
  const potion = new Item("Health Potion", 20);
  
  // Definieren des Itemshops
  class ItemShop {
    constructor(items) {
      this.items = items;
    }
  
    // Methode zum Anzeigen der verfügbaren Items
    displayItems() {
      console.log("Available Items:");
      this.items.forEach((item, index) => {
        console.log(`${index + 1}. ${item.name} - Price: ${item.price}`);
      });
    }
  
    // Methode zum Kaufen eines Items
    buyItem(itemIndex) {
      if (itemIndex < 0 || itemIndex >= this.items.length) {
        console.log("Invalid item index.");
        return;
      }
  
      const item = this.items[itemIndex];
      console.log(`You bought ${item.name} for ${item.price} coins.`);
    }
  }
  
  // Beispielverwendung
  const items = [sword, shield, potion];
  const shop = new ItemShop(items);
  
  shop.displayItems(); // Anzeigen der verfügbaren Items
  
  shop.buyItem(0); // Kaufen des ersten Items
  shop.buyItem(2); // Kaufen des dritten Items
  shop.buyItem(5); // Ungültiger Index
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS menuitems (
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                description TEXT NOT NULL,
                image_url TEXT NOT NULL,
                category TEXT NOT NULL
            )`,
        [],
        resolve,
        reject
      );
    });
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM menuitems", [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  db.transaction((tx) => {
    tx.executeSql(
      `INSERT INTO menuitems (id, name, price, description, image_url, category) values ${menuItems
        .map(
          (item) =>
            `("${item.id}", "${item.name}", "${item.price}", "${item.description}", "${item.imageUrl}", "${item.category}")`
        )
        .join(", ")}`
    );
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve, reject) => {
    if (!query) {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where ${activeCategories
            .map((category) => `category='${category.toLowerCase()}'`)
            .join(" or ")}`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    } else {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from menuitems where (name like '%${query.toLowerCase()}%') and (${activeCategories
            .map((category) => `category='${category.toLowerCase()}'`)
            .join(" or ")})`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      }, reject);
    }
  });
}

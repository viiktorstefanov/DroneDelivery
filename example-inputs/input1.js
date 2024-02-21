export const input1 = {
    "map-top-right-coordinate": {
      "x": 280,
      "y": 280
    },
    "products": [
      "tomatoes",
      "cucumber",
      "cheese",
      "milk",
      "ham",
      "eggs",
      "bananas",
      "carrots",
      "bread",
      "onion"
    ],
    "warehouses": [
      {
        "x": 100,
        "y": 100,
        "name": "Left warehouse"
      },
      {
        "x": 200,
        "y": 200,
        "name": "Right warehouse"
      }
    ],
    "customers": [
      {
        "id": 1,
        "name": "John Stocks",
        "coordinates": {
          "x": 10,
          "y": 10
        }
      },
      {
        "id": 2,
        "name": "Alfred Derrick",
        "coordinates": {
          "x": 213,
          "y": 187
        }
      },
      {
        "id": 3,
        "name": "Richard Brune",
        "coordinates": {
          "x": 108,
          "y": 15
        }
      }
    ],
    "orders": [
      {
        "customerId": 1,
        "productList": {
          "tomatoes": 5,
          "cucumber": 5,
          "cheese": 1,
          "milk": 2
        }
      },
      {
        "customerId": 1,
        "productList": {
          "eggs": 10,
          "cucumber": 2,
          "cheese": 1,
          "ham": 2
        }
      },
      {
        "customerId": 2,
        "productList": {
          "eggs": 10,
          "tomatoes": 2,
          "bananas": 5,
          "carrots": 15,
          "bread": 2,
          "onion": 6
        }
      }
    ]
  }
  
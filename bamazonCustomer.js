var mysql = require("mysql");
var inquirer = require("inquirer");

var columnify = require('columnify');


var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Ranger1991",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    readDATA();
    
    
  });
  
  function runSearch() {
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?\n\n",
        choices: [
          "Buy Item by ID",
          "exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Buy Item by ID":
          makePurchase();
          break;
            
        case "exit":
          connection.end();
          break;
        }
      });
  }

  function readDATA() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
  
      // Log all results of the SELECT statement
      console.log(columnify(res));
      runSearch();
    });
  }

  function makePurchase()
  {
    inquirer
    .prompt([
        {
      name: "product",
      type: "input",
      message: "\n\nWhat product would you like to buy?\n"
        }
    ])
    .then(function(answer) {
        var query = "SELECT id, product_name, price, stock_quantity FROM products WHERE ?";
        connection.query(query, { id: parseInt(answer.product) }, function(err, res) {
          if (err) throw err;
          inquirer
            .prompt([
                {
                name: "stock",
                type: "input",
                message: "How much do you want to get?\n"
                }
            ])
            .then(function(answer) {
                var query1 = "UPDATE products SET ? WHERE ?";
                
                console.log(res[0].stock_quantity, parseInt(answer.stock));
                // console.log(typeof res[0].stock_quantity);
                var newQuantity = res[0].stock_quantity - parseInt(answer.stock);
                console.log(newQuantity);
                connection.query(query1,[{stock_quantity: newQuantity}, {id: answer.product}] , function(err) {
                  if (err) throw err;
                  console.log(newQuantity);
                  if (res[0].stock_quantity < parseInt(answer.stock))
                  {
                    console.log("We do not have enough in stock\n\n");
                    // readDATA();
                    // runSearch();
                  }
                  else
                  {
                    console.log(res[0].stock_quantity);
                    console.log(res[0].price);
                    console.log(parseInt(answer.stock));  
                    console.log("this is your total cost: " + (parseInt(answer.stock) * res[0].price +"\n\n\n\n"));
                    readDATA();
                    
                  }
                  
                }); 
                
                
            });
            
      });
    });
  }





function Register(){
  this.bills = [];
  this.acceptedBills = [1, 2, 5, 10, 20]
}

Register.prototype.depositBills = function(billValue){
  this.bills.push(billValue)
  return "Success! You added $" + billValue + " to the register."
}

Register.prototype.withdrawBills = function(billValue){
  var found = this.findBill(billValue)
  if (found) {
    var billIndex = this.findBillIndex(billValue)
    this.bills.splice(billIndex,1)
    return "You removed $" + billValue + " from the register."
  } else {
      return "Transaction Failed! You don't have any $" + billValue + " bills left."
  }
}

Register.prototype.findBill = function(billValue){
   return this.bills.find(function(billObject){
      return billObject == billValue
  })
}

Register.prototype.findBillIndex = function(billValue){
  return this.bills.findIndex(function(bill){
    return bill == billValue
  })
}

Register.prototype.addAmount = function(amount){
    var sortedBills = this.acceptedBills.sort(function(a, b){return b-a});
    var passedAmount = parseInt(amount)
    var index = 0
    while (passedAmount > 0) {
        if(passedAmount >= sortedBills[index]){
          this.bills.push(sortedBills[index])
          passedAmount -= sortedBills[index]
        } else {
          index += 1
        }
    }
    return " Success! You added $" + amount + " to the cash register"
}

Register.prototype.withdrawAmount = function(amount){
  var sortedBills = this.bills.sort(function(a, b){return b-a});
  var passedAmount = parseInt(amount)
  if (this.getTotal() < passedAmount){
      return "Transaction Failed! Not enough cash."
  } else {
    var index = 0
    while (passedAmount > 0 && index < this.bills.length - 1) {
      if (passedAmount % 2 != 0){
        var selectedBill = sortedBills.find(function(bill){
          return bill <= passedAmount && bill % 2 != 0
        })
        if (selectedBill != null){
          passedAmount -= selectedBill
          this.bills.splice(this.findBillIndex(selectedBill), 1)
        }else{
          index += 1
        }
      }else if(passedAmount % 2 == 0){
        var selectedBill = sortedBills.find(function(bill){
          return bill <= passedAmount && bill % 2 == 0
        })
        if(selectedBill != null){
          passedAmount -= selectedBill
          this.bills.splice(this.findBillIndex(selectedBill), 1)
        }else{
          index += 1
        }
      }
    }
    if (passedAmount == 0){
      return "Success! You removed $" + amount + " from the cash register"
    }else{
      return "Transaction failed! Change amount not possible."
    }
  }
}

Register.prototype.getTotal = function(){
    var total = 0;
    this.bills.forEach(function(element){
      total += element
    })
  return total.toString()
}

Register.prototype.empty = function(){
  this.bills = []
}

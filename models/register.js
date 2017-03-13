function Register(){
  this.bills = [];
}

Register.prototype.depositBills = function(billValue){
  var addedBill = new Bill(parseInt(billValue))
  this.bills.push(addedBill)
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
      return billObject.value == billValue
  })
}

Register.prototype.findBillIndex = function(billValue){
  return this.bills.findIndex(function(bill){
    return bill.value == billValue
  })
}

Register.prototype.addAmount = function(amount){
    var passedAmount = parseInt(amount)
    while (passedAmount != 0) {
      if (passedAmount >= 20){
        this.bills.push(new Bill(20))
        passedAmount -= 20
      } else if( passedAmount >= 10){
        this.bills.push(new Bill(10))
        passedAmount -= 10
      } else if( passedAmount >= 5){
        this.bills.push(new Bill(5))
        passedAmount -= 5
      } else if( passedAmount >= 2){
        this.bills.push(new Bill(2))
        passedAmount -= 2
      } else if( passedAmount >= 1){
        this.bills.push(new Bill(1))
        passedAmount -= 1
      }
    }
    return " Success! You added $" + amount + " to the cash register"
}

Register.prototype.withdrawAmount = function(amount){
  var requestedAmount = parseInt(amount)
  if (this.getTotal() < requestedAmount){
      return "Transaction Failed! Not enough cash."
  }else{
    var removedBills = []
      while (requestedAmount > 0 && this.getTotal() > 0 ){
        if (requestedAmount >= 20 && this.findBill(20)){
          this.withdrawBills(20)
          removedBills.push(new Bill(20))
          requestedAmount -= 20
        } else if( requestedAmount >= 10 && this.findBill(10)){
          this.withdrawBills(10)
          removedBills.push(new Bill(10))
          requestedAmount -= 10
        } else if( requestedAmount >= 5 && this.findBill(5) && requestedAmount % 2 != 0 ){
          this.withdrawBills(5)
          removedBills.push(new Bill(5))
          requestedAmount -= 5
        } else if( requestedAmount >= 2 && this.findBill(2)){
          this.withdrawBills(2)
          removedBills.push(new Bill(2))
          requestedAmount -= 2
        } else if( requestedAmount >= 1 && this.findBill(1)){
          this.withdrawBills(1)
          removedBills.push(new Bill(1))
          requestedAmount -= 1
        } else{
          this.bills.concat(removedBills)
          return "Transaction failed! Change amount not possible."
        }
    }
    return "Success! You removed $" + amount + " from the cash register"
  }
}

Register.prototype.getTotal = function(){
    var total = 0;
    this.bills.forEach(function(element){
      total += element.value
    })
  return total.toString()
}

Register.prototype.empty = function(){
  this.bills = []
}

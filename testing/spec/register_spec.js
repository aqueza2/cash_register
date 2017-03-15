describe("Register", function () {
  var register;
  register = new Register();

  describe("the register", function () {
    it("has zero cash on page load", function () {
      expect(register.bills.length).toEqual(0);
    });

    it("can handle a $20 dollar bill", function () {
      register.depositBills(20)
      expect(register.bills[0]).toEqual(20);
    });

    it("can handle a $10 dollar bill", function () {
      register.depositBills(10)
      expect(register.bills[1]).toEqual(10);
    });

    it("can handle a $5 dollar bill", function () {
      register.depositBills(5)
      expect(register.bills[2]).toEqual(5);
    });

    it("can handle a $2 dollar bill", function () {
      register.depositBills(2)
      expect(register.bills[3]).toEqual(2);
    });

    it("can handle a $1 dollar bill", function () {
      register.depositBills(1)
      expect(register.bills[4]).toEqual(1);
    });

    it("can return current total value as a string", function () {
      expect(register.getTotal()).toEqual("38");
    });

    it("can add any amount of cash. Example: Add $11.", function () {
      register.addAmount(11)
      expect(register.getTotal()).toEqual("49");
    });

    it("can dispense change if it contains the right amount of bills", function () {
      register.withdrawAmount(20)
      expect(register.getTotal()).toEqual("29");
    });

    it("will not dispense change if you don't have the right amount of bills", function () {
      register.empty()
      register.addAmount("20")
      console.log(register.bills)
      expect(register.withdrawAmount(19)).toEqual("Transaction failed! Change amount not possible.");
    });


    it("will sum up the the amount of bills you deposit. Example: Add 2 $20 bills, 4 $10 bills, 6 $5 bills, 4 $2 bills, 10 $1 bills to an empty register so that it ends up with a value of $128 total", function () {
      register.empty()
      //deposit 2 $20 dollar bills
      register.depositBills(20)
      register.depositBills(20)
      //deposit 4 $10 dollar bills
      register.depositBills(10)
      register.depositBills(10)
      register.depositBills(10)
      register.depositBills(10)
      //deposit 6 $5 dollar bills
      register.depositBills(5)
      register.depositBills(5)
      register.depositBills(5)
      register.depositBills(5)
      register.depositBills(5)
      register.depositBills(5)
      //deposit 4 $2 dollar bills
      register.depositBills(2)
      register.depositBills(2)
      register.depositBills(2)
      register.depositBills(2)
      //deposit 10 $1 dollar bills
      register.depositBills(1)
      register.depositBills(1)
      register.depositBills(1)
      register.depositBills(1)
      register.depositBills(1)
      register.depositBills(1)
      register.depositBills(1)
      register.depositBills(1)
      register.depositBills(1)
      register.depositBills(1)
      expect(register.getTotal()).toEqual("128");
    });

    it("will dispense bill amounts you ask for and also update the current value. For example: Take 1 $20, 4 $10 bills, 3 $5 bills and 10 $1 bills from the register leaving it with $43 total", function () {
      //take one $20
      register.withdrawBills(20)
      //take 4 $10
      register.withdrawBills(10)
      register.withdrawBills(10)
      register.withdrawBills(10)
      register.withdrawBills(10)
      //take three $5
      register.withdrawBills(5)
      register.withdrawBills(5)
      register.withdrawBills(5)
      //take ten $1
      register.withdrawBills(1)
      register.withdrawBills(1)
      register.withdrawBills(1)
      register.withdrawBills(1)
      register.withdrawBills(1)
      register.withdrawBills(1)
      register.withdrawBills(1)
      register.withdrawBills(1)
      register.withdrawBills(1)
      register.withdrawBills(1)
      expect(register.getTotal()).toEqual("43");
    });

    it("will dispense the change amount if it has enough bills. Example: Make change for $11 with what is now in the register.  This should succeed, leaving $32 total", function () {
      register.withdrawAmount(11)
      expect(register.getTotal()).toEqual("32");
    });

    it("will not dispense change if the amount is not divisible by the dollar amounts. Example: Make change for $14.  This should fail.", function () {
      expect(register.withdrawAmount(14)).toEqual("Transaction failed! Change amount not possible.");
    });
    
  });
});

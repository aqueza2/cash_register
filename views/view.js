$(document).ready(function(){
    var oRegister = new Register()

    $("#deposit-button").on("click", function(){
      $("#input-amount").val("")
      $("#bills-container button").unbind()
      $("#withdraw-text").addClass("hide")
      $("#bills-container").removeClass("hide")
      $("#deposit-text").removeClass("hide")

      $("#bills-container .bills").on("click", function(e){
        var message = oRegister.depositBills(e.currentTarget.id)
        updateDisplay(message, oRegister)
      })

      $("#submit-button").on("click", function(e){
        var amount = $("#input-amount").val()
        var message = oRegister.addAmount(amount)
        updateDisplay(message, oRegister)
      })
    });

    $("#withdraw-button").on("click", function(){
      $("#input-amount").val("")
      $("#bills-container button").unbind()
      $("#deposit-text").addClass("hide")
      $("#bills-container").removeClass("hide")
      $("#withdraw-text").removeClass("hide")

      $("#bills-container .bills").on("click", function(e){
        var message = oRegister.withdrawBills(e.currentTarget.id)
        updateDisplay(message, oRegister)
      })

      $("#submit-button").on("click", function(e){
        var amount = $("#input-amount").val()
        var message = oRegister.withdrawAmount(amount)
        updateDisplay(message, oRegister)
      })
    });

    $("#reset-button").on("click", function(){
      oRegister.empty()
      var message = "Your register is empty! Please add some cash."
      updateDisplay(message, oRegister)
      $("#bills-container").addClass("hide")
      $("#bills-container .bills").unbind()
    });

});

function updateDisplay(message, register){
  $("#transaction-message").text(message)
  var updatedAmount = register.getTotal()
  $("#available-cash-amount").text(updatedAmount)
}

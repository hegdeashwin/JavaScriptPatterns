var Westros;
(function (Westros) {
    (function (Banking) {
        var NaiveBanking = (function () {
            function NaiveBanking() {
                this.state = "";
                this.balance = 0;
            }
            NaiveBanking.prototype.NextState = function (action, amount) {
                if (this.state == "overdrawn" && action == "withdraw") {
                    this.state = "on hold";
                }
                if (this.state == "on hold" && action != "deposit") {
                    this.state = "on hold";
                }
                if (this.state == "good standing" && action == "withdraw" && amount <= this.balance) {
                    this.balance -= amount;
                }
                if (this.state == "good standing" && action == "withdraw" && amount > this.balance) {
                    this.balance -= amount;
                    this.state = "overdrawn";
                }
            };
            return NaiveBanking;
        })();

        var BankAccountManager = (function () {
            function BankAccountManager() {
            }
            BankAccountManager.prototype.Deposit = function (amount) {
                this.currentState.Deposit(amount);
            };

            BankAccountManager.prototype.Withdraw = function (amount) {
                this.currentState.Withdraw(amount);
            };
            BankAccountManager.prototype.addToBalance = function (newBalance) {
                this.balance = newBalance;
            };
            BankAccountManager.prototype.getBalance = function () {
                return this.balance;
            };
            BankAccountManager.prototype.moveToState = function (newState) {
                this.currentState = newState;
            };
            return BankAccountManager;
        })();
        Banking.BankAccountManager = BankAccountManager;

        var GoodStandingState = (function () {
            function GoodStandingState(manager) {
                this.manager = manager;
            }
            GoodStandingState.prototype.Deposit = function (amount) {
                this.manager.addToBalance(amount);
            };
            GoodStandingState.prototype.Withdraw = function (amount) {
                if (this.manager.getBalance() < amount) {
                    this.manager.moveToState(new OverdrawnState(this.manager));
                }

                this.manager.addToBalance(-1 * amount);
            };
            return GoodStandingState;
        })();
        Banking.GoodStandingState = GoodStandingState;

        var OverdrawnState = (function () {
            function OverdrawnState(manager) {
                this.manager = manager;
            }
            OverdrawnState.prototype.Deposit = function (amount) {
                this.manager.addToBalance(amount);
                if (this.manager.getBalance() > 0) {
                    this.manager.moveToState(new GoodStandingState(this.manager));
                }
            };
            OverdrawnState.prototype.Withdraw = function (amount) {
                this.manager.moveToState(new OnHold(this.manager));
                throw "Cannot withdraw money from an already overdrawn bank account";
            };
            return OverdrawnState;
        })();
        Banking.OverdrawnState = OverdrawnState;

        var OnHold = (function () {
            function OnHold(manager) {
                this.manager = manager;
            }
            OnHold.prototype.Deposit = function (amount) {
                this.manager.addToBalance(amount);
                throw "Your account is on hold and you must attend the bank to resolve the issue";
            };
            OnHold.prototype.Withdraw = function (amount) {
                throw "Your account is on hold and you must attend the bank to resolve the issue";
            };
            return OnHold;
        })();
        Banking.OnHold = OnHold;
    })(Westros.Banking || (Westros.Banking = {}));
    var Banking = Westros.Banking;
})(Westros || (Westros = {}));

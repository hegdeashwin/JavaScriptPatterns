var Westros;
(function (Westros) {
    (function (Succession) {
        var KingSuccession = (function () {
            function KingSuccession(inLineForThrone) {
                this.inLineForThrone = inLineForThrone;
                this.pointer = 0;
            }
            KingSuccession.prototype.next = function () {
                return this.inLineForThrone[this.pointer++];
            };
            return KingSuccession;
        })();
        Succession.KingSuccession = KingSuccession;

        var FibonacciIterator = (function () {
            function FibonacciIterator() {
                this.previous = 1;
                this.beforePrevious = 1;
            }
            FibonacciIterator.prototype.next = function () {
                var current = this.previous + this.beforePrevious;
                this.beforePrevious = this.previous;
                this.previous = current;
                return current;
            };
            return FibonacciIterator;
        })();
        Succession.FibonacciIterator = FibonacciIterator;
    })(Westros.Succession || (Westros.Succession = {}));
    var Succession = Westros.Succession;
})(Westros || (Westros = {}));

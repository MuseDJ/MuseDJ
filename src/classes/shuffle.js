let Shuffle = class Shuffle {
    static seeder() {
        let seed = [];
        return {
            set: function(length) {
                if (seed.length > 0) return seed;
                else {
                    for (let i = 0; i < length; i++) {
                        seed.push(Math.random());
                    }
                    return seed;
                }
            },
            get: function() {
                return seed;
            },
            encode: function() {
                return new Buffer(seed.join(',')).toString('base64');
            },
            import: function(encoded) {
                seed = new Buffer(encoded, 'base64').toString('utf8').split(',');
                seed.forEach(function(o, i) {
                    seed[i] = parseFloat(o);
                });
            },
            clear: function() {
                seed = [];
            }
        };
    }
    static randomShuffle(ar, seed) {
        let numbers = [];
        for (var a = 0, max = ar.length; a < max; a++) {
            numbers.push(a);
        }
        var shuffled = [];
        for (let i = 0, len = ar.length; i < len; i++) {
            let r = parseInt(seed[i] * (len - i));
            shuffled.push(ar[numbers[r]]);
            numbers.splice(r, 1);
        }
        return shuffled;
    }
};

module.exports = Shuffle;

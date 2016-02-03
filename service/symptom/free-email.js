var _ = require('lodash');
module.exports = {
    score: function freeEmailSymptom(options, req, res) {
        var user = res.locals.user;
        var score = options.scores.warn;
        var neutral = options.scores.neutral;
        return (user && user.email && /free/i.test(user.email))? score : neutral;
    }
};

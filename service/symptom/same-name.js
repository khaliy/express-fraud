var _ = require('lodash');
module.exports = {
    score: function sameName(options, req, res) {
        var user = res.locals.user;
        var score = options.scores.severe;
        var neutral = options.scores.neutral;
        return (user && user.lastName && user.firstName && (user.lastName === user.firstName))? score : neutral;
    }
};

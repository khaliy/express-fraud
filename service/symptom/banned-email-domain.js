var _ = require('lodash');

module.exports = {
    score: function bannedEmailDomainSymptom(options, req, res) {
        var user = res.locals.user;
        var score = options.scores.severe;
        var neutral = options.scores.neutral;
        return (user && user.email && _.some(options.bannedEmails, function (bannedEmail) {return bannedEmail.test(user.email)}))? score : neutral;
    }
};

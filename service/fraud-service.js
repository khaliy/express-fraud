var _ = require('lodash');

var defaults = {
    score: 2,
    scores: {
        severe: 2,
        warn: 1,
        neutral: 0
    },
    bannedEmails: [
        /banned/,
        /test/
    ],
    symptoms: [
        require('./symptom/free-email.js'),
        require('./symptom/banned-email-domain.js'),
        require('./symptom/same-name.js')
    ]
};

function fraudService(opts) {
    var options = _.merge({}, defaults, opts);
    return function (req, res, next) {
        res.locals.fraudScore = _.reduce(options.symptoms, function (score, symptom) {
            return score + symptom.score(options, req, res);
        }, 0);
        res.locals.fraudulent = (res.locals.fraudScore >= options.score);
        next();
    };
}

module.exports = fraudService;

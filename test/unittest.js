var assert = require('assert')
var fraudMiddleware = require('..');

describe('fraudService()', function(){
    var req, res, fraudService;

    beforeEach(function() {
        req = {};
        res = {
            locals: {
                user: {
                    email: 'mail@gmail.hu'
                }
            }
        };
        fraudService = fraudMiddleware();
    });

    it('should consider normal email not fraudulent', function(done){
        fraudService(req, res, done);

        assert(res.locals.fraudScore === 0);
        assert(!res.locals.fraudulent);
    });

    it('should not consider a free email fraudulent on its own', function(done){
        res.locals.user.email = 'mail@free.hu';

        fraudService(req, res, done);

        assert(res.locals.fraudScore === 1);
        assert(!res.locals.fraudulent);
    });

    it('should consider banned email fraudulent', function(done){
        res.locals.user.email = 'test@banned.hu';

        fraudService(req, res, done);

        assert(res.locals.fraudScore === 2);
        assert(res.locals.fraudulent);
    });

    it('should consider banned and free email fraudulent', function(done){
        res.locals.user.email = 'test-free@banned.hu';

        fraudService(req, res, done);

        assert(res.locals.fraudScore === 3);
        assert(res.locals.fraudulent);
    });

    it('should not consider fraudulent when higher score provided', function(done){
        fraudService = fraudMiddleware({score: 10});
        res.locals.user.email = 'test-free@banned.hu';

        fraudService(req, res, done);

        assert(res.locals.fraudScore === 3);
        assert(!res.locals.fraudulent);
    });

    it('should not consider fraudulent simple user', function(done){
        res.locals.user.lastName = 'Smith';
        res.locals.user.firstName = 'Joe';
        res.locals.user.email = 'joe-smith@mail.com';

        fraudService(req, res, done);

        assert(res.locals.fraudScore === 0);
        assert(!res.locals.fraudulent);
    });

    it('should consider fraudulent simple user', function(done){
        res.locals.user.lastName = 'Smith';
        res.locals.user.firstName = 'Smith';
        res.locals.user.email = 'joe-smith@mail.com';

        fraudService(req, res, done);

        assert(res.locals.fraudScore === 2);
        assert(res.locals.fraudulent);
    });

});

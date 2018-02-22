const 
  express  = require('express'),
  session  = require('express-session'),
  passport = require('passport'),
  request  = require('request'),
  strategy = require('./strategy');

const app = express();
app.use( session({
  secret: 'hirh',
  resave: false,
  saveUninitialized: false
}));
app.use( passport.initialize() );
passport.use( session() );
passport.use( strategy );

passport.serializeUser(function(user, done) {
  return done(null, {clientID: strategy.clientID, email: strategy.email, name: strategy.name, followers: strategy.followers_url})
})
passport.deserializeUser(function(obj, done) {
  return done(null, obj);
})

app.get('/login', passport.authenticate('auth0', { successRedirect: '/followers', failureRedirect: '/login', failureFlash: true, connection: 'github'}));

app.get('/followers', function(req, res) {
  if ( !request.users ) {
    res.redirect('/login');
  } else {
    const FollowersRequest = {
      url: req.user.followers,
      headers: {
        'User Agent': req.user.clientID
      }
    };

    requext( FollowersRequest, (err, res, body ) => {
      res.status(200).send(body);
    })
  }
})

const port = 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}`); } );
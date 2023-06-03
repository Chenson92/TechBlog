const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth'); 

router.get('/', async (req, res) => {
    try {
        
        const user = await Post.findAll({
            where : {
                user_id : req.session.user_id
            }, include : [{
                model: Comment, 
                include : {
                    model : User,
                    attributes : ['name']
                }
            }]
        }, 
        );


        const userPosts = user.map((post) => post.get({ plain: true}));
            res.render('dashboard', {
                userPosts, 
                logged_in: req.session.logged_in, 
            });
        } catch (err) {
         
            res.status(400).json(err);
    }
});

router.get('/:id', withAuth, async (req, res) => {
    try {
        
        const post = await Post.findByPk(req.params.id,
           {  include : [{
                model: Comment, 
                include : {
                    model : User,
                    attributes : ['name']
                }
            }, 
        {
            model: User, 
            attributes: ['name']
        }]
        }, 
        );


        const dPost = post.get({ plain: true });
            
            res.render('postFunction', {
                dPost, 
           
            });
        } catch (err) {
            console.error(err);
            res.status(400).json(err);
    }
});



module.exports = router;
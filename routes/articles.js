const express = require('express');
const Article = require('../schemas/article')
const User = require('../schemas/user');
const authMiddlleware = require('../middlewares/auth-middleware')
const router = express.Router();
// const authMiddlleware = require('../middlewares/auth-middleware')

router.get('/', (req, res) => {
    res.send('this is root page')
});
// 전체 목록조회
router.get('/article', async (req, res) => {
    const article = await Article.find().sort({'_id':-1});
    res.json({
        article,
    })
});

// 게시글 조회페이지
router.get('/article/:_id', async (req, res) => {
    const { _id } = req.params;

    const [article] = await Article.find({ _id });


    res.json({
        article,
    });
});
// 삭제기능
router.delete('/article/:_id', async (req, res) => {
    const { _id } = req.params
    const { password } = req.body
    const [article] = await Article.find({ _id },{ password : 1})
    if (article.password != password) {
        return res.status(400).json({ success: false })
    } else {
        await Article.deleteOne({ _id})
    }
    res.json({ success: true, message: '게시글이 삭제되었습니다.' })
})

// 수정
router.put('/article/:_id', async (req, res) => {
    const { _id } = req.params;
    const { password, title, content, name } = req.body;
    const [article] = await Article.find({ _id },{ password: 1 })
    if (article.password != password) {
        return res.status(400).json({ success: false })
    } else {
        await Article.updateOne({ _id }, {$set: { password, title, content, name } })
        res.json({ success: true, message: '게시글이 수정되었습니다.' })
    }
})



// 생성 파일
router.post('/article',authMiddlleware, async (req, res) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth()+1;
    const day = today.getDate();

    const date = year + '-' + month + '-' + day;

    const { title, name, content, password } = req.body;

    if (!(name && password && title && content)) {
        return res.status(400).json({ success: false, errorMessage:"정확히 입력해주세요!" })
    }
    const createarticle = await Article.create({ title, name, content, password, date });

    res.status(201).json({ article: createarticle });
});

module.exports = router;


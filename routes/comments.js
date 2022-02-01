const express = require('express');
const Article = require('../schemas/article')
const User = require('../schemas/user');
const Comment = require('../schemas/comment')
const authMiddlleware = require('../middlewares/auth-middleware')
const router = express.Router();

// 댓글 전체 목록 조회
router.get('/comment/:articleId', async (req, res) => {
    const { articleId } = req.params;
    const comment = await Comment.find({ articleId }).sort({'_id':-1});
    res.json({
        comment,
    })
});


// 댓글 생성기능
router.post('/comments',authMiddlleware, async (req, res) => {
    const nickname  = res.locals.user[0].nickname;
    const { content, articleId } = req.body;
    if (!(content && articleId)) {
        return res.status(400).json({ success: false, errorMessage:"내용을 입력해주세요!" })
    }
    await Comment.create({ nickname, content, articleId });

    res.status(201).json({ success: true });
});

// 댓글 수정기능
router.patch('/comment/:commentId', authMiddlleware, async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;
    const nickname  = res.locals.user[0].nickname;
    const comment = await Comment.findOne({ _id: commentId, nickname });
    if (!comment) {
       return res.status(400).send({errorMessage:'본인의 글이 아닙니다.'})
    }

    await Comment.updateOne({_id: commentId, nickname},{$set:{content}})

    res.status(200).json({ success: true });
})




// 삭제기능
router.delete('/comment/:commentId', authMiddlleware, async (req, res) => {
    const { commentId } = req.params;
    const nickname  = res.locals.user[0].nickname;
    await Comment.deleteOne({ _id:commentId, nickname })
    res.json({ success: true });
})



module.exports = router;

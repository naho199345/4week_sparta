const express = require('express');
const User = require('../schemas/user');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authMiddlleware = require('../middlewares/auth-middleware')

import { Request, Response, NextFunction } from "express";
export const methodForTs = (
    req: Request,
    res: Response,
    next: NextFunction
) => { };
const postUsersSchemas = Joi.object({
    nickname: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9가-힣]{3,30}$')),
    password: Joi.string().required().min(4),
    confirmPassword: Joi.string().required().min(4),
});

// 회원가입구현
router.post('/users', async (req: Request, res: Response) => {
    try {
        const { nickname, password, confirmPassword } = await postUsersSchemas.validateAsync(req.body);
        if (password !== confirmPassword) {
            res.status(400).send({
                errorMessage: "비밀번호를 확인해주세요.",
            });
            return;
        }
        if (nickname === password) {
            res.status(400).send({
                errorMessage: "닉네임과 비밀번호가 같습니다."
            });
            return;
        }

        const existUsers = await User.find({ nickname });
        if (existUsers.length) {
            res.status(400).send({
                errorMessage: "이미 가입된 닉네임이 있습니다.",
            })
            return;
        }

        const user = new User({ nickname, password });
        await user.save();

        res.status(201).send({});
    } catch (err) {
        res.status(400).send({
            errorMessage: "요청한 형식이 올바르지 않습니다.",
        });
    }
});


const postAuthSchemas = Joi.object({
    nickname: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9가-힣]{3,30}$')),
    password: Joi.string().required().min(4),
})

// 로그인 구현
router.post('/auth', async (req: Request, res: Response) => {
    try {
        const { nickname, password } = await postAuthSchemas.validateAsync(req.body);

        const user = await User.findOne({ nickname, password }).exec();


        if (!user) {
            res.status(400).send({
                errorMessage: "닉네임 또는 패스워드가 잘못됐습니다."
            });
            return;
        };
        if (nickname === password) {
            res.status(400).send({
                errorMessage: "닉네임과 비밀번호가 같습니다."
            });
            return;
        }

        const token = jwt.sign({ nickname: user.nickname }, "seungho-scret-key");
        res.send({
            token,
        });
    } catch (error) {
        res.status(400).send({
            errorMessage: "요청한 형식이 올바르지 않습니다.",
        });
    }
});

// 사용자인증 미들웨어
router.get('/users/me', authMiddlleware, async (req: Request, res: Response) => {
    const { user } = res.locals;
    res.send({
        user: {
            nickname: user.nickname,
        },
    });
});

module.exports = router;
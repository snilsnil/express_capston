// errorController.js
"use strict";

const httpStatus = require("http-status-codes");

/**
 * Listing 11.2 (p. 168)
 * 에러 컨트롤러 추가
 */
exports.logErrors=(error, req, res, next)=>{
    console.error(error.stack);
    next(error);
}; // @TODO: 에러 처리를 위한 미들웨어 추가

/**
 * Listing 11.3 (p. 169)
 * 사용자 정의 메시지로 빠진 라우트 및 에러 대응
 */
exports.resNotFound=(req, res)=>{
    let errorCode=httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.send(`${errorCode}| The page dose not exist!`);
}; // @TODO: 404 상태 코드로 모든 에러 처리. 404.html 파일의 콘텐츠 전송
exports.resInternalError=(errors, req, res, next)=>{
    let errorCode=httpStatus.INTERNAL_SERVER_ERROR;
    console.log(`ERROR occurred: ${errors.stack}`);
    res.status(errorCode);
    res.send(`${errorCode}| Sorry, our application is experiencing a problem!`);
};; // @TODO: 500 상태 코드로 모든 에러 처리

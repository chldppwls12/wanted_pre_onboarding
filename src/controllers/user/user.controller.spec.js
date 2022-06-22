import request from 'supertest';
import should from 'should';
import app from '../../index.js';
import statusCode from '../../utils/statusCode.js';

// 채용 지원
describe('POST /users/recruitments', () => {
  describe('성공 시', () => {
    it(`${statusCode.CREATED}로 응답한다`, (done) => {
      request(app)
      .post('/users/recruitments')
      .send({
        'recruitment_id': 1,
        'user_id': 1
      })
      .expect(statusCode.CREATED)
      .end(done);
    });
  });

  describe('실패 시', () => {
    it(`파라미터 누락 시 ${statusCode.BAD_REQUEST}로 응답한다`, (done) => {
      request(app)
      .post('/users/recruitments')
      .send({
      })
      .expect(statusCode.BAD_REQUEST)
      .end(done);
    });

    it(`recruitment_id가 숫자가 아닐 경우 ${statusCode.BAD_REQUEST}로 응답한다`, (done) => {
      request(app)
      .post('/users/recruitments')
      .send({
        'recruitment_id': 'jjae',
        'user_id': 1
      })
      .expect(statusCode.BAD_REQUEST)
      .end(done);
    });

    it(`user_id가 숫자가 아닐 경우 ${statusCode.BAD_REQUEST}로 응답한다`, (done) => {
      request(app)
      .post('/users/recruitments')
      .send({
        'recruitment_id': 1,
        'user_id': 'jjae'
      })
      .expect(statusCode.BAD_REQUEST)
      .end(done);
    });

    it(`이미 지원한 적이 있으면 ${statusCode.CONFLICT}로 응답한다`, (done) => {
      request(app)
      .post('/recruitments')
      .send({
        'recruitment_id': 1,
        'user_id': 1
      })
      .expect(statusCode.CONFLICT)
      .end(done);
    });
  });
});
import request from 'supertest';
import should from 'should';
import app from '../../index.js';
import statusCode from '../../utils/statusCode.js';

// 채용목록 조회
describe('GET /recruitments', () => {
  describe('성공 시', () => {
    it('recruitment 객체를 담은 배열로 응답한다', (done) => {
      request(app)
      .get('/recruitments')
      .end((err, res) => {
        res.body.data.should.be.instanceOf(Array);
        done();
      });
    });
  });
});

// 채용목록 상세 조회
describe('GET /recruitments/:recruitment_id', () => {
  describe('성공 시', () => {
    it('recruitment 객체를 반환한다', (done) => {
      request(app)
      .get('/recruitments/4')
      .end((err, res) => {
        res.body.data.should.have.instanceOf(Object);
        done();
      });
    });
  });

  describe('실패 시', () => {
    it(`recruitment_id가 숫자가 아닐 경우 ${statusCode.BAD_REQUEST}로 응답한다`, (done) => {
      request(app)
      .get('/recruitments/jjae')
      .expect(statusCode.BAD_REQUEST)
      .end(done);
    });

    it(`recruitment_id로 찾을 수 없을 경우 ${statusCode.NOT_FOUND}로 응답한다`, (done) => {
      request(app)
      .get('/recruitments/-1')
      .expect(statusCode.NOT_FOUND)
      .end(done);
    });
  })
});

// 채용목록 삭제
describe('DELETE /recruitments/:recruitment_id', () => {
  describe('성공 시', () => {
    it(`${statusCode.OK}로 응답한다`, (done) => {
      request(app)
      .delete('/recruitments/6')
      .expect(statusCode.OK)
      .end(done);
    });
  });

  describe('실패 시', () => {
    it(`recruitment_id가 숫자가 아닐 경우 ${statusCode.BAD_REQUEST}로 응답한다`, (done) => {
      request(app)
      .delete('/recruitments/jjae')
      .expect(statusCode.BAD_REQUEST)
      .end(done);
    });
  });
});

// 채용목록 생성
describe('POST /recruitments', () => {
  describe('성공 시', () => {
    it(`${statusCode.CREATED}로 응답한다`, (done) => {
      request(app)
      .post('/recruitments')
      .send({
        'company_id': 1,
        'position': '백엔드 경력',
        'compensation': 300000,
        'content': '백엔드 경력을 모집합니다',
        'skill': 'Node.js'
      })
      .expect(statusCode.CREATED)
      .end(done);
    });
  });

  describe('실패 시', () => {
    it(`파라미터 누락 시 ${statusCode.BAD_REQUEST}로 응답한다`, (done) => {
      request(app)
      .post('/recruitments')
      .send({
      })
      .expect(statusCode.BAD_REQUEST)
      .end(done);
    });

    it(`company_id가 숫자가 아닐 경우 ${statusCode.BAD_REQUEST}로 응답한다`, (done) => {
      request(app)
      .post('/recruitments')
      .send({
        'company_id': 'jjae',
        'position': '백엔드 경력',
        'compensation': 300000,
        'content': '백엔드 경력을 모집합니다',
        'skill': 'Node.js'
      })
      .expect(statusCode.BAD_REQUEST)
      .end(done);
    });

    it(`compensation가 숫자가 아닐 경우 ${statusCode.BAD_REQUEST}로 응답한다`, (done) => {
      request(app)
      .post('/recruitments')
      .send({
        'company_id': 1,
        'position': '백엔드 경력',
        'compensation': 'jjae',
        'content': '백엔드 경력을 모집합니다',
        'skill': 'Node.js'
      })
      .expect(statusCode.BAD_REQUEST)
      .end(done);
    });

    it(`company_id가 존재하지 않을 경우 ${statusCode.NOT_FOUND}로 응답한다`, (done) => {
      request(app)
      .post('/recruitments')
      .send({
        'company_id': -1,
        'position': '백엔드 경력',
        'compensation': 10000,
        'content': '백엔드 경력을 모집합니다',
        'skill': 'Node.js'
      })
      .expect(statusCode.NOT_FOUND)
      .end(done);
    });
  });
});

// 채용목록 수정
describe('PATCH /recruitments/:recruitment_id', () => {
  describe('성공 시', () => {
    it(`${statusCode.OK}로 응답한다`, (done) => {
      request(app)
      .patch('/recruitments/9')
      .send({
        'skill': 'Spring'
      })
      .expect(statusCode.OK)
      .end(done);
    });
  });

  describe('실패 시', () => {
    it(`recruitment_id가 숫자가 아닐 경우 ${statusCode.BAD_REQUEST}로 응답한다`, (done) => {
      request(app)
      .patch('/recruitments/jjae')
      .expect(statusCode.BAD_REQUEST)
      .end(done);
    });

    it(`compensation가 숫자가 아닐 경우 ${statusCode.BAD_REQUEST}로 응답한다`, (done) => {
      request(app)
      .patch('/recruitments')
      .send({
        'compensation': 'jjae'
      })
      .expect(statusCode.BAD_REQUEST)
      .end(done);
    });
  });
});
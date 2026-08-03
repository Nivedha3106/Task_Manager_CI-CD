const request = require('supertest');
const app = require('./app');

describe('Task Manager Dynamic Validation Suite', () => {
  
  test('Initial GET /tasks should return an empty array', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(0);
  });

  test('POST /tasks should allow a user to successfully register a task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Deploy pipeline to production' });
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toEqual(1);
    expect(res.body.title).toEqual('Deploy pipeline to production');
  });

  test('POST /tasks should correctly block empty inputs from user', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: '    ' });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body.detail).toEqual('Task title cannot be empty');
  });
});

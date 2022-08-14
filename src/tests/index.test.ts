import request from 'supertest';
import app from '../';

let lastTodoId: number;

describe('TODO', () => {
  it('Todo Add', () => {
    return request(app)
      .post('/api/todo-add')
      .send({ title: 'addedTitle', description: 'addedDescription' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        lastTodoId = response.body.id;
        expect(response.body).toEqual(
          expect.objectContaining({
            status: true,
            id: expect.any(Number),
          }),
        );
      });
  });

  it('Todo List', () => {
    return request(app)
      .get('/api/todo-list')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              title: expect.any(String),
              description: expect.any(String),
            }),
          ]),
        );
      });
  });

  it('Todo Get ID', () => {
    return request(app)
      .get('/api/todo-get/' + lastTodoId)
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            title: expect.any(String),
            description: expect.any(String),
          }),
        );
      });
  });

  it('Todo Update', () => {
    return request(app)
      .put('/api/todo-update')
      .send({
        id: lastTodoId,
        newTitle: 'updatedTitle',
        description: 'updatedDescription',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            status: true,
          }),
        );
      });
  });

  it('Todo Delete', () => {
    return request(app)
      .delete('/api/todo-delete')
      .send({ id: lastTodoId })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual(
          expect.objectContaining({
            status: true,
          }),
        );
      });
  });
});

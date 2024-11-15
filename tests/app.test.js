const request = require('supertest');
const http = require('http');
const { getAllGames } = require('../controllers');
const { app } = require('../index.js');

jest.mock('../controllers', () => ({
  ...jest.requireActual('../controllers'),
  getAllGames: jest.fn(),
}));

let server;

beforeAll(async () => {
  server = http.createServer(app);
  server.listen(3001);
});

afterAll(async () => {
  server.close();
});

describe('Controller functin tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return all the games', () => {
    let mockGames = [
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ];
    getAllGames.mockReturnValue(mockGames);
    const result = getAllGames();
    expect(result.length).toBe(3);
    expect(result).toEqual(mockGames);
  });
});

describe('API endpoints tests', () => {
  test('API /games should get all the games', async () => {
    const res = await request(server).get('/games');
    expect(res.status).toBe(200);
    expect(res.body.games).toEqual([
      {
        gameId: 1,
        title: 'The Legend of Zelda: Breath of the Wild',
        genre: 'Adventure',
        platform: 'Nintendo Switch',
      },
      {
        gameId: 2,
        title: 'Red Dead Redemption 2',
        genre: 'Action',
        platform: 'PlayStation 4',
      },
      {
        gameId: 3,
        title: 'The Witcher 3: Wild Hunt',
        genre: 'RPG',
        platform: 'PC',
      },
    ]);
    expect(res.body.games.length).toBe(3);
  });

  test('GET /games/details/:id should get a game by Id', async () => {
    const res = await request(server).get('/games/details/3');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      gameId: 3,
      title: 'The Witcher 3: Wild Hunt',
      genre: 'RPG',
      platform: 'PC',
    });
  });
});

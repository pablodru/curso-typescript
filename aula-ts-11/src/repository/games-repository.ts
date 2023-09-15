import { db } from "database/database.connection";
import { Game, CreateGame } from "../protocols/game-protocol";

const games: CreateGame[] = [];

async function getGames() {
  const result = await db.query<Game>(`SELECT * FROM GAMES`);
  return result.rows;
}

async function createGame(game: CreateGame) {
  return await db.query<CreateGame>(`INSERT INTO games (title, platform) VALUES (${game.title}, ${game.platform})`);
}

async function getGameByTitleAndPlatform(game: CreateGame) {
  const gameSelect = await db.query<CreateGame>(`SELECT * FROM games WHERE title = ${game.title} AND platform = ${game.platform}`)
  return gameSelect.rows;
}

const gamesRepository = {
  getGames,
  getGameByTitleAndPlatform,
  createGame
}

export default gamesRepository;
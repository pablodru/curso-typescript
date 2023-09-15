import gamesRepository from "../repository/games-repository";
import { Game, CreateGame } from "../protocols/game-protocol";

async function getGames() : Promise<Game[]> {
  const games = await gamesRepository.getGames();
  return games;
}

async function createGame(game: CreateGame) : Promise<void> {
  if (await gameAlreadyExists(game)) {
    throw { message: "Game already exists" }
  }

  gamesRepository.createGame(game);
}

async function gameAlreadyExists(game: CreateGame): Promise<boolean> {
  const result = await gamesRepository.getGameByTitleAndPlatform(game);
  return result.length > 0
}

const gamesService = {
  getGames,
  createGame
}

export default gamesService;
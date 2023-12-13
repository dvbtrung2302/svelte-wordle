import { writable } from "svelte/store";
import { createGrid } from "../lib/helpers";
import type { LetterStatus } from "../lib/types";

export const board = writable(createGrid());

export const gameInfo = writable({
  letterCount: 0,
  attempt: 0,
});

export const GAME_WORD = writable("focus");

export const guess = writable("");

export const statuses = writable<LetterStatus[][]>(
  createGrid() as LetterStatus[][]
);

export const keyStatus = writable<Record<string, LetterStatus>>({});

export const gameOver = writable(false);

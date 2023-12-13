<script lang="ts">
  import { WORD_LIST } from "../../../constants/words";
  import {
    board,
    gameInfo,
    statuses,
    GAME_WORD,
    gameOver,
  } from "../../../stores/game";
  import { notifications } from "../../../stores/toast";
  import type { LetterStatus } from "../../types";
  import Tile from "../Tile/Tile.svelte";

  const handleDelete = () => {
    if ($gameInfo.letterCount === 0) return;

    gameInfo.update((prev) => ({
      letterCount: prev.letterCount - 1,
      attempt: prev.attempt,
    }));

    board.update((prevBoard) => {
      const newBoard = prevBoard;
      newBoard[$gameInfo.attempt][$gameInfo.letterCount] = "";
      return newBoard;
    });
  };

  const handleInvalidWord = () => {
    const currentAttemp = $gameInfo.attempt;

    notifications.default("Not in word list", 1500);
    statuses.update((prevStatuses) => {
      const newStatuses = prevStatuses;
      newStatuses[currentAttemp] = Array(6).fill("invalid");

      return newStatuses;
    });
  };

  const handleEnter = () => {
    if ($gameInfo.letterCount < 5) return;

    const currentAttemp = $gameInfo.attempt;
    const currentGuess = $board[currentAttemp];
    const currentGuessWord = currentGuess.join("").toLowerCase();

    if (!WORD_LIST.includes(currentGuessWord)) {
      handleInvalidWord();
      return;
    }

    gameInfo.update((prev) => ({
      letterCount: 0,
      attempt: prev.attempt + 1,
    }));

    const currentStatues: LetterStatus[] = [];
    const duplicateLetters = new Set();

    for (let i = 0; i < currentGuess.length; i++) {
      const letter = currentGuess[i];

      if ($GAME_WORD[i] === letter) {
        currentStatues[i] = "correct";
        duplicateLetters.add(letter);
      } else if ($GAME_WORD.includes(letter) && !duplicateLetters.has(letter)) {
        currentStatues[i] = "close";
        duplicateLetters.add(letter);
      } else {
        currentStatues[i] = "incorrect";
      }
    }

    statuses.update((prevStatuses) => {
      const newStatuses = prevStatuses;
      newStatuses[currentAttemp] = currentStatues;

      return newStatuses;
    });

    if (currentGuessWord === $GAME_WORD) {
      notifications.default("Genius", 2000);
      gameOver.set(true);
      return;
    }

    if ($gameInfo.attempt === 6) {
      notifications.default($GAME_WORD.toUpperCase(), 2000);
      gameOver.set(true);
      return;
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if ($gameOver) return;

    const pressedKey = event.key;
    let { letterCount, attempt } = $gameInfo;

    if (pressedKey === "Backspace") {
      handleDelete();
      return;
    }

    if (pressedKey === "Enter") {
      handleEnter();
      return;
    }

    if (letterCount > 4) return;

    if (/^[a-z]$/.test(pressedKey)) {
      board.update((prevBoard) => {
        prevBoard[attempt][letterCount++] = pressedKey;
        return prevBoard;
      });

      gameInfo.set({ letterCount, attempt });
    }
  };
</script>

<div class="board">
  {#each $board as row, x}
    <div class="row">
      {#each row as _, y}
        <Tile
          letter={$board[x][y]}
          status={$statuses[x][y]}
          --animation-delay={`${y * 0.3}s`}
        />
      {/each}
    </div>
  {/each}
</div>
<svelte:window on:keydown={handleKeyDown} />

<style lang="scss">
  .board {
    width: 300px;
    height: 360px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin: 0 auto;
    & .row {
      display: flex;
      gap: 5px;
    }
  }
</style>

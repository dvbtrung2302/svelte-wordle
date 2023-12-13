<script lang="ts">
  import { WORD_LIST } from "../../../constants/words";
  import {
    board,
    gameInfo,
    statuses,
    GAME_WORD,
    gameOver,
    keyStatus,
  } from "../../../stores/game";
  import { notifications } from "../../../stores/toast";
  import type { LetterStatus } from "../../types";

  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "o", "del"],
  ];

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
    if ($gameInfo.letterCount < 5) {
      notifications.default("Not enough letters", 1500);
      return;
    }

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
        keyStatus.update((prev) => ({
          ...prev,
          [letter]: "correct",
        }));
        duplicateLetters.add(letter);
      } else if ($GAME_WORD.includes(letter) && !duplicateLetters.has(letter)) {
        currentStatues[i] = "close";
        if ($keyStatus[letter] !== "correct") {
          keyStatus.update((prev) => ({
            ...prev,
            [letter]: "close",
          }));
        }
        duplicateLetters.add(letter);
      } else {
        currentStatues[i] = "incorrect";
        if (!$keyStatus[letter]) {
          keyStatus.update((prev) => ({
            ...prev,
            [letter]: "incorrect",
          }));
        }
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

  const handleKeyPress = (pressedKey: string) => {
    let { letterCount, attempt } = $gameInfo;

    if (letterCount > 4) return;

    if (/^[a-z]$/.test(pressedKey)) {
      board.update((prevBoard) => {
        prevBoard[attempt][letterCount++] = pressedKey;
        return prevBoard;
      });

      gameInfo.set({ letterCount, attempt });
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if ($gameOver) return;

    const pressedKey = event.key;

    if (pressedKey === "Backspace") {
      handleDelete();
      return;
    }

    if (pressedKey === "Enter") {
      handleEnter();
      return;
    }

    handleKeyPress(pressedKey);
  };

  const handleKeyboardClick = (key: string) => {
    if ($gameOver) return;

    if (key === "del") {
      handleDelete();
      return;
    }

    if (key === "enter") {
      handleEnter();
      return;
    }

    handleKeyPress(key);
  };
</script>

<div class="keyboard">
  {#each rows as row}
    <div class="row">
      {#each row as key}
        <button
          class="key"
          class:large={key === "enter" || key === "del"}
          class:correct={$keyStatus[key] === "correct"}
          class:close={$keyStatus[key] === "close"}
          class:incorrect={$keyStatus[key] === "incorrect"}
          on:click={() => handleKeyboardClick(key)}
        >
          {key}
        </button>
      {/each}
    </div>
  {/each}
</div>
<svelte:window on:keydown={handleKeyDown} />

<style lang="scss">
  .keyboard {
    height: 200px;
    margin: 0 5px;
    user-select: none;

    & .row {
      display: flex;
      justify-content: center;
      width: 100%;
      margin: 0 auto 8px;
      touch-action: manipulation;

      & .key {
        font-size: 1.25em;
        font-weight: bold;
        border: 0;
        padding: 0;
        margin: 0 6px 0 0;
        height: 58px;
        width: 43px;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
        background-color: #818384;
        color: #f8f8f8;
        display: flex;
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0.3);
        line-height: 1.15;

        &.large {
          width: 65px;
          font-size: 12px;
        }

        &.correct {
          background-color: #538d4e;
        }

        &.close {
          background-color: #b59f3b;
        }

        &.incorrect {
          background-color: #3a3a3c;
        }
      }
    }
  }
</style>

<script lang="ts">
  import type { LetterStatus } from "../../types";

  export let letter: string;
  export let status: LetterStatus = "";
</script>

<div
  class="tile"
  class:hasLetter={!!letter}
  class:correct={status === "correct"}
  class:incorrect={status === "incorrect"}
  class:close={status === "close"}
  class:invalid={status === "invalid"}
  class:over={status === "over"}
>
  <div class="front">{letter}</div>
  <div class="back">{letter}</div>
</div>

<style lang="scss">
  .tile {
    width: 52px;
    height: 52px;
    border: 2px solid #3a3a3c;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    line-height: 1;
    font-weight: bold;
    vertical-align: middle;
    box-sizing: border-box;
    color: #f8f8f8;
    text-transform: uppercase;
    user-select: none;
    transition: transform 0.3s ease-in-out;
    transform-style: preserve-3d;

    & .front,
    & .back {
      width: 100%;
      height: 100%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      backface-visibility: hidden;
    }

    & .back {
      transform: rotateX(180deg);
    }

    &.correct {
      animation: correctFlip 0.5s var(--animation-delay, 1s) forwards;
    }

    &.incorrect {
      animation: incorrectFlip 0.5s var(--animation-delay, 1s) forwards;
    }

    &.close {
      animation: closeFlip 0.5s var(--animation-delay, 1s) forwards;
    }
    @keyframes correctFlip {
      from {
        transform: rotateX(0deg);
      }
      to {
        transform: rotateX(180deg);
        border: none;
        background-color: #538d4e;
      }
    }
    @keyframes incorrectFlip {
      from {
        transform: rotateX(0deg);
      }
      to {
        transform: rotateX(180deg);
        border: none;
        background-color: #3a3a3c;
      }
    }

    @keyframes closeFlip {
      from {
        transform: rotateX(0deg);
      }
      to {
        transform: rotateX(180deg);
        border: none;
        background-color: #b59f3b;
      }
    }
  }

  .hasLetter {
    animation: popInAnimation 0.1s;
    border: 2px solid #565758;
  }

  @keyframes popInAnimation {
    0% {
      transform: scale(0);
    }
    30% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  .invalid {
    animation: shake 0.5s;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    20%,
    50%,
    80% {
      transform: translateX(-5px);
    }
    40%,
    60% {
      transform: translateX(5px);
    }
  }
</style>

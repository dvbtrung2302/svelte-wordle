<script lang="ts">
  import type { LetterStatus } from "../../types";

  export let letter = "";
  export let status: LetterStatus = "";
</script>

<div
  class="small-letter"
  class:correct={status === "correct"}
  class:incorrect={status === "incorrect"}
  class:close={status === "close"}
>
  <div class="front">{letter}</div>
  <div class="back">{letter}</div>
</div>

<style lang="scss">
  .small-letter {
    font-size: 1.6rem;
    padding-top: 1px;
    width: 100%;
    height: 100%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    font-weight: bold;
    vertical-align: middle;
    text-transform: uppercase;

    background-color: #121213;
    border: 2px solid #565758;
    color: #f8f8f8;
    position: relative;
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
      animation: correctFlip 0.8s 0.5s forwards;
    }

    &.incorrect {
      animation: incorrectFlip 0.8s 0.5s forwards;
    }

    &.close {
      animation: closeFlip 0.8s 0.5s forwards;
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
</style>

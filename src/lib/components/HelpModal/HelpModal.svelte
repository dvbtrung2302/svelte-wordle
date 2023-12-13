<script lang="ts">
  import type { LetterStatus } from "../../types";
  import Modal from "../Modal/Modal.svelte";
  import SmallLetter from "../SmallLetter/SmallLetter.svelte";

  let isModalOpen: boolean = false;

  const instructions = [
    "Each guess must be a valid 5-letter word.",
    " The color of the tiles will change to show how close your guess was to the word.",
  ];

  const examples = [
    {
      word: "weary",
      checkLetter: "w",
      explanation: "is in the word and in the correct spot.",
    },
    {
      word: "pills",
      checkLetter: "i",
      explanation: "is in the word but in the wrong spot.",
    },
    {
      word: "vague",
      checkLetter: "u",
      explanation: "is not in the word in any spot.",
    },
  ];

  const statusByIndex: Record<string, LetterStatus> = {
    w: "correct",
    i: "close",
    u: "incorrect",
  };
</script>

<button type="button" class="help-btn" on:click={() => (isModalOpen = true)}>
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    height="28"
    viewBox="4 4 24 24"
    width="28"
  >
    <path
      fill="#f8f8f8"
      d="M14.8333 23H17.1666V20.6667H14.8333V23ZM15.9999 4.33334C9.55992 4.33334 4.33325 9.56001 4.33325 16C4.33325 22.44 9.55992 27.6667 15.9999 27.6667C22.4399 27.6667 27.6666 22.44 27.6666 16C27.6666 9.56001 22.4399 4.33334 15.9999 4.33334ZM15.9999 25.3333C10.8549 25.3333 6.66659 21.145 6.66659 16C6.66659 10.855 10.8549 6.66668 15.9999 6.66668C21.1449 6.66668 25.3333 10.855 25.3333 16C25.3333 21.145 21.1449 25.3333 15.9999 25.3333ZM15.9999 9.00001C13.4216 9.00001 11.3333 11.0883 11.3333 13.6667H13.6666C13.6666 12.3833 14.7166 11.3333 15.9999 11.3333C17.2833 11.3333 18.3333 12.3833 18.3333 13.6667C18.3333 16 14.8333 15.7083 14.8333 19.5H17.1666C17.1666 16.875 20.6666 16.5833 20.6666 13.6667C20.6666 11.0883 18.5783 9.00001 15.9999 9.00001Z"
    >
    </path>
  </svg>
</button>
<Modal bind:isOpen={isModalOpen}>
  <div></div>
  <h2 class="title">How To Play</h2>
  <h3 class="sub-title">Guess the Wordle in 6 tries.</h3>
  <section>
    <ul class="instructions">
      {#each instructions as instruction}
        <li>{instruction}</li>
      {/each}
    </ul>
  </section>
  <div class="examples">
    <p><strong>Examples</strong></p>
    {#each examples as { word, checkLetter, explanation }}
      <div class="example">
        {#each word.split("") as letter}
          <div class="letter">
            <SmallLetter
              {letter}
              status={letter === checkLetter ? statusByIndex[checkLetter] : ""}
            />
          </div>
        {/each}
        <p class="explanation">
          <strong>{checkLetter.toUpperCase()}</strong>
          {explanation}
        </p>
      </div>
    {/each}
  </div>
</Modal>

<style lang="scss">
  .help-btn {
    cursor: pointer;
  }

  .title {
    font-weight: 500;
    font-size: 28px;
    letter-spacing: 0;
    line-height: 30px;
    text-transform: none;
    text-align: left;
    margin-bottom: 6px;
    margin-top: 29px;
    display: block;
  }

  .sub-title {
    font-weight: 300;
    font-size: 20px;
    line-height: 24px;
    margin: 0;
  }

  .instructions {
    font-size: 16px;
    line-height: 20px;
    list-style-type: disc;
    margin-block-start: 1em;
    margin-block-end: 1em;
    padding-inline-start: 20px;
    color: #f8f8f8;

    & li {
      margin-bottom: 4px;
      display: list-item;
      text-align: -webkit-match-parent;
      list-style-type: disc;
    }
  }

  .examples {
    & .example {
      margin-top: 8px;
      margin-bottom: 20px;

      & .letter {
        width: 32px;
        height: 32px;
        margin-right: 4px;
        display: inline-block;
      }

      & .explanation {
        font-size: 16px;
        line-height: 20px;
        margin-top: 8px;
      }
    }
  }
</style>

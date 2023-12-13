<script lang="ts">
  import { fly } from "svelte/transition";

  export let isOpen: boolean = false;

  function closeModal() {
    isOpen = false;
  }
</script>

{#if isOpen}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div on:click={closeModal} class="modal-overlay">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div
      transition:fly={{ duration: 300, y: 30 }}
      on:click={(e) => e.stopPropagation()}
      class="modal-content"
    >
      <slot />
      <button
        class="close-btn"
        type="button"
        aria-label="Close"
        on:click={closeModal}
        ><svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          height="20"
          viewBox="0 0 24 24"
          width="20"
          ><path
            fill="#f8f8f8"
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path></svg
        ></button
      >
    </div>
  </div>
{/if}

<style lang="scss">
  .modal-overlay {
    display: flex;
    position: fixed;
    width: 100%;
    height: 100%;
    padding-top: 30px;
    top: 0;
    left: 0;
    border: none;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 2000;

    & .modal-content {
      max-width: 520px;
      padding: 32px;
      position: relative;
      border-radius: 8px;
      border: 1px solid #1a1a1b;
      background-color: #121213;
      color: #f8f8f8;
      box-shadow: 0 4px 23px 0 rgba(0, 0, 0, 0.2);
      width: 90%;
      max-height: 100%;
      overflow-y: auto;
    }

    & .close-btn {
      width: 30px;
      height: 30px;
      background: none;
      border: none;
      padding: 0;
      position: absolute;
      top: 16px;
      right: 16px;
      user-select: none;
      cursor: pointer;
      color: #f8f8f8;

      & svg {
        width: 100%;
        height: auto;
      }
    }
  }
</style>

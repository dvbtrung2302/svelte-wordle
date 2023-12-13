<script lang="ts">
  import HelpModal from "../HelpModal/HelpModal.svelte";
</script>

<header class="root">
  <h1 class="title">Wordle</h1>
  <div class="help">
    <HelpModal />
  </div>
</header>

<style lang="scss">
  .root {
    display: flex;
    align-items: center;
    padding: 0px 20px;
    height: 65px;
    color: #f8f8f8;
    border-bottom: 1px solid #3a3a3c;
    position: relative;

    & .title {
      text-align: center;
      font-size: 32px;
      flex-grow: 2;
      font-weight: 700;
      letter-spacing: 0.01em;
      left: 0;
      right: 0;
      pointer-events: none;
      position: relative;
    }

    & .help {
      position: absolute;
      right: 20px;
    }
  }
</style>

<script lang="ts">
  import Board from "./lib/components/Board/Board.svelte";
  import Header from "./lib/components/Header/Header.svelte";
  import Keyboard from "./lib/components/Keyboard/Keyboard.svelte";
  import Toast from "./lib/components/Toast/Toast.svelte";
</script>

<Header />
<main>
  <Board />
  <Keyboard />
  <Toast />
</main>

<style>
  main {
    margin-top: 30px;
  }
</style>

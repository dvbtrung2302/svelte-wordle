<script lang="ts">
  import { board, statuses } from "../../../stores/game";
  import Tile from "../Tile/Tile.svelte";
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

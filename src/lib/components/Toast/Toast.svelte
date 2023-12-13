<script>
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { notifications } from "../../../stores/toast";
</script>

<div class="notifications">
  {#each $notifications as notification (notification.id)}
    <div animate:flip class="toast" transition:fly={{ y: 30 }}>
      <div class="content">{notification.message}</div>
    </div>
  {/each}
</div>

<style>
  .notifications {
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    pointer-events: none;
  }

  .toast {
    flex: 0 0 auto;
    margin-bottom: 10px;
    background-color: #f8f8f8;
    border-radius: 5px;
  }

  .content {
    padding: 10px;
    display: block;
    font-weight: 500;
  }
</style>

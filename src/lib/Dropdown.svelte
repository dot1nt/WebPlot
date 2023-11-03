<script>
  let open = false

  function focusOut ({ relatedTarget, currentTarget }) {
    if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) {
      return
    }

    open = false
  }

</script>

<div id="dropdown" on:focusout={focusOut}>
  <button on:click={() => { open = !open }} class:open={open}>
    <svg width="20px" height="20px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="var(--on-background-secondary)" class="bi bi-three-dots-vertical">
      <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
    </svg>
  </button>
  {#if open}
    <div id="dropdown-content">
      <slot>Link</slot>
    </div>
  {/if}
</div>

<style>
  #dropdown {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    outline: none;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    transition: 0.3s;
  }

  button:hover, button.open {
    background-color: rgba(100, 100, 100, 0.15);
  }

  #dropdown-content {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 70px;
    right: 20px;
    background-color: var(--background-secondary);
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
    overflow: hidden;
    border-radius: 10px;
    transition: 0.5s;
    z-index: 100;
  }

  #dropdown-content :global(a) {
    padding: 15px 120px 15px 20px;
    font-size: 16px;
    color: var(--on-background-secondary);
    text-decoration: none;
    transition: 0.3s;
  }

  #dropdown-content :global(a):hover {
    background-color: rgba(100, 100, 100, 0.15);
  }
</style>

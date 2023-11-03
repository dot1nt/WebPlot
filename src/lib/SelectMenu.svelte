<script>
    export let tooltip

    export let options
    export let defaultOption = undefined
    export let selectedOption = !defaultOption ? options[0] : defaultOption

    let open = false

    function toggleMenu () {
      open = !open
    }

    function selectOption (option) {
      selectedOption = option
      open = false
    }

    function focusOut ({ relatedTarget, currentTarget }) {
      if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) {
        return
      }

      open = false
    }
</script>

<div class="menu-wrapper" on:focusout={focusOut}>
    <input type="text" class="menu-input" value={selectedOption} title={tooltip} readonly>
    <button class="menu-button" on:click={toggleMenu}>▼</button>

    <div class="menu-options">
        {#if open}
          {#each options as option}
            <button on:click={() => selectOption(option)}>{option}</button>
          {/each}
        {/if}
    </div>
</div>

<style>
  .menu-wrapper {
    display: flex;
    align-content: center;
  }

  .menu-input {
    background-color: transparent;
    padding: 0 15px;
    border: 2px solid var(--tertiary);
    border-radius: 20px 0 0 20px;
    outline: none;
    width: 100px;
    height: 40px;
    cursor: default;
    line-height: 45px;
    font-size: 16px;
    color: var(--tertiary);
  }

  .menu-button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 2px solid var(--tertiary);
    border-radius: 0 20px 20px 0;
    margin-left: -2px;
    height: 40px;
    width: 40px;
    color: var(--tertiary);
    transition: 0.2s;
  }

  .menu-options {
    position: absolute;
    background-color: var(--background-secondary);
    margin-top: 60px;
    width: 170px;
    border-radius: 8px;
    z-index: 100;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 10px;
    overflow: hidden;
  }

  .menu-options button {
    background-color: transparent;
    outline: none;
    border: none;
    font-size: 16px;
    width: 100%;
    color: var(--on-background-secondary);
    padding: 14px 120px 14px 20px;
    text-align: left;
    transition: 0.2s;
  }

  .menu-options button:hover {
    background-color: rgba(100, 100, 100, 0.15);
  }
</style>

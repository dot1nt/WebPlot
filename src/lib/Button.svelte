<script>
  export let name
</script>

<button on:click>{name}</button>

<style>
  button {
    border: none;
    background-color: var(--background-color);
    color: var(--color);
    padding: 9px 25px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-radius: 40px;
    font-size: 16px;
    font-weight: 600;
    transition: 0.3s;
  }

  button:hover {
    box-shadow: inset 0 0 100px 100px rgba(255, 255, 255, 0.5);
  }
</style>

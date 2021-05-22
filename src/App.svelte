<script lang="ts">
  import Canvas from './Components/Canvas.svelte'
  import Controls from './Components/Controls.svelte'
</script>

<main>
  <div class="layout">
    <div class="container-canvas">
      <Canvas />
    </div>
    <div class="container-controls">
      <Controls />
    </div>
  </div>
</main>

<style lang="scss">
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    padding: 0;
  }

  main {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    flex-direction: column;
    min-height: 100vh;
    box-sizing: border-box;
    padding: 0;
  }

  .layout {
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    align-content: stretch;
    flex-direction: row;
    flex: 1;
  }

  .container-canvas {
    background-color: #ededed;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .container-controls {
    background-color: #fbfbfb;
    width: 260px;
    padding: 1rem;
    box-shadow: 0px 2px 50px 2px #dedede;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  @media only screen and (max-width: 900px) {
    .layout {
      flex-direction: column-reverse;
    }

    .container-canvas {
      padding: 1rem;
    }

    .container-controls {
      width: 100%;
    }
  }
</style>

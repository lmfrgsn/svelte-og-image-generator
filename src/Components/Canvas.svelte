<script lang="ts">
  import ImgEncoder from 'svelte-image-encoder'

  import {
    title,
    subTitle,
    titleTextSize,
    subTitleTextSize,
    titleTextColor,
    subTitleTextColor,
    bgColor,
    align,
    justify,
    url,
    src,
  } from '../stores'

  let quality = 1
  let realTime = true

  function handleTitle(event) {
    const text = event.target.innerText
    if (!text) return
    title.set(text)
  }

  function handleSubTitle(event) {
    const text = event.target.innerText
    if (!text) return
    subTitle.set(text)
  }
</script>

<div class="canvas-container">
  <div
    id="canvas"
    class="canvas"
    style="background-color: {$bgColor}; align-items: {$align}; justify-content: {$justify};"
  >
    <h1
      contenteditable="true"
      on:keyup={handleTitle}
      style="font-size: {$titleTextSize}px; color: {$titleTextColor}"
    >
      {$title}
    </h1>
    <h2
      contenteditable="true"
      on:keyup={handleSubTitle}
      style="font-size: {$subTitleTextSize}px; color: {$subTitleTextColor}"
    >
      {$subTitle}
    </h2>

    {#if $src}
      <ImgEncoder
        {quality}
        bind:url={$url}
        bind:src={$src}
        {realTime}
        width={200}
        height={200}
        crossOrigin="anonymous"
        classes="profile-image"
      />
    {/if}
    <!-- <img src={$url} alt="" /> -->
  </div>
</div>

<style lang="scss">
  .canvas-container {
    width: 1200px;
    height: 630px;
  }

  .canvas {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 1200px;
    height: 630px;
    box-sizing: border-box;
    box-shadow: 0px 2px 50px 2px #dedede;
    overflow: hidden;
    padding: 2rem;
    // transition: all 200ms ease-in-out;
  }

  h1,
  h2 {
    padding: 0;
    margin: 0;
  }

  h1:focus-visible,
  h2:focus-visible {
    outline: none;
  }

  :global(.profile-image) {
    border-radius: 50%;
    cursor: grab;
    margin-top: 1rem;
  }

  :global(.profile-image:active) {
    cursor: grabbing;
  }

  @media only screen and (max-width: 1500px) {
    .canvas-container {
      width: 900px;
      height: 472.5px;
    }

    .canvas {
      transform: scale(0.75);
      transform-origin: top left;
    }
  }

  @media only screen and (max-width: 1200px) {
    .canvas-container {
      width: 600px;
      height: 315px;
    }

    .canvas {
      transform: scale(0.5);
      transform-origin: top left;
    }
  }

  @media only screen and (max-width: 630px) {
    .canvas-container {
      width: 300px;
      height: 157.5px;
    }

    .canvas {
      transform: scale(0.25);
      transform-origin: top left;
    }
  }
</style>

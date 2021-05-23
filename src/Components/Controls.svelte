<script lang="ts">
  import { get } from 'svelte/store'

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
    src,
    url,
    filename,
  } from '../stores'

  let image = ''
  let loading = false

  function loadFile(e) {
    image = URL.createObjectURL(e.target.files[0])
    url.set(image)
    src.set(image)
  }

  async function handleSubmit() {
    loading = true
    const res = await fetch('/.netlify/functions/generateImage', {
      method: 'POST',
      body: JSON.stringify({
        title: get(title),
        subTitle: get(subTitle),
        titleTextSize: get(titleTextSize),
        subTitleTextSize: get(subTitleTextSize),
        titleTextColor: get(titleTextColor),
        subTitleTextColor: get(subTitleTextColor),
        bgColor: get(bgColor),
        align: get(align),
        justify: get(justify),
        src: get(src),
        url: get(url),
      }),
    })
    loading = false

    const json = await res.json()
    await filename.set(json)

    document.getElementById('downloadImage').click()
  }
</script>

<div class="controls">
  <div class="form-group">
    <label for="titleText">Primary Text</label>
    <input type="text" bind:value={$title} id="titleText" />
  </div>
  <div class="form-group">
    <label for="subTitleText">Secondary Text</label>
    <input type="text" bind:value={$subTitle} id="subTitleText" />
  </div>
  <hr />
  <div class="form-group">
    <label for="titleTextSize">Primary Text Size</label>
    <input
      type="range"
      min="16"
      max="128"
      bind:value={$titleTextSize}
      step="4"
      class="slider"
      id="titleTextSize"
    />
  </div>
  <div class="form-group">
    <label for="subTitleTextSize">Secondary Text Size</label>
    <input
      type="range"
      min="16"
      max="128"
      bind:value={$subTitleTextSize}
      step="4"
      class="slider"
      id="subTitleTextSize"
    />
  </div>
  <hr />
  <div class="form-group inline">
    <label for="titleTextColor">Primary Text Color</label>
    <input
      type="color"
      id="titleTextColor"
      name="titleTextColor"
      bind:value={$titleTextColor}
    />
  </div>
  <div class="form-group inline">
    <label for="subTitleTextColor">Secondary Text Color</label>
    <input
      type="color"
      id="subTitleTextColor"
      name="subTitleTextColor"
      bind:value={$subTitleTextColor}
    />
  </div>
  <div class="form-group inline">
    <label for="bgColor">Background Color</label>
    <input type="color" id="bgColor" name="bgColor" bind:value={$bgColor} />
  </div>
  <hr />
  <div class="form-group">
    <label for="verticalAlign">Vertical Align</label>
    <div class="btn-group">
      <button
        class="btn"
        on:click={() => align.set('flex-start')}
        class:selected={$align == 'flex-start'}>Left</button
      >
      <button
        class="btn"
        on:click={() => align.set('center')}
        class:selected={$align == 'center'}>Center</button
      >
      <button
        class="btn"
        on:click={() => align.set('flex-end')}
        class:selected={$align == 'flex-end'}>Right</button
      >
    </div>
  </div>

  <div class="form-group">
    <label for="horizontalAlign">Horizontal Align</label>
    <div class="btn-group">
      <button
        class="btn"
        on:click={() => justify.set('flex-start')}
        class:selected={$justify == 'flex-start'}>Top</button
      >
      <button
        class="btn"
        on:click={() => justify.set('center')}
        class:selected={$justify == 'center'}>Middle</button
      >
      <button
        class="btn"
        on:click={() => justify.set('flex-end')}
        class:selected={$justify == 'flex-end'}>Bottom</button
      >
    </div>
  </div>
  <hr />
  <div>
    <input on:change={loadFile} type="file" id="imageUpload" accept="image/*" />
    <label for="imageUpload" class="image-button">Add an image</label>
  </div>
</div>

<button
  class="btn btn-submit"
  type="button"
  on:click={handleSubmit}
  disabled={loading}
>
  {#if loading}
    <img src="/img/loading.svg" alt="loading" width="50" />
  {:else}
    Save Image
  {/if}
</button>

<a id="downloadImage" href={$filename} download hidden>Save Image</a>

<style lang="scss">
  .btn {
    border: none;
    cursor: pointer;
    padding: 0.4rem;
  }

  a,
  .btn,
  .image-button {
    transition: all 75ms ease-in-out;
  }

  hr {
    background-color: #e5e5e5;
    border: 0;
    height: 1px;
    margin: 1.5rem 0;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  label {
    margin-bottom: 0.5rem;
    opacity: 0.75;
    font-weight: 500;
    font-size: 0.75rem;
  }

  .form-group.inline {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .form-group.inline label {
    margin-bottom: 0;
  }

  input[type='text'] {
    border: 2px solid #ededed;
    border-radius: 4px;
    padding: 0.4rem;
    font-size: 1rem;
  }

  .btn-submit {
    background-color: #2563eb;
    color: #fff;
    padding: 0.75rem;
    display: block;
    width: 100%;
    font-size: 1rem;
    font-weight: 500;
    border-radius: 4px;
  }

  .btn-submit:hover {
    cursor: pointer;
  }

  input[type='file'] {
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    overflow: hidden;
    padding: 0;
    position: absolute !important;
    white-space: nowrap;
    width: 1px;

    + label {
      background: #fff;
      display: block;
      text-align: center;
      padding: 0.75rem;
      border: 2px dashed #c3c3c3;
      cursor: pointer;
    }

    &:focus + label,
    + label:hover {
      background-color: #c3c3c3;
    }
  }

  .btn-group {
    display: flex;
    > button {
      flex: 1;

      &.selected {
        background-color: #2563eb;
        color: #fff;
      }

      &:first-of-type {
        border-radius: 4px 0 0 4px;
      }

      &:last-of-type {
        border-radius: 0 4px 4px 0;
      }
    }
  }
</style>

import { writable, Writable } from 'svelte/store'

export const title: Writable<string> = writable('')
export const subTitle: Writable<string> = writable('')
export const titleTextSize: Writable<number> = writable(64)
export const subTitleTextSize: Writable<number> = writable(36)
export const titleTextColor: Writable<string> = writable('#ff3e00')
export const subTitleTextColor: Writable<string> = writable('#ff3e00')
export const bgColor: Writable<string> = writable('#ffffff')
export const align: Writable<string> = writable('center')
export const justify: Writable<string> = writable('center')
export let src: Writable<string> = writable('')
export const url: Writable<string> = writable('')
export const filename: Writable<string> = writable('')

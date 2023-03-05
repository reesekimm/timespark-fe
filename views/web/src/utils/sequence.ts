function getSequence(): string[] {
  const item = window.localStorage.getItem('sequence')
  return item ? JSON.parse(item) : []
}

function setSequence(ids: string[]): void {
  window.localStorage.setItem('sequence', JSON.stringify(ids))
}

export { setSequence, getSequence }

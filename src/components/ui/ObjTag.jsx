// ObjTag — individual: { label }
// Used in Skills section, case study sidebar, and hero card stack
export function ObjTag({ label, size = 'sm' }) {
  const textSize = size === 'xs' ? 'text-xs' : 'text-sm'
  return (
    <span className={`font-mono ${textSize} text-zinc-900 dark:text-zinc-50 whitespace-nowrap`}>
      <span className="text-teal-500 dark:text-teal-400">{'{ '}</span>
      {label}
      <span className="text-teal-500 dark:text-teal-400">{' }'}</span>
    </span>
  )
}

// ObjInline — all items in one object: { item1, item2, item3 }
// Used on project cards where space is compact
export function ObjInline({ items, max }) {
  const visible = max ? items.slice(0, max) : items
  const remaining = items.length - visible.length
  return (
    <span className="font-mono text-sm text-zinc-900 dark:text-zinc-50">
      <span className="text-teal-500 dark:text-teal-400">{'{ '}</span>
      {visible.join(', ')}
      {remaining > 0 && (
        <span className="text-zinc-900 dark:text-zinc-50">, +{remaining}</span>
      )}
      <span className="text-teal-500 dark:text-teal-400">{' }'}</span>
    </span>
  )
}

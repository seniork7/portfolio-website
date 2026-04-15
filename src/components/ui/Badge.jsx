import { cn } from '../../utils/cn'

const variantStyles = {
  default:
    'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-50',
  accent:
    'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300',
  success:
    'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300',
}

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

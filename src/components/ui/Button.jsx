import { cn } from '../../utils/cn'

const variantStyles = {
  primary:
    'bg-teal-700 text-white hover:bg-teal-800 dark:bg-teal-950 dark:hover:bg-teal-700 dark:text-white border border-transparent',
  secondary:
    'bg-transparent text-zinc-900 border border-zinc-300 hover:bg-zinc-100 dark:text-zinc-50 dark:border-zinc-600 dark:hover:bg-zinc-800',
  ghost:
    'bg-transparent text-zinc-900 border border-transparent hover:text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:text-zinc-50 dark:hover:bg-zinc-800',
}

const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...rest
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

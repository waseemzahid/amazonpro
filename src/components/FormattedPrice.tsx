import { cn } from '@/lib/utils'

type Props = {
  amount: number
  className: string
}

const FormattedPrice = ({ amount, className }: Props) => {
  const formattedAmount = new Number(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  })
  return (
    <span className={cn('lg:text-base text-black text-sm', className)}>
      {formattedAmount}
    </span>
  )
}

export default FormattedPrice

import { ComponentProps, FC } from 'react'

import clsx from 'clsx'

import s from './tables.module.scss'

import { ChevronUp } from '@/assets/icons'
import { Typography } from '@/components/ui/typography'

export const Root: FC<ComponentProps<'table'>> = ({ className, ...rest }) => {
  const classNames = {
    table: clsx(className, s.table),
  }

  return <table className={classNames.table} {...rest} />
}

export type HeadProps = ComponentProps<'thead'>

export const Head: FC<HeadProps> = props => {
  return <thead {...props} />
}

export type Column = {
  title: string
  key: string
  sortable?: boolean
}
export const Header: FC<
  Omit<
    HeadProps & {
      columns: Column[]
      sort: Sort
      onSort: (sort: Sort) => void
    },
    'children'
  >
> = ({ columns, sort, onSort, ...restProps }) => {
  console.log('sort', sort)
  const classNames = {
    chevron: sort?.direction === 'asc' ? '' : s.chevron,
  }
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) return

    if (sort?.key !== key) return onSort({ key, direction: 'asc' })

    if (sort.direction === 'desc') return onSort(null)

    return onSort({
      key,
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
    })
  }

  const headCell = columns.map(({ title, key, sortable }) => {
    let chevron

    if (sort?.key === key && sort?.direction === 'asc') {
      chevron = <ChevronUp key={sort.key} className={classNames.chevron} />
    } else if (sort?.key === key && sort?.direction === 'desc') {
      chevron = <ChevronUp key={sort.key} className={s.chevronDown} />
    } else {
      chevron = null
    }

    return (
      <HeadCell key={key} onClick={handleSort(key, sortable)} sortable={sortable}>
        {title}
        {chevron}
      </HeadCell>
    )
  })

  return (
    <Head {...restProps}>
      <Row>{headCell}</Row>
    </Head>
  )
}
export const Body: FC<ComponentProps<'tbody'>> = props => {
  return <tbody {...props} />
}

export const Row: FC<ComponentProps<'tr'>> = props => {
  return <tr {...props} className={s.trStyle} /> //!!!!
}

export const HeadCell: FC<
  ComponentProps<'th'> & {
    sortable?: boolean
  }
> = ({ className, children, sortable, ...rest }) => {
  const classNames = {
    headCell: clsx(className, s.headCell, sortable && s.sortable),
  }

  return (
    <th className={classNames.headCell} {...rest}>
      <span>{children}</span>
    </th>
  )
}

export const Cell: FC<ComponentProps<'td'>> = ({ className, ...rest }) => {
  const classNames = {
    cell: clsx(className, s.tableCell),
  }

  return <td className={classNames.cell} {...rest} />
}

export const Empty: FC<ComponentProps<'div'> & { mt?: string; mb?: string }> = ({
  className,
  mt = '89px',
  mb,
}) => {
  const classNames = {
    empty: clsx(className, s.empty),
  }

  return (
    <Typography
      variant={'h2'}
      className={classNames.empty}
      style={{ marginTop: mt, marginBottom: mb }}
    >
      No data yet!
    </Typography>
  )
}

export const Table = {
  Root,
  Head,
  Header,
  Body,
  Row,
  HeadCell,
  Cell,
  Empty,
}

export type Sort = {
  key: string
  direction: 'asc' | 'desc'
} | null

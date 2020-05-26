import React from 'react'
import { Chip } from '@material-ui/core'
import OrderState from './order-state'
import "./order-state-chip.style.scss"

const OrderStateChip = ({ state }) => {
    let className
    let label
    switch (state) {
        case OrderState.PENDING:
            className = 'state-pending'
            label = 'PENDING'
            break;
        case OrderState.IN_DELIVERY:
            className = 'state-in-delivery'
            label = 'IN DELIVERY'
            break;
        case OrderState.DELIVERED:
            className = 'state-delivered'
            label = 'DELIVERED'
            break;
    }
    return (
        <Chip size="small" label={label} className={className} />
    )
}

export default OrderStateChip
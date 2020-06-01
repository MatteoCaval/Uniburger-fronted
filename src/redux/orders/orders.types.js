const OrderActionTypes = {
    // valutare bene dove mettere sti 3
    COMPLETE_ORDER_PENDING: 'COMPLETE_ORDER_PENDING',
    COMPLETE_ORDER_SUCCESS: 'COMPLETE_ORDER_SUCCESS',
    COMPLETE_ORDER_FAILED: 'COMPLETE_ORDER_FAILED',

    FETCH_ORDER_HISTORY_SUCCESS: 'FETCH_ORDER_HISTORY_SUCCESS',
    FETCH_ORDER_HISTORY_FAILED: 'FETCH_ORDER_HISTORY_FAILED',
    FETCH_ORDER_HISTORY_PENDING: 'FETCH_ORDER_HISTORY_PENDING',

    // real time orders actions
    REAL_TIME_ORDERS: 'REAL_TIME_ORDERS',
    NEW_ORDER_RECEIVED: 'NEW_ORDER_RECEIVED',
    ORDER_UPDATED: 'ORDER_UPDATED',
}

export default OrderActionTypes
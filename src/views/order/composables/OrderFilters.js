/* Filtros de pedidos */
export function useOrderFilters() {
    const filterReason = (orderData, option) => {
        if(option === 'a-z'){
            orderData.sort((a , b) => a.reason.localeCompare(b.reason)) 

            return orderData
        }

        if(option === 'z-a'){
            orderData.sort((a , b) => b.reason.localeCompare(a.reason))

            return orderData
        }
    }

    const filterBuyer = (orderData, option) => {
        if(option !== 'All'){
            const filter = orderData.filter(order => order.d_user_name === option)

            return filter
        }

        return orderData
    }

    const filterStatus = (orderData, option) => {
        if( option !== 'all'){
            const filter = orderData.filter(order => order.state === option)

            return filter
        }

        return orderData
    }
    return {
        filterReason,
        filterBuyer,
        filterStatus,
    }
}
export const getPagination = (query) => {
    const page = +query.page || 1
    const limit = +query.limit || 15
    const skip = (page - 1) * limit

    return {page, limit, skip}
}

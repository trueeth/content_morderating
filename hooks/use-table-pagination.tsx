import React, { useEffect, useState } from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import TablePagination from '@components/common/table-pagination'
import { useDispatch, useSelector } from 'react-redux'
import {
  setPageinit,
  setPaginationIndex
} from '@store/reducers/page/reducers'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'
import { useRouter } from 'next/router'

const useTablePagination = () => {
  const [vState, setState] = useState({
    pageIndex: 1,
    pageSize: 10,
    pageTotal: 5
  })

  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  const router = useRouter()

  /* eslint-disable */
  useEffect(() => {
    if (appState.pagination.pageIndex > 0) {
      router.push({
        pathname: router.pathname,
        query: { pageindex: appState.pagination.pageIndex, pagesize: appState.pagination.pageSize }
      })
      setState(prevState => {
        return {
          ...prevState,
          pageIndex: appState.pagination.pageIndex,
          pageSize: appState.pagination.pageSize,
          pageTotal: Math.ceil(
            appState.pagination.totalCount / appState.pagination.pageSize
          )
        }
      })
    } else {
      dispatch(setPaginationIndex({ pageIndex: 1 }))
    }
  }, [appState])

  useEffect(() => {
    if (Object.keys(router.query).length == 0)
      dispatch(setPageinit())
  }, [dispatch])


  useEffect(() => {
    if (Object.keys(router.query).length > 0) {
      const query = router.query
      if (query.pageindex && query.pagesize) {
        if (query.pageindex !==appState.pagination.pageIndex.toString() || query.pagesize!==appState.pagination.pageSize.toString()){
          dispatch(setPaginationIndex(Number(query.pageindex)))
          dispatch(setPaginationIndex(Number(query.pagesize)))
        }
      }
    }
  }, [router])
  /* eslint-enable */

  const handleChangePagination = (
    event: React.ChangeEvent,
    pageIndex: number
  ) => {
    setState({ ...vState, pageIndex: pageIndex })
    dispatch(
      setPaginationIndex({
        pageIndex: pageIndex
      })
    )
  }

  const CustomPagination = () => (
    <TablePagination
      sx={{
        '& .MuiPaginationItem-ellipsis': {
          border: 'none'
        }
      }}
    >
      <Pagination
        count={vState.pageTotal}
        variant='outlined'
        shape='rounded'
        siblingCount={1}
        page={vState.pageIndex}
        onChange={handleChangePagination}
        renderItem={(item) => <PaginationItem {...item} />}
      ></Pagination>
    </TablePagination>
  )

  return {
    CustomPagination
  }
}

export default useTablePagination

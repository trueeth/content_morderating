import React, { useEffect, useState } from 'react'
import { Pagination, PaginationItem } from '@mui/material'
import TablePagination from '@components/common/table-pagination'
import { useDispatch, useSelector } from 'react-redux'
import { setPageinit, setPaginationIndex } from '@store/reducers/page/reducers'
import { IReduxState } from '@store/index'
import { IAppSlice } from '@store/reducers'

const useTablePagination = () => {
  const [vState, setState] = useState({
    pageIndex: 1,
    pageSize: 10,
    pageTotal: 5
  })

  const dispatch = useDispatch()
  const appState = useSelector<IReduxState, IAppSlice>((state) => state.app)

  useEffect(() => {
    setState(prevState => {
      return{
        ...prevState,
        pageIndex: appState.pagination.pageIndex,
        pageSize: appState.pagination.pageSize,
        pageTotal: Math.ceil(
          appState.pagination.totalCount / appState.pagination.pageSize
        )
      }
    })
  }, [appState])

  useEffect(() => {
    dispatch(setPageinit())
  }, [dispatch])

  const handlePageNext = () => {
    setState({ ...vState, pageIndex: vState.pageIndex + 1 })
    dispatch(
      setPaginationIndex({
        pageIndex: vState.pageIndex + 1
      })
    )
  }

  const handlePageBefore = () => {
    setState({ ...vState, pageIndex: vState.pageIndex - 1 })
    dispatch(
      setPaginationIndex({
        pageIndex: vState.pageIndex - 1
      })
    )
  }

  const setPageIndex = (pageIndex: number) => {
    setState({ ...vState, pageIndex: pageIndex })
    dispatch(
      setPaginationIndex({
        pageIndex: pageIndex
      })
    )
  }

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
        variant="outlined"
        shape="rounded"
        siblingCount={1}
        page={vState.pageIndex}
        onChange={handleChangePagination}
        renderItem={(item) => <PaginationItem {...item} />}
      ></Pagination>
    </TablePagination>
  )

  return { CustomPagination, handlePageNext, handlePageBefore, setPageIndex }
}

export default useTablePagination

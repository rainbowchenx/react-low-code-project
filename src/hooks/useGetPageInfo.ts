/**\
 * @description:获取页面信息的hook
 */
import { useSelector } from 'react-redux'
import type { StateType } from '../store'
import type { PageInfoType } from '../store/pageInfoReducer'
function useGetPageInfo() {
  const PageInfo = useSelector<StateType>((state: StateType) => state.pageInfo)
  return PageInfo as PageInfoType
}
export default useGetPageInfo

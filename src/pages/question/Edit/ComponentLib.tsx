/**
 * @description 左侧面板中的组件库部分
 */
import React, { FC } from 'react'
import { Typography } from 'antd'
import { componentConfGroup } from '../../../componnets/QuestionComponents'
const Libs: FC = () => {
  const { Title } = Typography
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
          </div>
        )
      })}
    </>
  )
}
export default Libs

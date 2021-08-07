import styled from 'styled-components'

const TimeWrap = styled.div`
  text-align:end;
`

const Time = styled.span`
  display: block;
  font-size: 14px;
`
const F = (t) => {
  return t < 10 ? '0'+t : t
}
const timeFormat = (time) => {
  const date = new Date(time)
  const y = date.getFullYear()
  const m = date.getMonth() + 1
  const d = date.getDate()
  const hour = date.getHours()
  const min = date.getMinutes()
  const sec = date.getSeconds()
  return `${y}.${F(m)}.${F(d)} ${F(hour)}:${F(min)}:${F(sec)}`
}
const Timestamp = ({createdAt,updatedAt}) => {
  return (
    <TimeWrap>
      <Time>
        작성일자 : {timeFormat(createdAt)}
      </Time>
      {createdAt === updatedAt ||
        <Time>
          수정일자 : {timeFormat(updatedAt)}
        </Time>
      }
    </TimeWrap>
  )
}

export default Timestamp
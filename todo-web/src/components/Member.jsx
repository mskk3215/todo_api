// Memberコンポーネントをexport（今回はnamed export）
export const Member = (props) => {
  return (
    <>
      <p>名前：{props.name}</p>
      <p>年齢：{props.age}</p>
    </>
  )
}
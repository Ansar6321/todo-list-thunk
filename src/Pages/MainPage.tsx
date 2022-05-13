import { logoutAsync } from '../app/authSlice'
import { useAppDispatch } from '../app/hooks'

const MainPage = () => {
  const dispatch = useAppDispatch();

  return (
    <div>
      <button onClick={e => dispatch(logoutAsync())}>Log out!</button>
    </div>
  )
}

export default MainPage
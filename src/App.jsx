import { Container, Typography } from '@mui/material'
import './App.css'
import TodoForm from './component/TodoForm'
import TodoList from './component/TodoList'
import { Provider } from 'react-redux'
import store from './redux/store'
// import Filter from './component/Filter'

function App() {

  return (
    <>
      <Provider store={store}>
        <Container maxWidth="sm" sx={{ mt: 3 }}>
          <Typography variant='h4' align='center'>
            Todo App
          </Typography>
          <TodoForm />
          {/* <Filter/> */}
          <TodoList />
        </Container>
      </Provider>
    </>
  )
}

export default App

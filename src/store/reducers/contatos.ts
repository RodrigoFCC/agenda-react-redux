import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Contato from '../../models/Contato'

type ContatosState = {
  itens: Contato[]
}

const initialState: ContatosState = {
  itens: [
    {
      id: 1,
      nome: 'Pedro Gomes',
      email: 'pedro@gmail.com',
      telefone: '(83) 99221-4587'
    },
    {
      id: 2,
      nome: 'Paula Targino',
      email: 'paula@gmail.com',
      telefone: '(83) 99821-4187'
    },
    {
      id: 3,
      nome: 'Manoel Gomes',
      email: 'manoel@gmail.com',
      telefone: '(83) 99554-4478'
    }
  ]
}

const contatosSlice = createSlice({
  name: 'contato',
  initialState,
  reducers: {
    remover: (state, action: PayloadAction<number>) => {
      state.itens = [
        ...state.itens.filter((contato) => contato.id !== action.payload)
      ]
    },
    editar: (state, action: PayloadAction<Contato>) => {
      const indexDaContato = state.itens.findIndex(
        (c) => c.id === action.payload.id
      )

      if (indexDaContato >= 0) {
        state.itens[indexDaContato] = action.payload
      }
    },
    cadastrar: (state, action: PayloadAction<Omit<Contato, 'id'>>) => {
      const contatoJaExiste = state.itens.find(
        (contato) =>
          contato.nome.toLowerCase() === action.payload.nome.toLocaleLowerCase()
      )

      if (contatoJaExiste) {
        alert('Já existe um contato come esse nome')
      } else {
        const ultimaContato = state.itens[state.itens.length - 1]

        const contatoNovo = {
          ...action.payload,
          id: ultimaContato ? ultimaContato.id + 1 : 1
        }
        state.itens.push(contatoNovo)
      }
    }
  }
})

export const { remover, editar, cadastrar } = contatosSlice.actions

export default contatosSlice.reducer

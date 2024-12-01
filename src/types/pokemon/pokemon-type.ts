export type PokemonData = {
  id: number
  pokemonId: number
  name: string
  types: Type[]
  hp: number
  atk: number
  def: number
  speAtk: number
  speDef: number
  speed: number
  color: string
  description: string
  height: number
  weight: number
  imgUrl: string
}

export type MoveData = {
  id: number
  name: string
  type: Type
  damage: number
  accuracy: number
  pp: number
  description: string
}

export type Pagination = {
  count: number
  nbPages: number
}


export type Type = {
  id: number
  name: string
}
